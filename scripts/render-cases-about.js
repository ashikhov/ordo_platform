const fs = require("fs");
const d = ["d", "i", "v"].join("");
const o = (cls) => `<${d}${cls ? ` class="${cls}"` : ""}>`;
const c = `</${d}>`;

const casesMain = `
  <section class="page-hero">
    ${o("home-wrap")}
      <p class="home-section__label">Кейсы</p>
      <h1>Как Ordo работает в реальных контурах</h1>
      <p class="page-hero__lead">Типовые истории внедрения по продуктам линейки. Это черновик под вашу отрасль и стек — замените на подтверждённые проекты, цифры и цитаты.</p>
      ${o("page-hero__meta")}
        <span>CRM / ERP / 1С</span>
        <span>Пилот 2–4 недели</span>
        <span>On-prem по запросу</span>
      ${c}
    ${c}
  </section>

  <section class="subsection" id="cases-list">
    ${o("home-wrap")}
      <h2>Истории по направлениям</h2>
      <p class="subsection__lead">Связка «боль → агентский слой Ordo → эффект на пилоте».</p>
      ${o("cases-grid")}
        <article class="case-study case-study--featured">
          <p class="case-study__tag">Продажи · сеть салонов</p>
          <h3>Вертикаль продаж поверх CRM</h3>
          <p>У ритейлера мебели CRM фиксировала сделки, но не управляла действиями: 120 менеджеров, разный темп обучения. ORDO CRM подключили к CRM и 1С без миграции.</p>
          <p class="case-study__result"><strong>Пилот 4 нед.:</strong> лента задач по сделке, риски «зависания», подсказки по касанию; руководитель видит воронку по действиям, не только по отчёту.</p>
          <p class="case-study__meta">ORDO CRM · CRM, 1С · KPI: конверсия этапов</p>
          <a class="case-study__link" href="../sales/">ORDO CRM →</a>
        </article>
        <article class="case-study">
          <p class="case-study__tag">E-commerce</p>
          <h3>Поиск на языке покупателя</h3>
          <p>Каталог 180k SKU: пустая выдача на каждом пятом запросе. Ordo поиск в контуре клиента, синонимы от закупки.</p>
          <p class="case-study__result"><strong>Пилот:</strong> меньше zero-results, рост корзины с поиска; отчёт для матрицы ассортимента.</p>
          <a class="case-study__link" href="../search/">Ordo поиск →</a>
        </article>
        <article class="case-study">
          <p class="case-study__tag">Финансы · производство</p>
          <h3>План-факт — вопрос к агенту</h3>
          <p>ORDO финансы к 1С: «где перерасход по ЦФО», алерты по лимитам, трассировка до первички.</p>
          <p class="case-study__result"><strong>Пилот:</strong> быстрее управленческая сводка, прозрачные спорные статьи.</p>
          <a class="case-study__link" href="../finance/">ORDO финансы →</a>
        </article>
        <article class="case-study">
          <p class="case-study__tag">Платформа · холдинг</p>
          <h3>Несколько агентов — один trace</h3>
          <p>Ordo Управление: координатор, data, finance — сценарий «заявка → остатки → согласование → уведомление».</p>
          <a class="case-study__link" href="../platform/">Платформа →</a>
        </article>
        <article class="case-study">
          <p class="case-study__tag">Интегратор</p>
          <h3>AI-слой в проекте 1С + CRM</h3>
          <p>Демо-workspace, Skill-шаблоны, совместный presale — без платформы с нуля.</p>
          <a class="case-study__link" href="../partners/">Партнёрам →</a>
        </article>
        <article class="case-study">
          <p class="case-study__tag">Healthcare</p>
          <h3>Запись и FAQ в закрытом контуре</h3>
          <p>On-prem, роли, эскалация сложных обращений оператору с контекстом.</p>
          <a class="case-study__link" href="../custom/">Ordo на заказ →</a>
        </article>
      ${c}
      ${o("home-pilot")}
        <h3>Пилот за 2–4 недели: один процесс, один KPI</h3>
        <p>Согласуем владельца, метрику и контур — результат на ваших данных.</p>
        <a href="../platform/#pilot">Как устроен пилот →</a>
      ${c}
    ${c}
  </section>

  <section class="home-cta">
    ${o("home-wrap")}
      <h2>Хотите такой же сценарий?</h2>
      <p class="home-section__lead">Опишите отрасль и систему — предложим продукт и пилот.</p>
      ${o("page-hero__actions")}
        <a class="btn-primary" href="../about/#contact">Запросить демо</a>
        <a class="btn-ghost" href="../industries/">Отрасли</a>
      ${c}
    ${c}
  </section>
`;

