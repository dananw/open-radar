import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 2200 } });
await page.goto("http://localhost:4321/", { waitUntil: "networkidle" });

const data = await page.evaluate(() => {
  const out = {};
  const rect = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return {
      top: Math.round(r.top + window.scrollY),
      bottom: Math.round(r.bottom + window.scrollY),
      pt: cs.paddingTop,
      pb: cs.paddingBottom,
      mt: cs.marginTop,
      mb: cs.marginBottom,
    };
  };
  out.header = rect("header");
  out.hero = rect("main > section:nth-child(1)");
  out.heroInner = rect("main > section:nth-child(1) > div:nth-child(2)");
  out.stats = rect("main > section:nth-child(2)");
  out.featured = rect("main > section:nth-child(3)");
  out.index = rect("main > section:nth-child(4)");
  return out;
});

const gap = (a, b) =>
  data[a] && data[b] ? data[b].top - data[a].bottom : "n/a";
console.log(JSON.stringify(data, null, 2));
console.log("\n--- GAPS (visual whitespace between section boxes) ---");
console.log(
  "navbar.bottom→hero.top :",
  data.header && data.hero ? data.hero.top - data.header.bottom : "n/a",
);
console.log("hero→stats   :", gap("hero", "stats"));
console.log("stats→featured:", gap("stats", "featured"));
console.log("featured→index:", gap("featured", "index"));

await browser.close();
