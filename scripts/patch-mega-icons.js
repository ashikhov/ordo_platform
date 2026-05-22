import fs from "fs";
import path from "path";

const root = path.resolve(".");
const DIV_OPEN = "<" + "div";
const DIV_CLOSE = "</" + "div" + ">";

function iconCard(base, href, img, title, desc, extra = "") {
  return `<a href="${base}${href}" class="ordo-mega-card"${extra}><span class="ordo-mega-card__icon"><img src="${base}assets/img/icons/${img}" alt="" width="48" height="48" loading="lazy" decoding="async"/></span><span class="ordo-mega-card__title">${title}</span><span class="ordo-mega-card__desc">${desc}</span></a>`;
}

function buildGrid(base, current) {
  const items = [
    ["platform/", "platform.png", "Ordo AI Контур", "Единая платформа для AI-трансформации вашей компании", ""],
    ["sales/", "crm.png", "ORDO CRM — решения по продажам", "Система практических решений для роста выручки", ' data-ordo-sub="sales"'],
    ["search/", "search.png", "Ordo поиск", "AI-поиск и ассистент для e-commerce и каталогов", ' data-ordo-sub="search"'],
    ["finance/", "finance.png", "ORDO финансы", "AI-слой для финансовых процессов, контроля и план-факта", ' data-ordo-sub="finance"'],
    ["custom/", "custom.png", "Ordo на заказ", "Кастомные агенты, интеграции и закрытый контур под вашу задачу", ' data-ordo-sub="custom"'],
  ];
  const cards = items.map(([href, img, title, desc, extra]) => {
    let h = href;
    let ex = extra;
    if (current === "platform" && href === "platform/") {
      h = "platform/index.html";
      ex += ' aria-current="page"';
    } else if (current === "sales" && href === "sales/") ex += ' aria-current="page"';
    else if (current === "search" && href === "search/") ex += ' aria-current="page"';
    else if (current === "finance" && href === "finance/") ex += ' aria-current="page"';
    else if (current === "custom" && href === "custom/") ex += ' aria-current="page"';
    return iconCard(base, h, img, title, desc, ex);
  });
  return `          ${DIV_OPEN} class="ordo-mega-grid">\n            ${cards.join("\n            ")}\n          ${DIV_CLOSE}`;
}

const iconsDir = path.join(root, "assets/img/icons");
fs.mkdirSync(iconsDir, { recursive: true });
for (const name of ["platform.png", "crm.png", "search.png", "finance.png", "custom.png"]) {
  const src = path.join(root, "assets/img/products", name);
  const dest = path.join(iconsDir, name);
  if (fs.existsSync(src)) fs.copyFileSync(src, dest);
}

const gridRe =
  /<div class="ordo-mega-grid">[\s\S]*?<\/div>\s*(?=\s*<\/div>\s*<\/div>\s*<a class="ordo-nav-link")/;

const configs = [
  ["index.html", "", null],
  ["sales/index.html", "../", "sales"],
  ["finance/index.html", "../", "finance"],
  ["custom/index.html", "../", "custom"],
  ["search/index.html", "../", "search"],
  ["platform/index.html", "../", "platform"],
  ["industries/index.html", "../", null],
  ["cases/index.html", "../", null],
  ["about/index.html", "../", null],
  ["partners/index.html", "../", null],
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
  let snGrid = buildGrid("{{BASE}}", null).replace(/assets\/img\/icons/g, "{{BASE}}assets/img/icons");
  if (gridRe.test(sn)) {
    sn = sn.replace(gridRe, snGrid);
    fs.writeFileSync(snPath, sn);
    console.log("patched snippets/ordo-header.html");
  }
}
