# Launch Checklist

Things to do before this goes live on Netlify.

## 1. Remaining placeholder photos — just the process steps now

The gallery is fully populated with real photos (8 of 8) and the hero, social share image, and "Move Day" process step all use real photos too. The only placeholders left are:

- `images/process/process-1.svg` through `process-3.svg` — 700x500 each, steps 1–3 of "How It Works" (step 4 already has a real photo)

These need photos that actually depict the step (e.g. reviewing a quote request, someone photographing a shed/access path, measuring a gate) rather than more finished-shed glamour shots — send those over and I'll run them through the same pipeline. Use WebP or well-compressed JPG; run `npm install` then `npm run process-photos` (edit `scripts/process-real-photos.js` to point at the new source files first), or process manually. Keep the same `width`/`height` attributes so nothing shifts on load.

### Real photos in place

- **Hero** — truck hauling multiple buildings (`images/hero/hero-01.*`) — from the old site
- **Gallery (8 of 8, real):**
  1. Shed delivered and placed on a dirt lot — old site
  2. Oversize-load truck hauling a shed, mountains behind — old site
  3. Gray lofted shed with double doors between two carports — desert yard
  4. White shed with black trim, 3/4 view — residential yard
  5. Cream barn-style shed, garage door open — grassy yard with white fence
  6. Green-roofed shed freshly delivered next to the trailer — desert, mountains behind
  7 & 8. Dark shed with roll-up door among pine trees — two angles of the same job
- **"Move Day" process step + social share image** — reused the placed-shed shot (`images/process/process-4-real.*`, `images/social/og-image.*`)

The old site's `logo.png` (glossy orange house icon) was **not** carried over — it doesn't match the new rugged/industrial direction, and the new design uses the text wordmark in the header instead. Let me know if you'd rather commission/keep a real logo mark.

## 2. Replace testimonial placeholders

In `index.html`, search for `TESTIMONIAL PLACEHOLDERS` — three cards with placeholder quote text and "Customer Name, City." Paste in real reviews (e.g. from your Google Business Profile) and adjust the star rating if any review isn't 5 stars.

## 3. Add gallery captions

Every gallery photo still has a placeholder caption (`data-caption="PLACEHOLDER caption..."`) shown in the lightbox — including the real ones. Replace each with a short real description (size, location, etc.) since I don't know the specifics of these jobs.

## 4. Confirm contact details

Pulled from the current live site — please confirm these are still correct:
- Phone: (806) 333-8972
- Location: Surprise, AZ
- Hours: Mon–Fri, 8am–5pm Arizona time
- Service radius: ~200 miles, evaluated case-by-case

## 5. Optional: real trust-bar numbers

The trust bar currently uses factual, non-numeric claims (Owner-Operated, Fully Insured, ~200 Mi. Radius) since no verified stats were provided. If you want to show a real number — years in business, buildings moved, etc. — give me the figure and I'll swap it in.

## 6. Netlify setup after deploy

- Connect this repo/folder to a new Netlify site.
- Netlify Forms will pick up the quote form automatically (`data-netlify="true"` is already set) — go to **Site settings → Forms → Form notifications** in Netlify and add an email/Slack notification so you actually see submissions.
- Point the `sbarenterprises.com` domain at the new Netlify site once you're ready to cut over from the old one.

## 7. Double-check before go-live

- Run Lighthouse/PageSpeed once real (compressed) photos are in — placeholder SVGs are artificially fast, so re-verify the Performance score with real assets.
- Update `sitemap.xml` / canonical URLs if the final domain differs from `https://www.sbarenterprises.com/`.
