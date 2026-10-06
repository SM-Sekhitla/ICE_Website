import { readFileSync, existsSync, readdirSync, mkdirSync, renameSync } from 'node:fs';
import path from 'node:path';
const root = path.resolve('.');
const reached = new Set();
function visit(file) {
  if (reached.has(file)) return;
  reached.add(file);
  const text = readFileSync(file, 'utf8');
  for (const match of text.matchAll(/(?:from\s*|import\s*\()\s*['"]([^'"]+)['"]/g)) {
    const spec = match[1];
    if (!spec.startsWith('.') && !spec.startsWith('@/')) continue;
    const base = spec.startsWith('@/') ? path.resolve('src', spec.slice(2)) : path.resolve(path.dirname(file), spec);
    const target = [base, base+'.tsx', base+'.ts', base+'.css'].find(p => existsSync(p));
    if (target) visit(target);
  }
}
visit(path.resolve('src/main.tsx'));
reached.add(path.resolve('src/index.css'));
reached.add(path.resolve('src/vite-env.d.ts'));
function walk(dir) { for (const entry of readdirSync(dir, {withFileTypes:true})) { const source=path.join(dir,entry.name); if(entry.isDirectory())walk(source); else if(!reached.has(source)){ const target=path.resolve('.audit/legacy',path.relative(path.resolve('src'),source)); if(!source.startsWith(root+path.sep)||!target.startsWith(path.resolve('.audit/legacy')+path.sep))throw Error('Outside workspace'); mkdirSync(path.dirname(target),{recursive:true});renameSync(source,target);console.log('Archived '+path.relative(root,source));}} }
walk(path.resolve('src'));
