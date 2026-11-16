# NBHD Soccer Design System (overhaul-2026)

The reference page is `index.html`. Every page should look and read like it.

## Page skeleton

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="One plain sentence about this page.">
    <title>Page Name | Chicago Neighborhood Soccer</title>
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://nbhdsoccer.org/section/page.html">
    <meta property="og:title" content="Page Name | Chicago Neighborhood Soccer">
    <meta property="og:description" content="Same sentence.">
    <meta property="og:image" content="https://nbhdsoccer.org/assets/home/hero.jpg">
    <link rel="icon" type="image/png" href="/assets/nbhd_simple_logo_2025-07.png">
    <script src="/js/analytics.js"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/assets/css/shared-styles.css">
    <link rel="stylesheet" href="/assets/css/site.css">
</head>
<body>
    <div id="header-container"></div>
    <main>
        <!-- sections -->
    </main>
    <div id="footer-container"></div>
    <script src="/js/header-loader.js"></script>
</body>
</html>
```

- The header (logo, Programs · Events · About · Partner, Donate button) and footer come from `components/header.html` and `components/footer.html`. Never copy them into a page.
- Use root-absolute paths (`/assets/...`, `/about/about.html`) for assets and internal links.
- No inline `<style>` blocks and no page-specific CSS files. If a page needs a new component, add it to `assets/css/site.css` with an `nb-` prefix.

## Components (all in `assets/css/site.css`)

| Component | Markup |
|---|---|
| Page hero (photo) | `<section class="nb-page-hero" style="--hero-img:url('/assets/home/pickup.jpg')"><div class="nb-inner"><div class="nb-breadcrumb"><a href="/community-soccer/overview.html">Programs</a></div><h1>…</h1><p>…</p><div class="nb-hero-ctas nb-btn-row">buttons</div></div></section>` |
| Page hero (no photo) | add `nb-plain` to `nb-page-hero` |
| Section | `<section class="nb-section nb-bg-white\|nb-bg-soft\|nb-bg-dark"><div class="nb-inner">…</div></section>`; alternate white and soft |
| Section heading | `<p class="nb-eyebrow">Label</p><h2 class="nb-h2">Heading</h2><p class="nb-lede">One or two sentences.</p>` |
| Photo cards | `<div class="nb-cards">` (3 cols) or add `nb-cols-2` / `nb-cols-4`; each `<a class="nb-card" href>` with `<img>` + `<div class="nb-card-body"><span class="nb-card-tag"></span><h3></h3><p></p><span class="nb-link">Learn more</span></div>` |
| Text card | `<div class="nb-card nb-card-text"><div class="nb-card-body">…</div></div>` |
| Image + text | `<div class="nb-split">` (add `nb-reverse` to flip) with `<img>` and a `<div>` |
| Long text | `<div class="nb-prose">` |
| Facts (when/where/cost) | `<dl class="nb-info"><div><dt>When</dt><dd>Wednesdays</dd></div>…</dl>` |
| Callout | `<div class="nb-callout"><p>…</p></div>` |
| Numbers bar | `<section class="nb-stats"><div class="nb-inner"><div><span class="nb-stat-num">7,000+</span><span class="nb-stat-label">Members</span></div>…</div></section>` (4 items) |
| People | `<div class="nb-people"><div class="nb-person"><img><h3>Name</h3><p class="nb-role">Role</p><p>Bio</p></div></div>` |
| FAQ | `<div class="nb-faq"><details><summary>Question</summary><p>Answer</p></details></div>` |
| Table | `<div class="nb-table-wrap"><table class="nb-table">`; use `nb-num` on number cells |
| Form | `<form class="nb-form">` with label + input pairs |
| Buttons | `nb-btn nb-btn-donate` (solid green), `nb-btn nb-btn-play` (white, for dark/photo backgrounds), `nb-btn nb-btn-outline` (for light backgrounds); group in `nb-btn-row` |
| Donate band | copy the `nb-donate` section from `index.html` |
| Video | `<div class="nb-embed"><iframe …></iframe></div>` |

## Page rhythm

1. Photo hero: what this is, in one sentence, plus the main action
2. 2–4 sections, alternating white and soft backgrounds
3. End with a clear next step: the Donate band, or a Play / Partner call to action

## Voice

- Plain, short, honest. Written like Andre talks: direct, and no nonprofit jargon.
- No hype ("Chicago's best…", "transformative", "empowering"), no sad-story framing, and no long origin stories on every page.
- Short sentences. Avoid em dashes; use periods.
- Keep real facts (names, places, partners, numbers) from the current pages. Never invent numbers, dates, quotes or partners. If something looks out of date, keep it neutral ("annual", "every September") and flag it.
- Use the same numbers as the home page: 7,000+ members, 400 players every week, 100+ events a year, playing since 2012.

## Photos

- Use real NBHD photos only, not the illustrated images in `assets/hero/` (`*_city_*`, `kids_nighttime_city`).
- Web-sized copies live in `assets/home/` and `assets/web/`. Before using an original over ~500 KB, resize it into `assets/web/` (max 1600px wide, JPEG quality 78) with Python/PIL.
- Every `<img>` needs real `alt` text, and `loading="lazy"` below the hero.

## Calls to action

- Play: `https://www.meetup.com/nbhdsoccer/events/`
- Donate: `/support/support.html#donate` (Zeffy form embedded there)
- Partner: `/support/partner.html`
- Contact: `mailto:nbhdsoccer@gmail.com`
