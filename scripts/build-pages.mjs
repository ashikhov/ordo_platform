import fs from "fs";
import path from "path";

const root = path.resolve(".");

const indexHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");

const industriesBlock = indexHtml
  .match(/<section class="home-ready home-section--alt" id="industries"[\s\S]*?<\/section>/)[0]
  .replace(/src="assets\//g, 'src="../assets/')
  .replace(/href="(platform|sales|search|finance|custom)\//g, 'href="../$1/');

const casesBlock = indexHtml.match(/<section class="home-section" id="cases">[\s\S]*?<\/section>/)[0];

let header = indexHtml.match(/<header class="ordo-header"[\s\S]*?<\/header>/)[0];
header = header
  .replace(/href="index\.html"/g, 'href="../index.html"')
  .replace(/href="platform\//g, 'href="../platform/')
  .replace(/href="sales\//g, 'href="../sales/')
  .replace(/href="search\//g, 'href="../search/')
  .replace(/href="finance\//g, 'href="../finance/')
  .replace(/href="custom\//g, 'href="../custom/')
  .replace(/href="industries\//g, 'href="../industries/')
  .replace(/href="cases\//g, 'href="../cases/')
  .replace(/href="partners\//g, 'href="../partners/')
  .replace(/href="about\//g, 'href="../about/')
  .replace(/src="assets\//g, 'src="../assets/');

function markCurrent(h, active) {
  if (active === "industries") {
    h = h.replace('<a class="ordo-nav-link" href="../industries/">', '<a class="ordo-nav-link" href="../industries/" aria-current="page">');
    h = h.replace('<a class="ordo-mobile-link" href="../industries/">', '<a class="ordo-mobile-link" href="../industries/" aria-current="page">');
  }
  if (active === "cases") {
    h = h.replace('<a class="ordo-nav-link" href="../cases/">', '<a class="ordo-nav-link" href="../cases/" aria-current="page">');
    h = h.replace('<a class="ordo-mobile-link" href="../cases/">', '<a class="ordo-mobile-link" href="../cases/" aria-current="page">');
  }
  if (active === "partners") {
    h = h.replace('<a class="ordo-nav-link" href="../partners/">', '<a class="ordo-nav-link" href="../partners/" aria-current="page">');
    h = h.replace('<a class="ordo-mobile-link" href="../partners/">', '<a class="ordo-mobile-link" href="../partners/" aria-current="page">');
  }
  if (active === "about") {
    h = h.replace('<a class="ordo-nav-link" href="../about/">', '<a class="ordo-nav-link" href="../about/" aria-current="page">');
    h = h.replace('<a class="ordo-mobile-link" href="../about/">', '<a class="ordo-mobile-link" href="../about/" aria-current="page">');
  }
  return h;
}

const footer = `</main>

<footer class="home-footer">
  <div class="home-footer__logo">ORDO<span> AI</span></div>
  <nav aria-label="Подвал">
    <a href="../platform/">Ordo Управление</a>
    <a href="../sales/">ORDO CRM</a>
    <a href="../search/">Ordo поиск</a>
    <a href="../finance/">ORDO финансы</a>
  </nav>
  <p>© 2026 ORDO AI</p>
</footer>

<script src="../js/ordo-header.js"></script>
`;

function shell(title, desc, extraCss, main, active) {
  return `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>${title}</title>
<meta name="description" content="${desc}"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet"/>
<link rel="stylesheet" href="../styles/ordo-fonts.css"/>
<link rel="stylesheet" href="../styles/ordo-header.css"/>
<link rel="stylesheet" href="../styles/ordo-home.css"/>
${extraCss}
</head>
<body>
${markCurrent(header, active)}
<main>
${main}
${footer}
</body>
</html>`;
}

fs.mkdirSync(path.join(root, "industries"), { recursive: true });
fs.mkdirSync(path.join(root, "cases"), { recursive: true });
fs.mkdirSync(path.join(root, "partners"), { recursive: true });
fs.mkdirSync(path.join(root, "about"), { recursive: true });

fs.writeFileSync(
  path.join(root, "industries/index.html"),
  shell(
    "Отрасли — ORDO AI",
    "Готовые сценарии Ordo для мебели, фармы, ритейла, медицины, e-commerce и других отраслей.",
    "",
    industriesBlock,
    "industries"
  )
);

fs.writeFileSync(
  path.join(root, "cases/index.html"),
  shell("Кейсы — ORDO AI", "Как Ordo работает в реальных контурах.", "", casesBlock, "cases")
);

const partnersMain = `<section class="partners-page">
<section class="partners-section">
  <div class="partners-inner">
    <div class="partners-copy">
      <div class="partners-kicker">Партнёрам</div>
      <h1 class="partners-title">Для интеграторов: добавьте агентский слой к вашим CRM/ERP-проектам</h1>
      <p class="partners-lead">Усильте вашу экспертизу и предложите клиентам по-настоящему надёжные и прогрессивные AI-решения без разработки платформы с нуля.</p>
      <p class="partners-body">CRM/ERP-интеграторы уже знают процессы, данные и ограничения клиента. Ordo добавляет агентский интерфейс, скиллы, пайплайны, A2A, выбор моделей, логи, согласование действий и развёртывание on-prem / private cloud.</p>
    </div>
    <div class="partners-cards">
      <div class="partners-card"><span class="partners-check" aria-hidden="true">✓</span><span>Демо-Workspace для партнёров</span></div>
      <div class="partners-card"><span class="partners-check" aria-hidden="true">✓</span><span>Шаблоны Skill</span></div>
      <div class="partners-card"><span class="partners-check" aria-hidden="true">✓</span><span>1С / SQL пилоты</span></div>
      <div class="partners-card"><span class="partners-check" aria-hidden="true">✓</span><span>Совместный presale</span></div>
      <div class="partners-card"><span class="partners-check" aria-hidden="true">✓</span><span>Опции co-brand / white-label</span></div>
      <div class="partners-card"><span class="partners-check" aria-hidden="true">✓</span><span>Методика ROI</span></div>
      <div class="partners-card"><span class="partners-check" aria-hidden="true">✓</span><span>Поддержка внедрения</span></motion>
      <div class="partners-card"><span class="partners-check" aria-hidden="true">✓</span><span>Roadmap под отраслевые сценарии</span></motion>
    </div>
  </div>
</section>
</section>`.replace(/<motion /g, "<div ").replace(/<\/motion>/g, "</div>");

fs.writeFileSync(
  path.join(root, "partners/index.html"),
  shell(
    "Партнёрам — ORDO AI",
    "Программа для интеграторов CRM и ERP.",
    '<link rel="stylesheet" href="../styles/ordo-partners.css"/>',
    partnersMain,
    "partners"
  )
);

const aboutMain = `<section class="about-hero">
  <div class="home-wrap">
    <p class="home-section__label">О компании</p>
    <h1>ORDO AI — AI-слой для продаж, финансов и операций</h1>
    <p>Ordo — продуктовая платформа агентов, скиллов и рабочих процессов поверх CRM, ERP и 1С. On-prem, контроль данных, пилот за 2–4 недели.</p>
    <div class="about-links">
      <a class="about-link-card" href="../platform/"><h2>Ordo Управление</h2><p>Платформа, архитектура, примеры и пилот</p></a>
      <a class="about-link-card" href="../platform/#security-roi"><h2>Безопасность и ROI</h2><p>On-prem, аудит, роли и экономика внедрения</p></a>
      <a class="about-link-card" href="../platform/#faq"><h2>FAQ</h2><p>Ответы о продукте, интеграциях и пилоте</p></a>
      <a class="about-link-card" href="#contact"><h2>Контакты</h2><p>Запросить демо или написать на team@ordo.ru</p></a>
    </div>
  </div>
</section>
<section class="home-cta" id="contact">
  <div class="home-wrap">
    <h2>Готовы обсудить <em>пилот</em>?</h2>
    <p class="home-section__lead">Оставьте email — свяжемся и предложим сценарий под ваш стек и отрасль.</p>
    <form class="home-cta__form" onsubmit="event.preventDefault(); handleSubmit();">
      <input class="home-cta__input" type="email" placeholder="вы@компания.ru" id="lead-email" required autocomplete="email"/>
      <button class="btn-primary" type="submit">Отправить</button>
    </form>
    <p class="home-cta__note">Или напишите на team@ordo.ru</p>
    <div id="form-msg"></div>
  </div>
</section>`;

let aboutPage = shell(
  "О компании — ORDO AI",
  "Ordo AI — платформа, безопасность, FAQ и контакты.",
  '<link rel="stylesheet" href="../styles/ordo-about.css"/>',
  aboutMain,
  "about"
);
aboutPage = aboutPage.replace(
  "</body>",
  `<script src="../js/ordo-lead-notify.js"></script>
<script>
async function handleSubmit() {
  var emailEl = document.getElementById('lead-email');
  var msg = document.getElementById('form-msg');
  var btn = document.querySelector('#contact .btn-primary');
  var email = emailEl.value.trim();
  if (!email || email.indexOf('@') === -1) {
    msg.style.color = '#c0392b';
    msg.textContent = 'Укажите корректный email.';
    msg.style.display = 'block';
    return;
  }
  if (!window.OrdoLeads) {
    msg.style.color = '#c0392b';
    msg.textContent = 'Не загружен скрипт отправки.';
    msg.style.display = 'block';
    return;
  }
  var prev = btn ? btn.textContent : '';
  if (btn) { btn.disabled = true; btn.textContent = 'Отправка…'; }
  try {
    await window.OrdoLeads.submit({
      subject: '[ORDO AI] Запрос',
      name: email.split('@')[0] || 'Гость',
      email: email,
      message: 'Запрос со страницы О компании.\\nEmail: ' + email
    });
    msg.style.color = '#0a7c5c';
    msg.textContent = 'Заявка отправлена.';
    msg.style.display = 'block';
    emailEl.value = '';
  } catch (e) {
    msg.style.color = '#c0392b';
    msg.textContent = e.message || 'Ошибка отправки.';
    msg.style.display = 'block';
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = prev; }
  }
}
</script>
</body>`
);
fs.writeFileSync(path.join(root, "about/index.html"), aboutPage);

const navFiles = [
  "sales/index.html",
  "finance/index.html",
  "custom/index.html",
  "search/index.html",
  "platform/index.html",
  "snippets/ordo-header.html",
];

for (const file of navFiles) {
  const fp = path.join(root, file);
  let c = fs.readFileSync(fp, "utf8");
  const base = "../";
  c = c
    .replace(/href="\.\.\/index\.html#industries"/g, `href="${base}industries/"`)
    .replace(/href="\.\.\/index\.html#cases"/g, `href="${base}cases/"`)
    .replace(/href="\.\.\/platform\/#partners"/g, `href="${base}partners/"`)
    .replace(/href="#industries"/g, `href="${base}industries/"`)
    .replace(/href="#cases"/g, `href="${base}cases/"`)
    .replace(/href="platform\/#partners"/g, `href="${base}partners/"`)
    .replace(/href="#audience"/g, `href="${base}industries/"`)
    .replace(/href="#examples"/g, `href="${base}cases/"`)
    .replace(/href="#partners"/g, `href="${base}partners/"`)
    .replace(/\{\{BASE\}\}index\.html#audience/g, "{{BASE}}industries/")
    .replace(/\{\{BASE\}\}index\.html#examples/g, "{{BASE}}cases/")
    .replace(/\{\{BASE\}\}platform\/#partners/g, "{{BASE}}partners/")
    .replace(/\{\{BASE\}\}index\.html#partners/g, "{{BASE}}partners/");
  c = c.replace(/href="(\.\.\/)?index\.html#contact"/g, 'href="$1about/#contact"');

  // About mega -> direct link (subpages only; index already patched)
  c = c.replace(
    /      <div class="ordo-nav-item has-mega">\r?\n        <button type="button" class="ordo-nav-trigger" aria-expanded="false" aria-controls="ordo-mega-about">О компании[\s\S]*?          <\/div>\r?\n    <\/nav>/,
    `      <a class="ordo-nav-link" href="${base}about/">О компании</a>\n    </nav>`
  );
  c = c.replace(
    /    <div class="ordo-mobile-group">\r?\n      <button type="button" class="ordo-mobile-trigger" aria-expanded="false">О компании[\s\S]*?            <\/div>\r?\n    <a class="ordo-mobile-cta"/,
    `    <a class="ordo-mobile-link" href="${base}about/">О компании</a>\n    <a class="ordo-mobile-cta"`
  );

  fs.writeFileSync(fp, c);
}

console.log("Built pages and updated nav");
