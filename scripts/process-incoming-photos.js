const sharp = require("sharp");
const path = require("path");

const SRC = path.join(__dirname, "..", "images", "incoming");
const OUT = path.join(__dirname, "..", "images", "gallery");

async function make(input, outBase, w, h) {
  const base = sharp(input).resize(w, h, {
    fit: "cover",
    position: sharp.strategy.attention,
  });
  await base.clone().webp({ quality: 78 }).toFile(outBase + ".webp");
  await base.clone().jpeg({ quality: 78, mozjpeg: true }).toFile(outBase + ".jpg");
  console.log("wrote", outBase + ".webp", "/", outBase + ".jpg");
}

async function run() {
  const jobs = [
    ["be289537-514d-4223-a5db-88bbe07d0c98.png", "gallery-03"], // gray shed, double doors, desert carports
    ["188fff87-f352-4bec-bb74-a8f476048280.png", "gallery-04"], // white shed, 3/4 view, residential
    ["2d62c8e5-87b3-4eb7-b9da-64562747ece0.png", "gallery-05"], // cream barn shed, open door, grass yard
    ["968acf95-8c9e-468d-8043-a21894320f70.png", "gallery-06"], // green-roof shed on trailer, mountains
    ["759d945d-c3de-4687-86bb-f86a1d90d236.png", "gallery-07"], // pine forest shed, wide angle
    ["e78d48c3-d374-4fb6-be8d-dc1e39b078f5.png", "gallery-08"], // pine forest shed, tighter angle
  ];

  for (const [file, outName] of jobs) {
    await make(path.join(SRC, file), path.join(OUT, outName), 800, 600);
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
