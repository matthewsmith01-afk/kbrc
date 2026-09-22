# Image assets

The site references the photos below. Clean solid-color placeholder `.svg` files
with the same base name are provided so the layout looks intentional right now. To
use the real photos, drop the matching `.jpg` (or `.png`) into this folder using the
exact base name. The HTML already prefers the raster file and falls back to the SVG
placeholder, so no HTML changes are needed.

| Purpose | File the HTML looks for | Placeholder here | Your photo |
| --- | --- | --- | --- |
| Club logo (header/footer) | `logo.png` | `logo.svg` | The blue footprint "Kachemak Bay Running Club" mark |
| Homepage hero | `hero-bay.jpg` | `hero-bay.svg` | Fireweed over the bay with a boat |
| Spit Run / race start | `spit-run-start.jpg` | `spit-run-start.svg` | Rainy start line by The Dragging Anchor |
| Migration / youth run | `youth-run.jpg` | `youth-run.svg` | Kids running past the ship |
| About / mission | `lupine.jpg` | `lupine.svg` | Lupine field |
| About page photo | `club-table.jpg` | `club-table.svg` | Volunteer at the club table with banner |
| Board / community | `community.jpg` | `community.svg` | Members at a race |
| Membership page | `fireweed-bay.jpg` | `fireweed-bay.svg` | Fireweed and calm bay with mountains |

## How to add the real files

1. Save each photo with the base name in the "looks for" column, as a `.jpg`.
   Example: save the fireweed-and-boat photo as `hero-bay.jpg` in this folder.
2. Save the logo as `logo.png` in this folder.
3. Reload the site. No HTML changes needed.

Recommended sizes: hero around 2000px wide, section photos around 1200px wide,
logo around 400px wide with a transparent background.
