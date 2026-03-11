# joshsaintjacque.github.io

Quartz site published to GitHub Pages from notes in the Obsidian vault.

## Source of truth

- **Vault folder:** `~/workspace/Obsidian Vault/30 - Permanent/Blog/`
- **Synced into this repo:** `content/blog/` (do not edit `content/blog/` by hand; it is overwritten by sync)

## Prerequisites

- Node 22+ and npm 10.9.2+
- GitHub repo named **`joshsaintjacque.github.io`** under your account
- GitHub Pages enabled with **GitHub Actions** as the source

## Day-to-day flow

1. **Write in Obsidian** inside `30 - Permanent/Blog/`.
2. **Drafts:** add `draft: true` to frontmatter; Quartz’s default `RemoveDrafts` filter keeps them off the live site.
3. **Sync** vault folder into the repo:

   ```bash
   npm run sync
   ```

   Override the vault path if needed:

   ```bash
   OBSIDIAN_BLOG_DIR="/path/to/Blog" npm run sync
   ```

4. **Preview locally:**

   ```bash
   npm run serve
   ```

5. **Publish:** commit changes (including `content/blog/` after sync), push to **`v4`**. The workflow in `.github/workflows/deploy.yml` builds and deploys to `https://joshsaintjacque.github.io/`.

## First-time GitHub setup

1. Create an empty repo **`joshsaintjacque.github.io`** on GitHub (no README/license).
2. Point this clone at your repo and push `v4`:

   ```bash
   git remote set-url origin git@github.com:joshsaintjacque/joshsaintjacque.github.io.git
   git push -u origin v4
   ```

3. In the repo **Settings → Pages**, set **Build and deployment** source to **GitHub Actions**.
4. Ensure **Settings → Actions → General → Workflow permissions** allows read/write for workflows that deploy Pages.

## Config

- `baseUrl` and site title live in `quartz.config.ts` (must stay `joshsaintjacque.github.io` for the root Pages URL).
- Homepage is `content/index.md` (sync does not overwrite it).

## Upstream

This repo started from [jackyzha0/quartz](https://github.com/jackyzha0/quartz). To pull upstream updates:

```bash
git remote add upstream https://github.com/jackyzha0/quartz.git
git fetch upstream
git merge upstream/v4
```
