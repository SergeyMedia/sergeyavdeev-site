# sergeyavdeev.com

Portfolio site for **Sergey Avdeev** — photography & video for Seattle home, garden and construction businesses.

Plain HTML/CSS/JS. No build step, no dependencies. Minimal, image-first design with small type.

- **Preview:** https://sergeymedia.github.io/sergeyavdeev-site/
- **Deploys:** every push to `main` publishes to GitHub Pages via `.github/workflows/pages.yml`.

## Structure

```
index.html              Home: full-width hero, selected work, demo reel, short intro
work/index.html         Photo gallery (filter: Homes / Gardens / Construction) + lightbox, video section
services/index.html     "Work with me": packages + call to get in touch (linked from nav/footer, not the home page)
about/index.html        Bio
contact/index.html      Contact details (no backend form)
assets/css/style.css    All styles
assets/js/media.js      ALL photo/video URLs + site details (email, Instagram) — edit this to change content
assets/js/main.js       Renders hero, grids, filters, lightbox and video embeds from media.js
```

All links are relative, so the site works both at `/sergeyavdeev-site/` (GitHub Pages project URL) and at the root of a custom domain.

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Adding / changing photos and video

Everything lives in `assets/js/media.js`:

- `HERO` — the home page hero image. Set `HERO.video` to a `.mp4` path to use a muted autoplay loop instead.
- `PHOTOS` — each item has `path` (location in R2), `placeholder` (temporary image), `category`, `title`, and `featured: true` to show on the home page.
- `VIDEOS` — YouTube ids (embedded with a lightweight click-to-play thumbnail) or `.mp4` paths on R2.
- `SITE` — name, email, Instagram, etc. (`email` is still empty → set it to show a mailto link on Contact).

## Switching images to Cloudflare R2 (one-line change)

1. Create an R2 bucket, enable public access (an `r2.dev` URL or a custom domain such as `media.sergeyavdeev.com`).
2. Upload files using the same paths listed in `media.js` (e.g. `homes/01.jpg`, `gardens/02.jpg`, `hero/hero.jpg`).
3. In `assets/js/media.js` change:

   ```js
   window.MEDIA_BASE_URL = "";
   ```
   to
   ```js
   window.MEDIA_BASE_URL = "https://media.sergeyavdeev.com";
   ```

When `MEDIA_BASE_URL` is set, every image/video URL becomes `MEDIA_BASE_URL + "/" + path`; when empty, the placeholder URLs are used.

Tip: export web-sized JPEGs (~2400px long edge, quality ~80) before uploading.

## Custom domain (later)

Add a `CNAME` file containing `sergeyavdeev.com`, point DNS at GitHub Pages (or move hosting to Cloudflare Pages), then set the domain in the repo's Pages settings.

## Placeholder credits

Temporary images are from [Unsplash](https://unsplash.com) and will be replaced with Sergey's own work.
