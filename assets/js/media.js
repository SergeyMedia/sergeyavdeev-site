/*
 * media.js — the ONE place that lists every photo and video on the site.
 *
 * Files live in the Cloudflare R2 bucket "sergeyavdeev", one folder per category:
 *   <category>/original/<name>.<ext>   untouched source file (archive only, not used by the site)
 *   <category>/2000/<name>.webp|.jpg   large web version (hero, lightbox)
 *   <category>/800/<name>.webp|.jpg    small web version (grid thumbnails)
 * A photo entry's `id` is "<category>/<name>" — see README "Adding or replacing photos".
 */
window.MEDIA_BASE_URL = "https://pub-3f80afa1bbf0415ab17996ed1a8d8c91.r2.dev"; // R2 public URL (swap for a custom domain later)

(function () {
  window.SITE = {
    name: "Sergey Avdeev",
    tagline: "Photography & video for Seattle businesses",
    email: "",            // TODO: public contact email (not on the old site)
    phone: "",            // TODO: optional phone
    instagram: "https://www.instagram.com/sergeyvideo/",
    location: "Seattle, WA",
    reelYouTubeId: "Au9IBpr9K24" // demo reel from the current site
  };

  // Gallery filters, in display order. `id` must match the bucket folder name.
  window.CATEGORIES = [
    { id: "business", label: "Business" },
    { id: "portrait", label: "Portrait" },
    { id: "lifestyle", label: "Lifestyle" },
    { id: "music", label: "Music" },
    { id: "cars", label: "Cars" }
  ];

  // Home page hero. Set `video` to an mp4 path in the bucket (e.g. "video/hero-loop.mp4") for a muted loop.
  window.HERO = {
    image: { id: "business/still-2026-02-23-104702am", alt: "Aerial view of a modern Seattle home in autumn" },
    video: null
  };

  // About page photo.
  window.ABOUT_PHOTO = { id: "about/sergey-portrait", alt: "Sergey Avdeev" };

  // Photos, in gallery order. `featured: true` = shown in "Selected work" on the home page (pick ~6).
  // w/h = pixel size of the 2000px version (used for layout; approximate is fine).
  window.PHOTOS = [
    { id: "business/dsc08101", category: "business", w: 2000, h: 1125, featured: true },
    { id: "business/still-2025-10-28-80623pm", category: "business", w: 2000, h: 1126 },
    { id: "business/untitled-223", category: "business", w: 2000, h: 1333 },
    { id: "business/dsc-3985", category: "business", w: 2000, h: 1335 },
    { id: "business/dsc-3951", category: "business", w: 2000, h: 1334 },
    { id: "business/still-2025-10-28-80313pm", category: "business", w: 2000, h: 1126 },
    { id: "business/dsc-5061", category: "business", w: 2000, h: 1334 },
    { id: "business/dsc-3673", category: "business", w: 2000, h: 1334 },
    { id: "business/still-2025-10-28-80557pm", category: "business", w: 2000, h: 1126 },
    { id: "business/dsc-3568", category: "business", w: 1333, h: 2000 },
    { id: "business/dsc-4761", category: "business", w: 2000, h: 1333 },
    { id: "business/dsc-3561", category: "business", w: 2000, h: 1334 },
    { id: "business/still-2025-10-28-80638pm", category: "business", w: 2000, h: 1262 },
    { id: "business/dsc-3522", category: "business", w: 1334, h: 2000 },
    { id: "business/still-2026-02-23-103805am", category: "business", w: 2000, h: 1125 },
    { id: "business/dsc07159", category: "business", w: 2000, h: 1334, featured: true },
    { id: "business/still-2026-02-23-104606am", category: "business", w: 2000, h: 1126 },
    { id: "business/dsc-3885", category: "business", w: 2000, h: 1334 },
    { id: "business/still-2018-01-26-120906am", category: "business", w: 1866, h: 1194 },
    { id: "business/still-2025-10-28-80133pm", category: "business", w: 2000, h: 1126 },
    { id: "business/dsc07682-dxo", category: "business", w: 1333, h: 2000 },
    { id: "business/still-2026-02-23-103820am", category: "business", w: 2000, h: 1125 },
    { id: "business/still-2026-02-23-104702am", category: "business", w: 2000, h: 1126 },
    { id: "portrait/dsc08874", category: "portrait", w: 2000, h: 1334 },
    { id: "portrait/dsc04440", category: "portrait", w: 2000, h: 1334 },
    { id: "portrait/515509449-4738824879677295-5832874259456989141-n", category: "portrait", w: 1333, h: 2000 },
    { id: "portrait/dsc-5618", category: "portrait", w: 2000, h: 1335, featured: true },
    { id: "portrait/dsc07761-dxo", category: "portrait", w: 2000, h: 1337 },
    { id: "portrait/dsc06718", category: "portrait", w: 1333, h: 2000 },
    { id: "portrait/dsc07284", category: "portrait", w: 1333, h: 2000 },
    { id: "portrait/dsc-9362", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc05594-dxo", category: "portrait", w: 1333, h: 2000 },
    { id: "portrait/ar502803-dxo", category: "portrait", w: 2000, h: 1333 },
    { id: "portrait/515011168-4738824569677326-2458228787118440868-n", category: "portrait", w: 1333, h: 2000 },
    { id: "portrait/dsc-5787", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc-4036", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc-6375", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc-6031", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/ar502142", category: "portrait", w: 1333, h: 2000 },
    { id: "portrait/dsc03279-dxo", category: "portrait", w: 2000, h: 1334 },
    { id: "portrait/dsc-5794", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc-6757", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc-5915", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc-5482", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc-6281", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc-5420", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc-4059", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc-4005", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc-3501", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc-2420", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc-2302", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc-1685", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc-1133", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc-0116", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc-2224", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc-2180", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc-9801", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc-9240", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc-8951", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc09422", category: "portrait", w: 1333, h: 2000 },
    { id: "portrait/dsc-8864", category: "portrait", w: 2000, h: 1122 },
    { id: "portrait/dsc-8287", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc-8175", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc-7903", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc-7914", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc-7112", category: "portrait", w: 2000, h: 1334 },
    { id: "portrait/dsc-5099", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc-1755", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc-9173", category: "portrait", w: 1337, h: 2000 },
    { id: "portrait/dsc-7853", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc-7796", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc-7213", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc-7147", category: "portrait", w: 1334, h: 2000 },
    { id: "portrait/dsc-6726", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc-4874", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc-4839", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc-4777", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc-4491", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc-3812", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc-3776", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/ar500957-dxo", category: "portrait", w: 1333, h: 2000 },
    { id: "portrait/dsc-3775", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc-3740", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc-3683", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc-3650", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc-2433", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc-2671", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc-2602", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc-2454", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc-1885", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc-2597", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc-1936", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/dsc-2839", category: "portrait", w: 2000, h: 1335 },
    { id: "portrait/ar504390-dxo", category: "portrait", w: 2000, h: 1333 },
    { id: "portrait/ar506242-dxo", category: "portrait", w: 1333, h: 2000 },
    { id: "portrait/dsc00600", category: "portrait", w: 1333, h: 2000 },
    { id: "portrait/dsc09351", category: "portrait", w: 1333, h: 2000 },
    { id: "lifestyle/dsc-1935", category: "lifestyle", w: 2000, h: 1334 },
    { id: "lifestyle/dsc-9617", category: "lifestyle", w: 2000, h: 1335 },
    { id: "lifestyle/dsc-5923", category: "lifestyle", w: 2000, h: 1335 },
    { id: "lifestyle/dsc-9563", category: "lifestyle", w: 2000, h: 1335 },
    { id: "lifestyle/dsc00410", category: "lifestyle", w: 1336, h: 2000 },
    { id: "lifestyle/dsc-9552", category: "lifestyle", w: 2000, h: 1335 },
    { id: "lifestyle/dsc-9242", category: "lifestyle", w: 2000, h: 1335, featured: true },
    { id: "lifestyle/ar500202-dxo", category: "lifestyle", w: 2000, h: 1334 },
    { id: "lifestyle/dsc-9199", category: "lifestyle", w: 2000, h: 1335 },
    { id: "lifestyle/dsc-3639", category: "lifestyle", w: 1335, h: 2000 },
    { id: "lifestyle/dsc-9164", category: "lifestyle", w: 2000, h: 1335 },
    { id: "lifestyle/dsc-7888", category: "lifestyle", w: 1335, h: 2000 },
    { id: "lifestyle/dsc-7870", category: "lifestyle", w: 2000, h: 1335 },
    { id: "lifestyle/dsc-7859", category: "lifestyle", w: 1335, h: 2000 },
    { id: "lifestyle/dsc-7838", category: "lifestyle", w: 1335, h: 2000 },
    { id: "lifestyle/dsc-4203-1", category: "lifestyle", w: 2000, h: 1335 },
    { id: "lifestyle/ar500469", category: "lifestyle", w: 1333, h: 2000 },
    { id: "music/ar501522-dxo", category: "music", w: 1104, h: 1656 },
    { id: "music/dsc-7008", category: "music", w: 2000, h: 1335 },
    { id: "music/dsc-6409", category: "music", w: 2000, h: 1335, featured: true },
    { id: "music/dsc-6073", category: "music", w: 2000, h: 1335 },
    { id: "music/dsc-6050", category: "music", w: 2000, h: 1335 },
    { id: "music/dsc-6061", category: "music", w: 2000, h: 1335 },
    { id: "music/dsc-5603", category: "music", w: 2000, h: 1335 },
    { id: "music/dsc-3423", category: "music", w: 2000, h: 1335 },
    { id: "music/dsc-3385", category: "music", w: 2000, h: 1335 },
    { id: "music/dsc-8151", category: "music", w: 2000, h: 1335 },
    { id: "music/dsc-7021", category: "music", w: 2000, h: 1335 },
    { id: "music/dsc-7705", category: "music", w: 2000, h: 1335 },
    { id: "music/dsc-4523", category: "music", w: 2000, h: 1335 },
    { id: "music/dsc-3879", category: "music", w: 2000, h: 1335 },
    { id: "music/dsc06483", category: "music", w: 1333, h: 2000 },
    { id: "cars/untitled-19", category: "cars", w: 2000, h: 1500 },
    { id: "cars/untitled-20", category: "cars", w: 2000, h: 1500 },
    { id: "cars/untitled-21", category: "cars", w: 2000, h: 1500 },
    { id: "cars/untitled-22", category: "cars", w: 2000, h: 1500 },
    { id: "cars/untitled-23", category: "cars", w: 2000, h: 1500 },
    { id: "cars/untitled-24", category: "cars", w: 2000, h: 1500 },
    { id: "cars/untitled-25", category: "cars", w: 2000, h: 1500 },
    { id: "cars/untitled-26", category: "cars", w: 2000, h: 1500 },
    { id: "cars/untitled-27", category: "cars", w: 2000, h: 1500 },
    { id: "cars/untitled-28", category: "cars", w: 2000, h: 1125 },
    { id: "cars/untitled-29", category: "cars", w: 2000, h: 1500 },
    { id: "cars/untitled-30", category: "cars", w: 2000, h: 1500 },
    { id: "cars/untitled-31", category: "cars", w: 2000, h: 1500 },
    { id: "cars/untitled-32", category: "cars", w: 2000, h: 1500 },
    { id: "cars/untitled-33", category: "cars", w: 2000, h: 1500 },
    { id: "cars/untitled-34", category: "cars", w: 2000, h: 1125, featured: true },
    { id: "cars/untitled-35", category: "cars", w: 2000, h: 1500 },
    { id: "cars/untitled-36", category: "cars", w: 2000, h: 1125 },
    { id: "cars/untitled-16", category: "cars", w: 2000, h: 1175 }
  ];

  // Videos. `youtube` ids are embedded; `path` (mp4 in the bucket) plays inline instead.
  window.VIDEOS = [
    { title: "Demo reel", youtube: "Au9IBpr9K24" }
    // { title: "Project tour", path: "video/project-tour.mp4", poster: "video/project-tour.jpg" }
  ];

  // Build a URL for a photo. size: 800 (thumbnails) or 2000 (large). Uses WebP.
  window.mediaUrl = function (item, size) {
    var base = window.MEDIA_BASE_URL.replace(/\/$/, "");
    if (item.path) return base + "/" + item.path; // raw path (videos, posters)
    var parts = item.id.split("/");
    var dir = (size && size <= 1000) ? "800" : "2000";
    return base + "/" + parts[0] + "/" + dir + "/" + parts.slice(1).join("/") + ".webp";
  };
})();
