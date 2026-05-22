const fs = require("fs");
const p = require("path").join(__dirname, "../snippets/ordo-header.html");
let s = fs.readFileSync(p, "utf8");
const grid = `          <div class="ordo-mega-grid">
            <a href="{{BASE}}platform/" class="ordo-mega-card"><span class="ordo-mega-card__visual ordo-mega-card__visual--icon"><img src="{{BASE}}assets/img/icons/platform.png" alt="" width="80" height="80" loading="lazy" decoding="async"/></span><span class="ordo-mega-card__title">Ordo AI Контур</span><span class="ordo-mega-card__desc">Единая платформа для AI-трансформации вашей компании</span></a>
            <a href="{{BASE}}sales/" class="ordo-mega-card" data-ordo-sub="sales"><span class="ordo-mega-card__visual"><img src="{{BASE}}assets/img/products/crm.png" alt="" width="320" height="220" loading="lazy" decoding="async"/></span><span class="ordo-mega-card__title">ORDO CRM — решения по продажам</span><span class="ordo-mega-card__desc">Система практических решений для роста выручки</span></a>
            <a href="{{BASE}}search/" class="ordo-mega-card" data-ordo-sub="search"><span class="ordo-mega-card__visual ordo-mega-card__visual--icon"><img src="{{BASE}}assets/img/icons/search.png" alt="" width="80" height="80" loading="lazy" decoding="async"/></span><span class="ordo-mega-card__title">Ordo поиск</span><span class="ordo-mega-card__desc">AI-поиск и ассистент для e-commerce и каталогов</span></a>
            <a href="{{BASE}}finance/" class="ordo-mega-card" data-ordo-sub="finance"><span class="ordo-mega-card__visual"><img src="{{BASE}}assets/img/products/finance.png" alt="" width="320" height="220" loading="lazy" decoding="async"/></span><span class="ordo-mega-card__title">ORDO финансы</span><span class="ordo-mega-card__desc">AI-слой для финансовых процессов, контроля и план-факта</span></a>
            <a href="{{BASE}}custom/" class="ordo-mega-card" data-ordo-sub="custom"><span class="ordo-mega-card__visual"><img src="{{BASE}}assets/img/products/custom.png" alt="" width="320" height="220" loading="lazy" decoding="async"/></span><span class="ordo-mega-card__title">Ordo на заказ</span><span class="ordo-mega-card__desc">Кастомные агенты, интеграции и закрытый контур под вашу задачу</span></a>
          </div>`;
const end = "</" + "div>";
const gridRe = new RegExp('<div class="ordo-mega-grid">[\\s\\S]*?' + end + "\\s*" + end);
s = s.replace(gridRe, grid);
fs.writeFileSync(p, s);
console.log("fixed snippet");
