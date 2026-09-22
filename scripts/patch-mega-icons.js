import fs from "fs";
import path from "path";

const root = path.resolve(".");
const DIV_OPEN = "<" + "div";
const DIV_CLOSE = "</" + "div" + ">";

function iconCard(base, href, img, title, desc, extra = "") {
  return `<a href="${base}${href}" class="ordo-mega-card"${extra}><span class="ordo-mega-card__visual"><img src="${base}assets/img/products/${img}" alt="" width="320" height="220" loading="lazy" decoding="async"/></span><span class="ordo-mega-card__title">${title}</span><span class="ordo-mega-card__desc">${desc}</span></a>`;
}

function buildGrid(base, current) {
  const items = [
    ["copilot/", "copilot.png", "co-pilot", "Подсказки менеджеру в момент сделки", ' data-ordo-sub="copilot"', "copilot"],
    ["search/", "search.png", "ИИ-поиск", "Поиск и ассистент по каталогу e-commerce", ' data-ordo-sub="search"', "search"],
    ["listening/", "crm-autofill.png", "ИИ-прослушка", "Транскрибация и контроль качества звонков", ' data-ordo-sub="listening"', "listening"],
    ["custom/", "custom.png", "Ordo на заказ", "AI под ваш уникальный процесс", ' data-ordo-sub="custom"', "custom"],
  ];
  const cards = items.map(([href, img, title, desc, extra, key]) => {
    let ex = extra;
    if (current === key) ex += ' aria-current="page"';
    return iconCard(base, href, img, title, desc, ex);
  });
  return `          ${DIV_OPEN} class="ordo-mega-grid">\n            ${cards.join("\n            ")}\n          ${DIV_CLOSE}`;
}

const iconsDir = path.join(root, "assets/img/icons");
fs.mkdirSync(iconsDir, { recursive: true });
for (const name of ["platform.png", "crm.png", "search.png", "finance.png", "custom.png", "copilot.png"]) {
  const src = path.join(root, "assets/img/products", name);
  const dest = path.join(iconsDir, name);
  if (fs.existsSync(src)) fs.copyFileSync(src, dest);
}

const gridRe =
  /<div class="ordo-mega-grid">[\s\S]*?<\/div>\s*(?=\s*<\/div>\s*<\/div>\s*<a class="ordo-nav-link")/;

const configs = [
  ["index.html", "", null],
  ["copilot/index.html", "../", "copilot"],
  ["search/index.html", "../", "search"],
  ["listening/index.html", "../", "listening"],
  ["custom/index.html", "../", "custom"],
  ["sales/index.html", "../", null],
  ["industries/index.html", "../", null],
  ["cases/index.html", "../", null],
  ["about/index.html", "../", null],
  ["partners/index.html", "../", null],
  ["platform/index.html", "../", null],
  ["finance/index.html", "../", null],
];

for (const [file, base, current] of configs) {
  const fp = path.join(root, file);
  if (!fs.existsSync(fp)) continue;
  let c = fs.readFileSync(fp, "utf8");
  const grid = buildGrid(base, current);
  if (!gridRe.test(c)) {
    console.warn("skip (no match)", file);
    continue;
  }
  c = c.replace(gridRe, grid);
  fs.writeFileSync(fp, c);
  console.log("patched", file);
}

const snPath = path.join(root, "snippets/ordo-header.html");
if (fs.existsSync(snPath)) {
  let sn = fs.readFileSync(snPath, "utf8");
  const snGrid = buildGrid("{{BASE}}", null);
  if (gridRe.test(sn)) {
    sn = sn.replace(gridRe, snGrid);
    fs.writeFileSync(snPath, sn);
    console.log("patched snippets/ordo-header.html");
  }
}
