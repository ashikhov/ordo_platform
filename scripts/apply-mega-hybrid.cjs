const fs = require("fs");
const path = require("path");

const pairs = [
  [
    'class="ordo-mega-card"><span class="ordo-mega-card__icon"><img src="assets/img/icons/platform.png" alt="" width="48" height="48"',
    'class="ordo-mega-card"><span class="ordo-mega-card__visual ordo-mega-card__visual--icon"><img src="assets/img/icons/platform.png" alt="" width="80" height="80"',
  ],
  [
    'class="ordo-mega-card"><span class="ordo-mega-card__icon"><img src="../assets/img/icons/platform.png" alt="" width="48" height="48"',
    'class="ordo-mega-card"><span class="ordo-mega-card__visual ordo-mega-card__visual--icon"><img src="../assets/img/icons/platform.png" alt="" width="80" height="80"',
  ],
  [
    'data-ordo-sub="sales"><span class="ordo-mega-card__icon"><img src="assets/img/icons/crm.png" alt="" width="48" height="48"',
    'data-ordo-sub="sales"><span class="ordo-mega-card__visual"><img src="assets/img/products/crm.png" alt="" width="320" height="220"',
  ],
  [
    'data-ordo-sub="sales"><span class="ordo-mega-card__icon"><img src="../assets/img/icons/crm.png" alt="" width="48" height="48"',
    'data-ordo-sub="sales"><span class="ordo-mega-card__visual"><img src="../assets/img/products/crm.png" alt="" width="320" height="220"',
  ],
  [
    'data-ordo-sub="search"><span class="ordo-mega-card__icon"><img src="assets/img/icons/search.png" alt="" width="48" height="48"',
    'data-ordo-sub="search"><span class="ordo-mega-card__visual ordo-mega-card__visual--icon"><img src="assets/img/icons/search.png" alt="" width="80" height="80"',
  ],
  [
    'data-ordo-sub="search"><span class="ordo-mega-card__icon"><img src="../assets/img/icons/search.png" alt="" width="48" height="48"',
    'data-ordo-sub="search"><span class="ordo-mega-card__visual ordo-mega-card__visual--icon"><img src="../assets/img/icons/search.png" alt="" width="80" height="80"',
  ],
  [
    'data-ordo-sub="finance"><span class="ordo-mega-card__icon"><img src="assets/img/icons/finance.png" alt="" width="48" height="48"',
    'data-ordo-sub="finance"><span class="ordo-mega-card__visual"><img src="assets/img/products/finance.png" alt="" width="320" height="220"',
  ],
  [
    'data-ordo-sub="finance"><span class="ordo-mega-card__icon"><img src="../assets/img/icons/finance.png" alt="" width="48" height="48"',
    'data-ordo-sub="finance"><span class="ordo-mega-card__visual"><img src="../assets/img/products/finance.png" alt="" width="320" height="220"',
  ],
  [
    'data-ordo-sub="finance" aria-current="page"><span class="ordo-mega-card__icon"><img src="../assets/img/icons/finance.png" alt="" width="48" height="48"',
    'data-ordo-sub="finance" aria-current="page"><span class="ordo-mega-card__visual"><img src="../assets/img/products/finance.png" alt="" width="320" height="220"',
  ],
  [
    'data-ordo-sub="sales" aria-current="page"><span class="ordo-mega-card__icon"><img src="../assets/img/icons/crm.png" alt="" width="48" height="48"',
    'data-ordo-sub="sales" aria-current="page"><span class="ordo-mega-card__visual"><img src="../assets/img/products/crm.png" alt="" width="320" height="220"',
  ],
  [
    'data-ordo-sub="search" aria-current="page"><span class="ordo-mega-card__icon"><img src="../assets/img/icons/search.png" alt="" width="48" height="48"',
    'data-ordo-sub="search" aria-current="page"><span class="ordo-mega-card__visual ordo-mega-card__visual--icon"><img src="../assets/img/icons/search.png" alt="" width="80" height="80"',
  ],
  [
    'data-ordo-sub="custom" aria-current="page"><span class="ordo-mega-card__icon"><img src="../assets/img/icons/custom.png" alt="" width="48" height="48"',
    'data-ordo-sub="custom" aria-current="page"><span class="ordo-mega-card__visual"><img src="../assets/img/products/custom.png" alt="" width="320" height="220"',
  ],
  [
    'class="ordo-mega-card" aria-current="page"><span class="ordo-mega-card__icon"><img src="../assets/img/icons/platform.png" alt="" width="48" height="48"',
    'class="ordo-mega-card" aria-current="page"><span class="ordo-mega-card__visual ordo-mega-card__visual--icon"><img src="../assets/img/icons/platform.png" alt="" width="80" height="80"',
  ],
  [
    'data-ordo-sub="custom"><span class="ordo-mega-card__icon"><img src="assets/img/icons/custom.png" alt="" width="48" height="48"',
    'data-ordo-sub="custom"><span class="ordo-mega-card__visual"><img src="assets/img/products/custom.png" alt="" width="320" height="220"',
  ],
  [
    'data-ordo-sub="custom"><span class="ordo-mega-card__icon"><img src="../assets/img/icons/custom.png" alt="" width="48" height="48"',
    'data-ordo-sub="custom"><span class="ordo-mega-card__visual"><img src="../assets/img/products/custom.png" alt="" width="320" height="220"',
  ],
];

const files = [
  "index.html",
  "sales/index.html",
  "finance/index.html",
  "custom/index.html",
  "search/index.html",
  "platform/index.html",
  "industries/index.html",
  "cases/index.html",
  "about/index.html",
  "partners/index.html",
  "snippets/ordo-header.html",
];

for (const file of files) {
  const fp = path.join(__dirname, "..", file);
  if (!fs.existsSync(fp)) continue;
  let s = fs.readFileSync(fp, "utf8");
  let n = 0;
  for (const [from, to] of pairs) {
    if (s.includes(from)) {
      s = s.split(from).join(to);
      n++;
    }
  }
  if (n) {
    fs.writeFileSync(fp, s);
    console.log(file, n, "replacements");
  }
}
