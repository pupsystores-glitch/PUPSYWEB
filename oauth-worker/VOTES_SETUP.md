# Product vote storage setup

Product vote counts and optional contact details are stored in a private Cloudflare D1 database. They are never written to the public GitHub Pages repository. The statistics API checks that the caller's GitHub token has write access to the PUPSYWEB repository before returning contact details.

From the `oauth-worker` directory:

1. Create the D1 database with `npx wrangler d1 create pupsy-product-votes`.
2. Copy the returned database ID into `wrangler.toml`, replacing `REPLACE_WITH_CLOUDFLARE_D1_DATABASE_ID`.
3. Apply the schema with `npx wrangler d1 migrations apply pupsy-product-votes --remote`.
4. Deploy the Worker with `npx wrangler deploy`.

The existing OAuth Worker URL is used for the vote API as well. Existing GitHub OAuth secrets stay configured on that Worker. For local development, use `npx wrangler dev` and update the `API` constant in `js/coming-soon-votes.js` to the local Worker URL.
