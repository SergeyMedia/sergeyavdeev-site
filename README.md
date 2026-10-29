# sergeyavdeev.com

Website for **Sergey Avdeev** — digital media marketing (photo, video, social content, AI-assisted marketing) for small & medium businesses.

Plain HTML/CSS/JS. No build step, no dependencies. Minimal, image-first design with small type.

- **Preview:** https://sergeymedia.github.io/sergeyavdeev-site/
- **Deploys:** every push to `main` publishes to GitHub Pages via `.github/workflows/pages.yml`.

## Structure

```
index.html              Home: full-width hero, positioning line, selected work, demo reel, "How it works" (Plan/Shoot/Publish/Grow)
work/index.html         Photo gallery (filter: Business / Portrait / Lifestyle / Music / Cars) + lightbox, video section
services/index.html     "Work with me": what I do, process, packages (pricing low-key) + call to get in touch
about/index.html        Bio
contact/index.html      Contact details (no backend form)
assets/css/style.css    All styles
assets/js/media.js      ALL photos/videos (R2 paths), categories, hero, site details — edit this to change content
assets/js/main.js       Renders hero, grids, filters, lightbox and video embeds from media.js
```

All links are relative, so the site works both at `/sergeyavdeev-site/` (GitHub Pages project URL) and at the root of a custom domain.

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Where the photos live

Photos are served from the Cloudflare R2 bucket **`sergeyavdeev`**, public URL
`https://pub-3f80afa1bbf0415ab17996ed1a8d8c91.r2.dev` (set in `assets/js/media.js` as `MEDIA_BASE_URL`).

One folder per gallery category, each with three sizes:

```
business/  portrait/  lifestyle/  music/  cars/  about/
  <category>/original/<name>.jpg|png   untouched source file (archive; not loaded by the site)
  <category>/2000/<name>.webp + .jpg   large version (hero, lightbox)  – long edge 2000px, quality 80
  <category>/800/<name>.webp + .jpg    thumbnail (grid)                – long edge 800px, quality 80
```

The site loads the `.webp` files; the `.jpg` copies are there as a fallback/for sharing.
Objects are uploaded with `Cache-Control: public, max-age=31536000, immutable`, so **give a changed photo a new file name** rather than overwriting an old one (otherwise browsers/CDN may keep showing the old image).

## Adding or replacing photos

1. **Make the web sizes.** For each photo create `<name>.webp` (and optionally `.jpg`) at 2000px and 800px on the long edge.
   Use lowercase names without spaces, e.g. `kitchen-remodel-01`. Example with ImageMagick:
   ```bash
   magick in.jpg -resize 2000x2000\> -quality 80 2000/kitchen-remodel-01.webp
   magick in.jpg -resize 800x800\>   -quality 80 800/kitchen-remodel-01.webp
   ```
2. **Upload** to the bucket under `<category>/2000/` and `<category>/800/` (and the untouched file under `<category>/original/` if you want an archive) — via the Cloudflare dashboard (R2 → sergeyavdeev → Upload) or any S3 tool (`aws s3 cp --endpoint-url …`, rclone). Set Content-Type `image/webp` / `image/jpeg`.
3. **List it in `assets/js/media.js`** in `PHOTOS`:
   ```js
   { id: "business/kitchen-remodel-01", category: "business", w: 2000, h: 1333, featured: true },
   ```
   - `id` = `<folder>/<name>` without size folder or extension.
   - `featured: true` puts it in "Selected work" on the home page (keep it to ~6).
   - Order in the list = order in the gallery. Delete an entry to hide a photo (the file can stay in the bucket).
   - Optional `title: "…"` shows as a caption.
4. **New category?** Create the folder in the bucket and add it to `CATEGORIES` (`{ id: "homes", label: "Homes" }`); the Work page filter buttons are generated from that list.
5. **Hero / About photo:** change `HERO.image.id` / `ABOUT_PHOTO.id`. For a looping hero video upload an mp4 (e.g. `video/hero-loop.mp4`, ideally < 10 MB, no audio) and set `HERO.video = "video/hero-loop.mp4"`.
6. Commit and push to `main` — GitHub Pages redeploys in about a minute.

## Switching the image host

Only one line: change `window.MEDIA_BASE_URL` in `assets/js/media.js`
(e.g. to a custom domain like `https://media.sergeyavdeev.com` once it's connected to the bucket). The folder layout stays the same.

## Client logos

The "Trusted by" row (Home and Work with me) is driven by `window.CLIENTS` in `assets/js/media.js`. Logo files live in the bucket under `logos/web/<slug>.png` + `.webp` (monochrome #555 on transparent, ~240px tall) with untouched extracts in `logos/original/<slug>.png`. To add a logo: make a gray-on-transparent PNG/WebP, upload both to `logos/web/`, and add `{ name, logo: "<slug>", w, h }` to `CLIENTS`. Display height is normalised automatically from the aspect ratio.

## Reviews / testimonials

`assets/js/reviews.js` holds real Google reviews (verbatim) for "Sergey Avdeev Media", the overall rating/count, and which page each quote appears on (`pages: ["home", "services", "work"]`). To add one, copy the review text exactly from Google and add an item; remove items to hide them. With an empty `items` list the section disappears.

## Logo, favicons and social preview

`assets/brand/`: `logo.svg` (traced vector, uses `currentColor`; inlined in the header of every page), `logo.png` / `logo-white.png` (trimmed, transparent), favicons (`favicon-16/32/48.png`, `icon-192/512.png`), and `og-image.jpg` (1200×630 link-preview image). `favicon.ico`, `apple-touch-icon.png` and `site.webmanifest` sit at the site root.
The `og:image` / `og:url` tags use absolute GitHub Pages URLs — update them when moving to sergeyavdeev.com.

## Custom domain (later)

Add a `CNAME` file containing `sergeyavdeev.com`, point DNS at GitHub Pages (or move hosting to Cloudflare Pages), then set the domain in the repo's Pages settings.

