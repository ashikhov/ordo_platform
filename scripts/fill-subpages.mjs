import fs from "fs";
import path from "path";

const root = path.resolve(".");

function industryDetail(id, img, title, tag, intro, challenges, scenarios, products) {
  return `
<article class="industry-detail" id="${id}">
  <div class="industry-detail__visual"><img src="../assets/img/industries/${img}" alt="${title}" loading="lazy" decoding="async"/></motion>
  <div>
    <p class="industry-detail__tag">${tag}</p>
    <h3>${title}</h3>
    <p class="industry-detail__intro">${intro}</p>
    <div class="industry-detail__cols">
      <div class="industry-detail__box">
        <h4>Типовые боли</h4>
        <ul>${challenges.map((c) => `<li>${c}</li>`).join("")}</ul>
      </div>
      <div class="industry-detail__box">
        <h4>Сценарии Ordo</h4>
        <ul>${scenarios.map((s) => `<li>${s}</li>`).join("")}</ul>
      </div>
    </div>
    <motion class="industry-detail__products">${products.map(([href, label]) => `<a href="${href}">${label}</a>`).join("")}</div>
  </div>
</article>`;
}

const industriesMain = `...`; // too long - build in file
