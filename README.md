# ICE — Industrial Computing Engineering

Brand and content refactor of the existing React / TypeScript / Vite website. The original React Router and Framer Motion foundation is retained.

## Run

```sh
npm install
npm run dev
```

## Check

```sh
npm run typecheck
npm run lint
npm run build
node .audit/verify-content.mjs
```

The final command statically renders the six public pages, checks headings, image paths and placeholder links, and verifies complete source-content coverage. It is not a browser interaction or visual test.

## Source of truth

All six ICE public pages were retrieved on 28 September 2026. See [.audit/CONTENT-MAP.md](.audit/CONTENT-MAP.md) for the source-to-page mapping, palette provenance and audit findings. Source snapshots are retained in `.audit`. Unused fictional template material is archived in `.audit/legacy`, outside the active application.

Content lives in `src/data/company.ts`, `services.ts`, `products.ts`, `clients.ts`, `values.ts` and `navigation.ts`. Original company, product and client assets are served locally from `public/brand`. The editorial software photograph is illustrative, not a claim that its subject works for ICE.

## Experience

- ICE red, white and near-black tokens in `src/index.css`, sourced from the live stylesheet.
- Twelve-part homepage story; complete editorial About page.
- Service index with keyboard/touch controls, interactive illustrative analytics, client filters and contextual product demo links.
- Scroll-responsive navigation, layered hero parallax, image masks, number counters, sticky values composition and short route transitions.
- Mobile layouts, visible focus, semantic headings, reduced motion, lazy images and split page bundles.
- Original public URL structure; aliases preserve existing local About, Capabilities, Projects and Contact links.

## Contact and hosting

The original local form simulated delivery. The new form validates its fields and opens an explicitly labelled email draft to the verified ICE address; it does not claim to send messages. A production form-delivery endpoint remains a separate integration.

This is a client-side routed application. Hosts must serve `index.html` for public page paths. No site has been deployed by this refactor.

Browser visual and interaction QA remains outstanding because no connected browser was available in the editing session.

## BRUCE website assistant

BRUCE appears in the lower-right corner on every public page. Visitors can open a chat, use suggested questions, follow page links, start a new conversation, or toggle blinking. Reduced-motion preferences disable blinking. Messages remain in component memory for this tab and are cleared on reload; chat messages are not sent to a server.

The current assistant uses local retrieval in `src/lib/bruce.ts`, backed by the existing company, service, product, client and values data. It supports named products/services, basic follow-up context, contact information and contextual demo/quote links. It is not a generative AI service: it cannot answer arbitrary questions, inspect private systems, confirm live availability, book meetings, or send messages. Missing information gets an explicit fallback to Contact ICE.

Run `node .audit/verify-bruce.mjs` to check answer routing, follow-ups and unknown-information handling. A live AI upgrade would require a server-side endpoint, credentials and hosting configuration; no API key belongs in the Vite browser bundle.

The BRUCE mascot is `public/brand/bruce-standing.png`. The reference edit used the built-in image-generation tool; its exact prompt is recorded in `.audit/bruce-asset.json`.
