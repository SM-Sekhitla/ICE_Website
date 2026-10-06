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
