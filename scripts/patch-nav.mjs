import fs from "fs";
import path from "path";

const root = path.resolve(".");

const files = [
  "sales/index.html",
  "finance/index.html",
  "custom/index.html",
  "search/index.html",
  "platform/index.html",
];

for (const file of files) {
  const fp = path.join(root, file);
  let c = fs.readFileSync(fp, "utf8");
  const base = "../";

  c = c
    .replace(/href="\.\.\/index\.html#industries"/g, `href="${base}industries/"`)
    .replace(/href="\.\.\/index\.html#cases"/g, `href="${base}cases/"`)
    .replace(/href="\.\.\/platform\/#partners"/g, `href="${base}partners/"`)
    .replace(/href="#industries"/g, `href="${base}industries/"`)
    .replace(/href="#cases"/g, `href="${base}cases/"`)
    .replace(/href="#audience"/g, `href="${base}industries/"`)
    .replace(/href="#examples"/g, `href="${base}cases/"`)
    .replace(/href="#partners"/g, `href="${base}partners/"`)
    .replace(/href="platform\/#partners"/g, `href="${base}partners/"`);

  c = c.replace(/href="(\.\.\/)?index\.html#contact"/g, 'href="$1about/#contact"');
  c = c.replace(/href="#contact"/g, `href="${base}about/#contact"`);

  c = c.replace(
    /<div class="ordo-nav-item has-mega">\r?\n\s*<button type="button" class="ordo-nav-trigger" aria-expanded="false" aria-controls="ordo-mega-about">[\s\S]*?\r?\n\s*<\/div>\r?\n\s*<\/nav>/,
    `      <a class="ordo-nav-link" href="${base}about/">О компании</a>\n    </nav>`
  );

  c = c.replace(
    /    <div class="ordo-mobile-group">\r?\n\s*<button type="button" class="ordo-mobile-trigger" aria-expanded="false">О компании[\s\S]*?\r?\n\s*<\/div>\r?\n\s*<a class="ordo-mobile-cta"/,
    `    <a class="ordo-mobile-link" href="${base}about/">О компании</a>\n    <a class="ordo-mobile-cta"`
  );

  fs.writeFileSync(fp, c);
  console.log("patched", file);
}
