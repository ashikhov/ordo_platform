import fs from "fs";
import path from "path";

const root = path.resolve(".");
const tag = "div";

function visualCard(base, href, img, title, desc, extra = "") {
  return `<a href="${base}${href}" class="ordo-mega-card"${extra}><span class="ordo-mega-card__visual"><img src="${base}assets/img/products/${img}" alt="" width="320" height="220" loading="lazy" decoding="async"/></span><span class="ordo-mega-card__title">${title}</span><span class="ordo-mega-card__desc">${desc}</span></a>`;
}

function iconVisualCard(base, href, img, title, desc, extra = "") {
  return `<a href="${base}${href}" class="ordo-mega-card"${extra}><span class="ordo-mega-card__visual ordo-mega-card__visual--icon"><img src="${base}assets/img/icons/${img}" alt="" width="80" height="80" loading="lazy" decoding="async"/></span><span class="ordo-mega-card__title">${title}</span><span class="ordo-mega-card__desc">${desc}</span></a>`;
}

function buildGrid(base, current) {
  const items = [
    { type: "icon", href: "platform/", img: "platform.png", title: "Ordo AI Контур", desc: "Единая платформа для AI-трансформации вашей компании", extra: "", key: "platform" },
    { type: "visual", href: "sales/", img: "crm.png", title: "ORDO CRM — решения по продажам", desc: "Система практических решений для роста выручки", extra: ' data-ordo-sub="sales"', key: "sales" },
    { type: "icon", href: "search/", img: "search.png", title: "Ordo поиск", desc: "AI-поиск и ассистент для e-commerce и каталогов", extra: ' data-ordo-sub="search"', key: "search" },
    { type: "visual", href: "finance/", img: "finance.png", title: "ORDO финансы", desc: "AI-слой для финансовых процессов, контроля и план-факта", extra: ' data-ordo-sub="finance"', key: "finance" },
    { type: "visual", href: "custom/", img: "custom.png", title: "Ordo на заказ", desc: "Кастомные агенты, интеграции и закрытый контур под вашу задачу", extra: ' data-ordo-sub="custom"', key: "custom" },
  ];
  const cards = items.map((item) => {
    let h = item.href;
    let ex = item.extra;
    if (current === item.key) {
      if (current === "platform") h = "platform/index.html";
      ex += ' aria-current="page"';
    }
    return item.type === "icon"
      ? iconVisualCard(base, h, item.img, item.title, item.desc, ex)
      : visualCard(base, h, item.img, item.title, item.desc, ex);
  });
  return `          <${tag} class="ordo-mega-grid">\n            ${cards.join("\n            ")}\n          </${tag}>`;
}

const gridRe =
  /<motion class="ordo-mega-grid">[\s\S]*?<\/motion>\s*(?=\s*<\/motion>\s*<\/motion>\s*<a class="ordo-nav-link")/;

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
  let html = fs.readFileSync(fp, "utf8");
  const grid = buildGrid(base, current);
  if (!gridRe.test(html)) {
    console.warn("skip", file);
    continue;
  }
  html = html.replace(gridRe, grid);
  fs.writeFileSync(fp, html);
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
