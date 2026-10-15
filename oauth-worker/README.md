# PUPSY Decap CMS GitHub OAuth Worker

This Worker supplies the `/auth` and `/callback` endpoints Decap CMS needs for GitHub login. OAuth secrets belong in Cloudflare Worker secrets, never in this repository.

## Deploy

1. Create or sign in to a Cloudflare account and open **Workers & Pages**.
2. Create a Worker named `pupsy-decap-oauth`, paste the contents of `index.js`, and deploy it. Cloudflare will show a URL like `https://pupsy-decap-oauth.<your-account>.workers.dev`.
3. In GitHub, open **Settings → Developer settings → OAuth Apps → New OAuth App**. Use:
   - Application name: `PUPSY CMS`
   - Homepage URL: `https://pupsystores-glitch.github.io/PUPSYWEB/`
   - Authorization callback URL: `https://pupsy-decap-oauth.<your-account>.workers.dev/callback`
4. Copy the OAuth App's Client ID. Generate a Client Secret.
5. In Cloudflare, open the Worker **Settings → Variables and Secrets**. Add `GITHUB_CLIENT_ID` as a text variable and `GITHUB_CLIENT_SECRET` as a secret. Save and deploy the updated Worker.
6. Open the Worker root URL. It should show `PUPSY CMS OAuth worker is running.`
7. Set `backend.base_url` in `admin/config.yml` to the Worker URL (without `/auth` or `/callback`). Then publish that config to GitHub Pages.
8. Open `https://pupsystores-glitch.github.io/PUPSYWEB/admin/`, allow popups, and sign in with a GitHub account that can push to `pupsystores-glitch/PUPSYWEB`.

The callback URL in the GitHub OAuth App must exactly match the deployed Worker's `/callback` URL. Never add the Client Secret to this repository or send it in chat.
