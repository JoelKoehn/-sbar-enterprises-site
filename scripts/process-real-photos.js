const sharp = require("sharp");
const path = require("path");

const SRC = "C:/Users/koehn/AppData/Local/Temp/claude/C--Users-koehn-OneDrive-powerhouse-roasters-site/bda9fdeb-f909-4faf-98ea-74586ff43f70/scratchpad/old-site-images";
const OUT = path.join(__dirname, "..", "images");

async function make(input, outBase, w, h, opts = {}) {
  const base = sharp(input).resize(w, h, {
    fit: "cover",
    position: opts.position || sharp.strategy.attention,
  });

  await base.clone().webp({ quality: 78 }).toFile(outBase + ".webp");
  await base.clone().jpeg({ quality: 78, mozjpeg: true }).toFile(outBase + ".jpg");

  console.log("wrote", outBase + ".webp", "/", outBase + ".jpg");
}

async function run() {
  // Hero — black semi hauling multiple buildings, dramatic sky
  await make(
    path.join(SRC, "portable-building-move-2.jpg"),
    path.join(OUT, "hero", "hero-01"),
    1600,
    1000
  );

  // Gallery 01 — shed delivered & placed, red dirt lot
  await make(
    path.join(SRC, "on-site-shed-relocation.jpg"),
    path.join(OUT, "gallery", "gallery-01"),
    800,
    600
  );

  // Gallery 02 — oversize load truck hauling a shed, mountain backdrop (portrait source)
  await make(
    path.join(SRC, "portable-building-move-1.jpg"),
    path.join(OUT, "gallery", "gallery-02"),
    800,
    600
  );

  // Social share image — crop from the hero shot
  await make(
    path.join(SRC, "portable-building-move-2.jpg"),
    path.join(OUT, "social", "og-image"),
    1200,
    630
  );

  // Process step 4 (move day / placement) — reuse the placed-shed shot
  await make(
    path.join(SRC, "on-site-shed-relocation.jpg"),
    path.join(OUT, "process", "process-4-real"),
    700,
    500
  );
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
