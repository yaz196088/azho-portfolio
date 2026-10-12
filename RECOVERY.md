# Recovery notes

How to bring this portfolio back up on a new machine, and what is deliberately
not in this repository.

## Where things live

| What | Where |
|---|---|
| Source repository | `git@github.com:yaz196088/azho-portfolio.git` |
| Web URL | https://github.com/yaz196088/azho-portfolio |
| Branch that ships | `main` |
| Hosting | Vercel, project `azho-portfolio` — deploys automatically on every push to `main` |
| Source originals backup | Google Drive → My Drive → `Portfolio Source Backup` (see "Not yet uploaded" below) |

## Rebuilding on a new Mac

1. Install Node (the version in `package.json` engines, or current LTS) and git.
2. Create an SSH key and add it to GitHub — a new Mac has no key, so the clone
   below fails with "Permission denied (publickey)" until this is done:

   ```
   ssh-keygen -t ed25519 -C "your-email"
   cat ~/.ssh/id_ed25519.pub        # paste into GitHub → Settings → SSH keys
   ssh -T git@github.com            # should greet you by username
   ```

3. Clone, install, run:

   ```
   git clone git@github.com:yaz196088/azho-portfolio.git
   cd azho-portfolio
   npm ci
   npm run dev                      # http://localhost:3000
   ```

   `npm run build` produces the production build. There are no environment
   variables and no `.env` files — nothing extra is needed to build or run.

Nothing else is required. A clean clone of `main` builds and runs on its own,
with every image the site references already included.

## What is NOT in git, and why

The repo tracks only the optimised `.webp` files the site actually serves. The
full-resolution originals they were produced from are git-ignored on purpose —
they are roughly 108 MB and would bloat the repository and every clone for no
benefit, since the site never loads them.

Ignored under `public/` (see `.gitignore`):

- `public/models/` — `wax-seal.glb`, 39 MB. Left over from a 3D wax-seal
  feature that was removed from the site; no code references it any more.
- `public/images/hsi/*.png`, `*.jpg` — HSI render originals (~27 MB)
- `public/images/fr-partnership/*.png`, `*.jpg` — FR Partnership render
  originals, Jasmeya / Omar Fathy / Ramla (~36 MB)
- `public/images/posters/*.png`, `*.jpg` — poster originals (~4 MB)

**Losing these does not break the site.** It only means the originals are gone
if an image ever needs re-exporting at a different size or quality. The shipped
`.webp` files live in git and are enough to deploy.

To regenerate a `.webp` from an original, the settings used throughout are:

```
sharp(original)
  .resize({ width: 1600, withoutEnlargement: true })   // 900 for posters
  .webp({ quality: 82 })                               // 85 for posters
```

## Not yet uploaded

As of the last update to this file, Google Drive for desktop was **not**
installed on the Mac holding the originals, so the backup described above had
not been made yet. Until it is, the only copies of the originals are on that
machine. Two folders need uploading by hand:

- the git-ignored originals listed above (~108 MB), keeping the same folder
  structure, into `Portfolio Source Backup/originals`
- `~/Desktop/REBIRTH` (~222 MB) into `Portfolio Source Backup/REBIRTH` — design
  source material, not part of this repo