const aboutMain = `
  <section class="about-hero page-hero">
    ${o("home-wrap")}
      <p class="home-section__label">О компании</p>
      <h1>ORDO AI — продуктовый AI-слой для enterprise</h1>
      <p class="page-hero__lead">Платформа агентов, скиллов и процессов поверх CRM, ERP и 1С. Продажи, финансы, поиск и операции — в закрытом контуре, с пилотом от 2 недель.</p>
      ${o("page-hero__meta")}
        <span>Команда с опытом B2B-интеграций</span>
        <span>On-prem / private cloud</span>
        <span>team@ordo.ru</span>
      ${c}
    ${c}
  </section>

  <section class="subsection">
    ${o("home-wrap")}
      <h2>Зачем мы это делаем</h2>
      <p class="subsection__lead">Компании вложились в CRM и ERP, но сотрудники всё ещё «склеивают» процессы вручную. Ordo — агентский интерфейс с контролем, логами и выбором моделей, чтобы AI был частью операционки.</p>
      ${o("about-grid")}
        <article class="about-card">
          <h3>Продукт, не разовый проект</h3>
          <p>Лицензируемая платформа и типовые модули. Кастом — где без него не обойтись: редкие регламенты и жёсткий compliance.</p>
        </article>
        <article class="about-card">
          <h3>Слой, не замена 1С</h3>
          <p>Читаем и действуем поверх учётных систем. Критичные записи — с ролями и подтверждением человека.</p>
        </article>
        <article class="about-card">
          <h3>Безопасность</h3>
          <p>On-prem, audit trail, trace шагов. Подробнее — <a href="../platform/#security-roi" style="color:var(--accent);font-weight:600">безопасность и ROI</a>.</p>
        </article>
        <article class="about-card">
          <h3>Измеримый старт</h3>
          <p>Один процесс, один KPI, 2–4 недели на ваших данных.</p>
        </article>
      ${c}
    ${c}
  </section>

  <section class="subsection subsection--alt">
    ${o("home-wrap")}
      <h2>Линейка продуктов</h2>
      ${o("about-links")}
        <a class="about-link-card" href="../platform/"><h2>Ordo Управление</h2><p>Агенты, Skills, A2A, LLM</p></a>
        <a class="about-link-card" href="../sales/"><h2>ORDO CRM</h2><p>Вертикаль продаж</p></a>
        <a class="about-link-card" href="../search/"><h2>Ordo поиск</h2><p>Каталоги и спрос</p></a>
        <a class="about-link-card" href="../finance/"><h2>ORDO финансы</h2><p>План-факт и контроль</p></a>
        <a class="about-link-card" href="../custom/"><h2>Ordo на заказ</h2><p>Закрытый контур</p></a>
        <a class="about-link-card" href="../industries/"><h2>Отрасли</h2><p>9 рыночных сценариев</p></a>
      ${c}
    ${c}
  </section>

  <section class="subsection">
    ${o("home-wrap")}
      <h2>Как начинаем проект</h2>
      ${o("about-timeline")}
        <div class="about-step"><motion><h4>Скоупинг</h4><p>Процесс, владелец, KPI, ИБ.</p></motion></motion>
        <div class="about-step"><div><h4>Подключение</h4><p>CRM / 1С / каталог, роли, тестовый контур.</p></div></div>
        <motion class="about-step"><motion><h4>Пилот</h4><p>2–4 недели на боевых задачах, замер метрики.</p></motion></motion>
        <div class="about-step"><div><h4>Масштаб</h4><p>Отделы, агенты, партнёр-интегратор при необходимости.</p></div></div>
      ${c}
      <p style="margin-top:24px;font-size:0.875rem;color:var(--muted)"><a href="../platform/#faq" style="color:var(--accent);font-weight:600">FAQ</a> · <a href="../cases/" style="color:var(--accent);font-weight:600">Кейсы</a></p>
    ${c}
  </section>

  <section class="subsection subsection--alt">
    ${o("home-wrap")}
      <h2>С кем работаем</h2>
      ${o("about-grid")}
        <article class="about-card">
          <h3>B2B и ритейл</h3>
          <ul><li>Дистрибуция, производство, сети</li><li>Уже есть CRM / ERP / 1С</li><li>Нужен измеримый эффект</li></ul>
        </article>
        <article class="about-card">
          <h3>Интеграторы</h3>
          <ul><li>Усиление CRM/ERP-проектов AI-слоем</li><li><a href="../partners/" style="color:var(--accent);font-weight:600">Партнёрская программа</a></li></ul>
        </article>
      ${c}
    ${c}
  </section>
`;

function inject(file, main, keepContact) {
  let html = fs.readFileSync(file, "utf8");
  if (keepContact) {
    const contact = html.match(/<section class="home-cta" id="contact">[\s\S]*?<\/section>/);
    html = html.replace(/<main>[\s\S]*?<\/main>/, `<main>${main}\n${contact ? contact[0] : ""}\n</main>`);
  } else {
    html = html.replace(/<main>[\s\S]*?<\/main>/, `<main>${main}</main>`);
  }
  html = html.split("<motion ").join("<" + d + " ");
  html = html.split("</motion>").join("</" + d + ">");
  fs.writeFileSync(file, html);
}

inject("cases/index.html", casesMain, false);
inject("about/index.html", aboutMain, true);
console.log("cases and about updated");
