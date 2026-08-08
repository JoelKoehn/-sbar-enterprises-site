const fs = require("fs");
const path = require("path");

function placeholder({ w, h, label, sub }) {
  const fontSize = Math.max(18, Math.round(w / 28));
  const subSize = Math.max(12, Math.round(w / 55));
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${label}">
  <rect width="${w}" height="${h}" fill="#3E4A52"/>
  <rect x="6" y="6" width="${w - 12}" height="${h - 12}" fill="none" stroke="#C1502E" stroke-width="4" stroke-dasharray="14 10"/>
  <g transform="translate(${w / 2}, ${h / 2})" text-anchor="middle" font-family="Arial, sans-serif">
    <text y="-${subSize}" fill="#F2EDE4" font-size="${fontSize}" font-weight="700">${label}</text>
    <text y="${subSize * 1.6}" fill="#C1502E" font-size="${subSize}" font-weight="600" letter-spacing="1">${sub}</text>
  </g>
</svg>`;
}

const outDir = path.join(__dirname, "..", "images");

const items = [
  { file: "hero/hero-placeholder.svg", w: 1600, h: 1000, label: "HERO PHOTO PLACEHOLDER", sub: "REPLACE WITH REAL JOB PHOTO — SHED MID-MOVE" },
  { file: "social/og-placeholder.svg", w: 1200, h: 630, label: "SOCIAL SHARE IMAGE PLACEHOLDER", sub: "REPLACE WITH REAL JPG/PNG BEFORE LAUNCH" },
];

for (let i = 1; i <= 8; i++) {
  items.push({
    file: `gallery/gallery-${String(i).padStart(2, "0")}.svg`,
    w: 800,
    h: 600,
    label: `GALLERY PHOTO ${i}`,
    sub: "REPLACE WITH REAL JOB PHOTO",
  });
}

const steps = [
  "REQUEST A QUOTE",
  "SEND PHOTOS",
  "CLEARANCES CONFIRMED",
  "MOVE DAY",
];
steps.forEach((s, idx) => {
  items.push({
    file: `process/process-${idx + 1}.svg`,
    w: 700,
    h: 500,
    label: `STEP ${idx + 1} PHOTO`,
    sub: `REPLACE — ${s}`,
  });
});

for (const item of items) {
  const full = path.join(outDir, item.file);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, placeholder(item));
  console.log("wrote", item.file);
}
