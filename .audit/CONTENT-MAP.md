# ICE source audit — 28 September 2026

## User-directed refinements — 6 October 2026

- Home section 05 is now THE ICE FILTER, replacing Public + Private. The section 07 product preview is removed from home. Clients and Products pages retain their complete catalogues. This interprets the user's numbered removal request as homepage sections, not the cardinal values.
- All twelve values remain, with the first letter of every word highlighted in ICE red, including hyphenated words.
- Photo parallax and overlays appear behind the Filter and collaboration sections. Navbar entry, active-link, hover and mobile-menu animations respect reduced motion.
- TAMP and SOMA 360 are user-supplied additions, bringing the catalogue to ten. SOMA uses the supplied JPEG; TAMP is an AI reconstruction of the supplied unsaved screenshot, explicitly requested by the user. No product features or descriptions have been invented for these additions.
- Product headings are visually replaced by logos while accessible headings remain. Express Processes retains its heading because the source provides no logo.
- TypeScript, lint, static rendering/content verification and production build pass. Browser visual QA was attempted but the computer-use kernel failed to initialise.

Retrieved the six public navigation pages and their stylesheets from https://www.ice4ir.com/. Raw HTML and CSS are saved alongside this document. The public account login is an administrative entry, not a marketing page.

## Content destinations (before implementation)

| Source | Content | Redesign destination |
| --- | --- | --- |
| / | Advanced Analytics Group; “Like ICE we blend in and make a solution”; 100 projects, 30 experts, 10 years; existing imagery | Home hero, introduction, experience strip; preserve the published 10-year figure without treating it as a current calculated age |
| /about-us | All three company paragraphs, established 2012, 30+ professionals, 100+ combined years | Home introduction and collaboration; complete About story |
| /about-us | Complete Vision and Mission | Separate full-width home and About sections |
| /about-us | Code of Ethics and all 12 Cardinal Values | Typographic ICE Filter on home and About |
| /our-services | All nine service titles and descriptions | Interactive service index and Services page |
| About + shared footer | ICT facilities management, digital transformation, data analytics, Business Anomaly Detection; Business Enterprise Architecture and ICT Systems Integration Service terminology | Additional Services context and footer |
| /our-products | Eight named products, descriptions, 32 features, demo links, Express Processes subtitle | Products page; selected real products on home; demo links to contact with product context |
| /our-clients | All nine client names, sectors and logos | Clients page and public/private home narrative |
| /contact-us | Pretoria address, both emails, hours; Name/Email/Phone/Message | Contact page and footer. Existing local form only simulates success; replace with explicit email-draft handoff until a delivery backend is available |
| Shared footer | Original company description, service list, CTA, copyright and Facebook/LinkedIn/Instagram URLs | Footer |
| Shared navigation | Home, About, Services, Products, Clients, Contact | Same canonical routes; aliases retain local /about, /capabilities, /projects, /contact links |

## Verified brand tokens

From `source-1.css`: primary/header `#c1121f`; button hover `#a00f1a`; darker link `#8b0e18`; light accent `#ffdcdc`; secondary highlight `#f4b942`; site background `#0b0b0d`; content `#ffffff`; dark text `#222222`; light text `#e6e6e6`; footer muted `#d1d5db`; footer border `#374151`. White original company logo is stored under public/brand.

## Existing implementation findings

React/Vite/TypeScript, React Router and Framer Motion already provide the necessary foundation. Keep them and refactor existing sections. Current palette is invented cyan/navy; company name is replaced with a small text badge; all pages are dark. Local case studies, articles, vacancies, Johannesburg location, social placeholders, performance statistics and technology stack assertions have no support in the source. Do not publish them as company facts. Products and Clients were missing. The live site DOES list Cyber Security, AI/ML within Data Science, and Cloud & Hosting Solutions; preserve those verified services.

Original photography is illustrative, not verified staff photography. Retain useful source photography without labelling subjects as ICE employees. Use editorial team imagery only as illustration.
