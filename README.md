# Kachemak Bay Running Club - Website

A best-in-class marketing and community website for the Kachemak Bay Running Club, a 501(c)(3) nonprofit in Homer, Alaska, and a member of the Road Runners Club of America.

Designed to feel like the place it serves: deep bay blues, glacier ice, spruce green, fireweed magenta and midnight-sun gold, with hand-built coastal scenery rendered as scalable SVG art.

## What is included

| Page | File | Highlights |
| --- | --- | --- |
| Home | `index.html` | Full-screen parallax coastal hero, animated stat counters, mission, featured races, membership teaser, marquee |
| Events | `events.html` | Featured flagship race, event grid, and live Race Result registration widget |
| Results | `results.html` | Filterable and searchable results table (by race and runner name), record stats |
| Membership | `membership.html` | Four membership tiers linking to Race Result registration |
| About | `about.html` | Club story, values, milestone timeline, board summary |
| Board | `board.html` | Full volunteer board (officers and at-large) plus a join-the-board invitation |

## Race Result integration

Registration and payment are handled by Race Result, the club's platform:

- Membership: every "Select" button and the main register button on `membership.html`
  link to `https://my.raceresult.com/373834/` (opens in a new tab).
- Events: register buttons link out to Race Result (`https://my.raceresult.com/`).
  The full-event embed widget was removed by request in favor of clean links.

To point membership at a different Race Result event in future years, update the
`373834` links in `membership.html`.

## Photos and logo

Real photos and the club logo live in `assets/img/`. Every image references a real
raster file (e.g. `logo.png`, `hero-bay.jpg`) and automatically falls back to a
clean solid-color placeholder if the raster is not present, so the layout is never
broken. No HTML changes are needed once the real files are added.

### Adding your photos (from Google Drive or anywhere)

1. Download your photos to your computer.
2. Rename each to the base name the site expects and save it into `assets/img/`:
   - `logo.png` - club logo
   - `hero-bay.jpg` - homepage hero
   - `spit-run-start.jpg` - Spit Run card and Events page top
   - `youth-run.jpg` - Migration card and Results page top
   - `lupine.jpg` - homepage mission and About page top
   - `club-table.jpg` - About page
   - `community.jpg` - Board page
   - `fireweed-bay.jpg` - Membership page top
3. Reload the site. The photos appear automatically.

See `assets/img/README-IMAGES.md` for the full table and recommended sizes.

## Design system

- Colors, typography and spacing are defined as CSS custom properties at the top of `assets/css/styles.css`. Change the brand there and it cascades everywhere.
- Type: Fraunces (display), Space Grotesk (UI), Inter (body), loaded from Google Fonts with robust system fallbacks.
- All imagery is inline SVG, so there are no external image assets to host and nothing to break offline.

## Interactivity (`assets/js/main.js`, no dependencies)

- Sticky header that condenses on scroll
- Accessible mobile navigation with focus-friendly toggle
- Scroll-reveal animations via IntersectionObserver
- Animated number counters
- Hero parallax layers
- Results table live filter + search
- Automatic footer year

## Accessibility and performance

- Semantic landmarks, skip link, ARIA labels, keyboard-visible focus rings
- Full `prefers-reduced-motion` support (animations and parallax disable gracefully)
- Fluid, responsive layout from small phones to large desktops
- Zero JavaScript frameworks and zero build step

## Preview locally

```bash
cd kbrc-website
python3 -m http.server 8080
# open http://localhost:8080
```

## Moving this into WordPress

This prototype is intentionally structured to port cleanly into a WordPress theme:

1. Copy `assets/css/styles.css` and `assets/js/main.js` into your theme and enqueue them with `wp_enqueue_style` / `wp_enqueue_script`.
2. Map the shared header and footer markup into `header.php` and `footer.php`.
3. Turn each page into a template or a Gutenberg/block pattern:
   - Events -> a custom post type `event` (date, distance, location, tag).
   - Results -> a custom post type or an imported table from your timing provider (RunSignup export).
   - Membership tiers -> reusable blocks; wire the join form to a payment/CRM provider (RunSignup, Stripe, or a form plugin like Gravity Forms).
4. Replace the placeholder board members, milestone copy and sample results with live content.

## Content notes

Board members are the club's real 2026 board. Event dates and sample race results are
representative placeholders; replace them with live data before launch. Club facts
(mission, RRCA membership, signature races such as the Spit Run, Cosmic Hamlet Half
Marathon, Migration Run, Mountain Classic and Turkey Trot, and membership pricing) are
based on information about the club. The Dog Jog has been removed as the club no longer
holds that event.
