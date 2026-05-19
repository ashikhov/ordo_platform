const fs = require("fs");
const p = "industries/index.html";
let c = fs.readFileSync(p, "utf8");
const pairs = [
  ["jewelry.png", "#jewelry"],
  ["medicine.png", "#medicine"],
  ["agriculture.png", "#agriculture"],
  ["construction.png", "#construction"],
  ["manufacturing.png", "#manufacturing"],
  ["ecommerce.png", "#ecommerce"],
  ["auto.png", "#auto"],
];
for (const [img, hash] of pairs) {
  const i = c.indexOf(img);
  const start = c.lastIndexOf('href="', i);
  const end = c.indexOf('"', start + 6);
  c = c.slice(0, start + 6) + hash + c.slice(end);
}
fs.writeFileSync(p, c);
const hrefs = [...c.matchAll(/home-ready-card" href="([^"]+)/g)].map((m) => m[1]);
console.log(hrefs);
