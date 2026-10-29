/*
 * media.js — the ONE place that lists every photo and video on the site.
 *
 * To move to Cloudflare R2, set MEDIA_BASE_URL to your bucket's public URL
 * (e.g. "https://media.sergeyavdeev.com" or "https://pub-xxxx.r2.dev") and
 * upload files to the paths given in each item's `path`. While MEDIA_BASE_URL
 * is empty, the site shows the `placeholder` URLs instead.
 */
window.MEDIA_BASE_URL = ""; // <- one-line swap to R2, e.g. "https://media.sergeyavdeev.com"

(function () {
  var U = function (id) { return "https://images.unsplash.com/photo-" + id; };

  window.SITE = {
    name: "Sergey Avdeev",
    tagline: "Photography & video for Seattle businesses",
    email: "",            // TODO: public contact email (not on the old site)
    phone: "",            // TODO: optional phone
    instagram: "https://www.instagram.com/sergeyvideo/",
    location: "Seattle, WA",
    reelYouTubeId: "Au9IBpr9K24" // demo reel from the current site
  };

  window.CATEGORIES = [
    { id: "homes", label: "Homes" },
    { id: "gardens", label: "Gardens" },
    { id: "construction", label: "Construction" }
  ];

  // Hero: set `video` (path under MEDIA_BASE_URL, .mp4) to use a muted loop instead of the still.
  window.HERO = {
    image: { path: "hero/hero.jpg", placeholder: U("1600585154340-be6161a56a0c"), alt: "Modern home at dusk" },
    video: null // e.g. { path: "hero/reel-loop.mp4", placeholderUrl: "" }
  };

  // Photos. `featured: true` puts it on the home page.
  window.PHOTOS = [
    { path: "homes/01.jpg", placeholder: U("1600585154340-be6161a56a0c"), category: "homes", title: "Residence at dusk", featured: true, ratio: "3/2" },
    { path: "gardens/01.jpg", placeholder: U("1585320806297-9794b3e4eeae"), category: "gardens", title: "Garden path", featured: true, ratio: "3/2" },
    { path: "construction/01.jpg", placeholder: U("1504307651254-35680f356dfd"), category: "construction", title: "Site crew", featured: true, ratio: "3/2" },
    { path: "homes/02.jpg", placeholder: U("1600607687939-ce8a6c25118c"), category: "homes", title: "Living room", featured: true, ratio: "3/2" },
    { path: "homes/03.jpg", placeholder: U("1600596542815-ffad4c1539a9"), category: "homes", title: "Pool house", featured: true, ratio: "3/2" },
    { path: "gardens/02.jpg", placeholder: U("1558904541-efa843a96f01"), category: "gardens", title: "Lawn detail", featured: true, ratio: "3/2" },
    { path: "homes/04.jpg", placeholder: U("1600566753190-17f0baa2a6c3"), category: "homes", title: "Entry", ratio: "3/2" },
    { path: "construction/02.jpg", placeholder: U("1541888946425-d81bb19240f5"), category: "construction", title: "Foundation", ratio: "3/2" },
    { path: "gardens/03.jpg", placeholder: U("1416879595882-3373a0480b5b"), category: "gardens", title: "Planting", ratio: "3/2" },
    { path: "homes/05.jpg", placeholder: U("1600047509807-ba8f99d2cdde"), category: "homes", title: "Facade", ratio: "3/2" },
    { path: "construction/03.jpg", placeholder: U("1503387762-592deb58ef4e"), category: "construction", title: "Plans", ratio: "3/2" },
    { path: "homes/06.jpg", placeholder: U("1600210492486-724fe5c67fb0"), category: "homes", title: "Interior", ratio: "3/2" },
    { path: "gardens/04.jpg", placeholder: U("1466692476868-aef1dfb1e735"), category: "gardens", title: "Seedlings", ratio: "3/2" },
    { path: "construction/04.jpg", placeholder: U("1621905251189-08b45d6a269e"), category: "construction", title: "Electrical", ratio: "3/2" },
    { path: "homes/07.jpg", placeholder: U("1600573472550-8090b5e0745e"), category: "homes", title: "Stair and glass", ratio: "3/2" },
    { path: "gardens/05.jpg", placeholder: U("1592595896551-12b371d546d5"), category: "gardens", title: "Front yard", ratio: "3/2" },
    { path: "construction/05.jpg", placeholder: U("1523413651479-597eb2da0ad6"), category: "construction", title: "Tile work", ratio: "3/2" },
    { path: "homes/08.jpg", placeholder: U("1512917774080-9991f1c4c750"), category: "homes", title: "Courtyard pool", ratio: "3/2" },
    { path: "gardens/06.jpg", placeholder: U("1564013799919-ab600027ffc6"), category: "gardens", title: "Backyard", ratio: "3/2" },
    { path: "homes/09.jpg", placeholder: U("1598928506311-c55ded91a20c"), category: "homes", title: "Den", ratio: "3/2" },
    { path: "homes/10.jpg", placeholder: U("1501183638710-841dd1904471"), category: "homes", title: "Living space", ratio: "3/2" },
    { path: "construction/07.jpg", placeholder: U("1517089596392-fb9a9033e05b"), category: "construction", title: "Earthworks", ratio: "3/2" }
  ];

  // Videos. `youtube` ids are embedded; `path` (mp4 on R2) plays inline instead when set.
  window.VIDEOS = [
    { title: "Demo reel", youtube: "Au9IBpr9K24", category: "reel" }
    // { title: "Project tour", path: "video/project-tour.mp4", poster: "video/project-tour.jpg", category: "homes" }
  ];

  // Resolve a media item to a URL. `w` = desired width for placeholders.
  window.mediaUrl = function (item, w) {
    if (window.MEDIA_BASE_URL) return window.MEDIA_BASE_URL.replace(/\/$/, "") + "/" + item.path;
    var u = item.placeholder || item.placeholderUrl || "";
    if (u.indexOf("images.unsplash.com") > -1) u += "?auto=format&fit=crop&q=75&w=" + (w || 1600);
    return u;
  };
})();
