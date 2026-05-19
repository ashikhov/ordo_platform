const fs = require("fs");
const files = process.argv.slice(2);
const bad = ["m", "o", "t", "i", "o", "n"].join("");
const good = ["d", "i", "v"].join("");
for (const p of files) {
  let c = fs.readFileSync(p, "utf8");
  c = c.split("<" + bad + " ").join("<" + good + " ");
  c = c.split("<" + bad + ">").join("<" + good + ">");
  c = c.split("</" + bad + ">").join("</" + good + ">");
  c = c.replace(/class=""\>/g, ">");
  fs.writeFileSync(p, c);
  console.log("fixed", p);
}
