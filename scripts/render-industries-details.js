const fs = require("fs");
const data = JSON.parse(fs.readFileSync("scripts/industries-data.json", "utf8"));
const d = ["d", "i", "v"].join("");
const open = (cls) => `<${d} class="${cls}">`;
const close = `</${d}>`;

function renderItem(item) {
  const products = item.products
    .map(([href, label]) => `<a href="${href}">${label}</a>`)
    .join("");
  const challenges = item.challenges.map((c) => `<li>${c}</li>`).join("");
  const scenarios = item.scenarios.map((s) => `<li>${s}</li>`).join("");
  return `
<article class="industry-detail" id="${item.id}">
  ${open("industry-detail__visual")}<img src="../assets/img/industries/${item.img}" alt="${item.title}" loading="lazy" decoding="async"/>${close}
  ${open("industry-detail__content")}
    <p class="industry-detail__tag">${item.tag}</p>
    <h3>${item.title}</h3>
    <p class="industry-detail__intro">${item.intro}</p>
    ${open("industry-detail__cols")}
      ${open("industry-detail__box")}
        <h4>Типовые боли</h4>
        <ul>${challenges}</ul>
      ${close}
      ${open("industry-detail__box")}
        <h4>Сценарии Ordo</h4>
        <ul>${scenarios}</ul>
      ${close}
    ${close}
    ${open("industry-detail__products")}${products}${close}
  ${close}
</article>`;
}

const block = `
  <section class="subsection subsection--alt" id="industries-detail">
    ${open("home-wrap")}
      <h2>По отраслям подробнее</h2>
      <p class="subsection__lead">Черновые ориентиры для пилота — замените на ваши подтверждённые кейсы, цифры и формулировки.</p>
      ${open("industry-details")}
        ${data.map(renderItem).join("")}
      ${close}
    ${close}
  </section>

  <section class="home-cta">
    ${open("home-wrap")}
      <h2>Не нашли свою отрасль?</h2>
      <p class="home-section__lead">Соберём пилот на Ordo AI Контур или Ordo на заказ — под ваш стек и KPI.</p>
      ${open("page-hero__actions")}
        <a class="btn-primary" href="../about/#contact">Запросить демо</a>
        <a class="btn-ghost" href="../platform/#pilot">Как устроен пилот</a>
      ${close}
    ${close}
  </section>
`;

let html = fs.readFileSync("industries/index.html", "utf8");
html = html.replace("</main>", block + "\n</main>");
html = html.replace(
  "<strong>Все продукты линейки</strong>",
  "<strong>Пилот</strong>"
);
html = html.replace(
  "поставляются как проверенные модули с типовыми интеграциями. Пилот на ваших данных за 2–4 недели, без обязательства на полный кастом.",
  "— один процесс и один KPI на ваших данных за 2–4 недели."
);
fs.writeFileSync("industries/index.html", html);
console.log("industries details appended");
