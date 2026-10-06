import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { build } from 'esbuild';
import path from 'node:path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
// This is a client-only app. Ignore only React's expected static-render layout-effect warning.
const reportError = console.error;
console.error = (message, ...args) => {
  if (String(message).startsWith('Warning: useLayoutEffect does nothing on the server')) return;
  reportError(message, ...args);
};
await build({ entryPoints: ['.audit/render-entry.ts'], outfile: '.audit/render-bundle.mjs', bundle: true, platform: 'node', format: 'esm', jsx: 'automatic', external: ['react', 'react-dom', 'react-dom/server'], alias: { '@': path.resolve('src') } });
try {
  const bundle = await import('./render-bundle.mjs');
  const { MemoryRouter, company, services, products, clients, values } = bundle;
  assert.equal(services.length,9); assert.equal(products.length,10); assert.equal(clients.length,9); assert.equal(values.length,12);
  assert.equal(products.flatMap(p=>p.features).length,32);
  const clean = value => value.replace(/<[^>]*>/g,' ').replace(/&#x27;|&#39;|&apos;/g,"'").replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/\s+/g,' ').trim();
  const aboutSource = clean(readFileSync('.audit/about-us.html','utf8'));
  for(const copy of [...company.paragraphs,company.vision,company.mission,...values]) assert(aboutSource.includes(copy), 'Source mismatch: '+copy);
  const pages = [['HomePage','/'],['AboutPage','/about-us'],['CapabilitiesPage','/our-services'],['ProductsPage','/our-products'],['ClientsPage','/our-clients'],['ContactPage','/contact-us?product=TAIP']];
  const results = {};
  for (const [name,url] of pages) {
    const Component = bundle[name];
    const html=renderToStaticMarkup(React.createElement(MemoryRouter,{initialEntries:[url]},React.createElement(Component)));
    assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,name+' must have one h1');
    for(const match of html.matchAll(/src="(\/brand\/[^\"]+)"/g))assert(existsSync('public'+match[1]),'Missing image '+match[1]);
    assert(!html.includes('href="#"'),'Placeholder link on '+name);
    assert(!/NATIONAL DATA PLATFORM|RISK INTELLIGENCE ENGINE|99\.99%|Message received/.test(html),'Unverified claim on '+name);
    results[name]=clean(html);
    if(name === 'HomePage') {
      assert(!html.includes('05 / Where we work') && !html.includes('07 / Products &amp; experience'));
      assert.equal((html.match(/id="ice-filter"/g)||[]).length,1);
      assert.equal((html.match(/class="value-initial"/g)||[]).length,15);
    }
    console.log('PASS render, heading, assets and links: '+url);
  }
  for(const copy of [...company.paragraphs,company.vision,company.mission,...values])assert(results.AboutPage.includes(copy),'About content missing: '+copy);
  for(const service of services)assert(results.CapabilitiesPage.includes(service.title)&&results.CapabilitiesPage.includes(service.description),'Service missing '+service.title);
  for(const product of products)for(const copy of [product.title,product.description,...product.features])assert(results.ProductsPage.includes(copy),'Product content missing '+copy);
  for(const client of clients)assert(results.ClientsPage.includes(client.name),'Client missing '+client.name);
  assert(results.ContactPage.includes(company.emails[0]));
  console.log('PASS source content and updates: company story, Vision, Mission, 12 values, 9 services, 10 products / 32 verified features, 9 clients.');
} finally { /* No browser or external service is used by this check. */ }
