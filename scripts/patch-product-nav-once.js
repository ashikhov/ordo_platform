import fs from "fs";
import path from "path";

const root = path.resolve(".");

const PRODUCTS = [
  {
    key: "copilot",
    href: "copilot/",
    img: "copilot.png",
    title: "co-pilot",
    desc: "Подсказки менеджеру в момент сделки",
    mobile: "co-pilot",
    sub: "copilot",
  },
  {
    key: "search",
    href: "search/",
    img: "search.png",
    title: "ИИ-поиск",
    desc: "Поиск и ассистент по каталогу e-commerce",
    mobile: "ИИ-поиск",
    sub: "search",
  },
  {
    key: "listening",
    href: "listening/",
    img: "crm-autofill.png",
    title: "ИИ-прослушка",
    desc: "Транскрибация и контроль качества звонков",
    mobile: "ИИ-прослушка",
    sub: "listening",
  },
  {
    key: "custom",
    href: "custom/",
    img: "custom.png",
    title: "Ordo на заказ",
    desc: "AI под ваш уникальный процесс",
    mobile: "Ordo на заказ",
    sub: "custom",
  },
];

function megaCard(base, p, current) {
  const ac = current === p.key ? ' aria-current="page"' : "";
  const sub = ` data-ordo-sub="${p.sub}"`;
  return `<a href="${base}${p.href}" class="ordo-mega-card"${sub}${ac}><span class="ordo-mega-card__visual"><img src="${base}assets/img/products/${p.img}" alt="" width="320" height="220" loading="lazy" decoding="async"/></span><span class="ordo-mega-card__title">${p.title}</span><span class="ordo-mega-card__desc">${p.desc}</span></a>`;
}

function buildMegaGrid(base, current) {
  const cards = PRODUCTS.map((p) => megaCard(base, p, current)).join("\n            ");
  return `          <div class="ordo-mega-grid">\n            ${cards}\n          </div>`;
}

function buildMobilePanel(base, current, template = false) {
  const lines = PRODUCTS.map((p) => {
    let ac = "";
    if (template) {
      ac = `{{CURRENT_${p.key.toUpperCase()}}}`;
    } else if (current === p.key) {
      ac = ' aria-current="page"';
    }
    return `        <a href="${base}${p.href}"${ac}>${p.mobile}</a>`;
  });
  return `      <div class="ordo-mobile-panel">\n${lines.join("\n")}\n      </div>`;
}

const megaRe =
  /<div class="ordo-mega-grid">[\s\S]*?<\/div>(?=\s*<\/div>\s*<\/div>\s*<a class="ordo-nav-link"|<\/div><\/div>\s*<\/div>\s*<a class="ordo-nav-link")/;

const mobileRe = /<div class="ordo-mobile-panel">[\s\S]*?<\/div>/;

const fileCurrent = {
  "index.html": null,
  "copilot/index.html": "copilot",
  "search/index.html": "search",
  "listening/index.html": "listening",
  "custom/index.html": "custom",
  "sales/index.html": null,
  "about/index.html": null,
  "cases/index.html": null,
  "partners/index.html": null,
  "industries/index.html": null,
  "platform/index.html": null,
  "finance/index.html": null,
};

const htmlFiles = Object.keys(fileCurrent);

for (const rel of htmlFiles) {
  const fp = path.join(root, rel);
  if (!fs.existsSync(fp)) {
    console.warn("missing", rel);
    continue;
  }
  if (rel === "index.html") {
    console.log("skip index (already correct)");
    continue;
  }
  let html = fs.readFileSync(fp, "utf8");
  const base = "../";
  const current = fileCurrent[rel];
  const grid = buildMegaGrid(base, current);
  if (!megaRe.test(html)) {
    console.warn("mega skip", rel);
  } else {
    html = html.replace(megaRe, grid);
  }
  if (!mobileRe.test(html)) {
    console.warn("mobile skip", rel);
  } else {
    html = html.replace(mobileRe, buildMobilePanel(base, current));
  }
  fs.writeFileSync(fp, html);
  console.log("patched", rel);
}

const snPath = path.join(root, "snippets/ordo-header.html");
if (fs.existsSync(snPath)) {
  let sn = fs.readFileSync(snPath, "utf8");
  sn = sn.replace(megaRe, buildMegaGrid("{{BASE}}", null));
  sn = sn.replace(mobileRe, buildMobilePanel("{{BASE}}", null, true));
  // Normalize mega titles to match index (shorter copilot title in snippet was long)
  fs.writeFileSync(snPath, sn);
  console.log("patched snippets/ordo-header.html");
}

const footerNavStd = `    <a href="../copilot/">co-pilot</a>
    <a href="../search/">ИИ-поиск</a>
    <a href="../listening/">ИИ-прослушка</a>
    <a href="../custom/">Ordo на заказ</a>`;

const footerPages = [
  "about/index.html",
  "cases/index.html",
  "partners/index.html",
  "industries/index.html",
];

const footerRe =
  /<nav aria-label="Подвал">\s*[\s\S]*?<\/nav>/;

for (const rel of footerPages) {
  const fp = path.join(root, rel);
  let html = fs.readFileSync(fp, "utf8");
  html = html.replace(
    footerRe,
    `<nav aria-label="Подвал">\n${footerNavStd}\n  </nav>`
  );
  fs.writeFileSync(fp, html);
  console.log("footer", rel);
}
