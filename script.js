// ---------- Footer year + project count ----------
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("project-count").textContent = PROJECTS.length;

// ---------- Header border on scroll ----------
const header = document.querySelector(".site-header");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ---------- Mobile menu ----------
const toggle = document.querySelector(".nav-toggle");
const navLinks = document.getElementById("nav-links");
function setMenu(open) {
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  navLinks.classList.toggle("open", open);
}
toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
navLinks.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });

// ---------- Projects: full case studies rendered inline ----------
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
// CAD renders / drawings are shown whole on white instead of cropped
const isDrawing = (cap) => /CAD|DFM|schematic|drawing|pocketed/i.test(cap);
const sizes = typeof IMAGE_SIZES !== "undefined" ? IMAGE_SIZES : {};
const ratio = (src) => (sizes[src] ? sizes[src][0] / sizes[src][1] : 4 / 3);

// Justified rows: images in a row share one height and keep their own shape (no cropping).
// The first row holds fewer images so the lead image is large.
function toRows(images, spec) {
  // Manual layout: spec like [2, 2] or [3, { n: 3, height: 150 }] — images per row, optional max row height
  if (spec) {
    const rows = [];
    let k = 0;
    spec.forEach((r) => {
      const n = typeof r === "number" ? r : r.n;
      const row = images.slice(k, k + n).map((im, t) => [im, k + t, ratio(im[0])]);
      k += n;
      if (row.length) rows.push([row, row.reduce((s, x) => s + x[2], 0), r.height]);
    });
    if (k < images.length) rows.push(...toRows(images.slice(k)).map(([row, s]) => [row.map(([im, j, ar]) => [im, j + k, ar]), s]));
    return rows;
  }
  const rows = [];
  let cur = [], sum = 0;
  images.forEach((im, j) => {
    const ar = ratio(im[0]);
    cur.push([im, j, ar]); sum += ar;
    if (sum >= (rows.length === 0 ? 1.9 : 3.0)) { rows.push([cur, sum]); cur = []; sum = 0; }
  });
  if (cur.length) {
    if (sum < 1.3 && rows.length) { // too few left over: fold into the previous row
      const last = rows[rows.length - 1];
      last[0].push(...cur); last[1] += sum;
    } else rows.push([cur, sum]);
  }
  return rows;
}

function mosaic(p, i) {
  return toRows(p.images, p.rows).map(([row, sum, height]) => {
    // Row height cap: 400px (or the row's own height), less if an image is low-res (don't upscale past ~1.2x)
    const minH = Math.min(...row.map(([[src]]) => (sizes[src] ? sizes[src][1] : 1e4)));
    const cap = Math.round(Math.min(height || 400, minH * 1.2));
    return `
    <div class="mrow" style="max-width:${Math.round(sum * cap)}px">
      ${row.map(([[src, cap], j, ar]) => `
        <figure class="${isDrawing(cap) ? "drawing" : ""}" style="flex:${ar.toFixed(3)} 1 0%">
          <button class="zoom" data-p="${i}" data-i="${j}" aria-label="Enlarge: ${esc(cap)}">
            <img src="${src}" alt="${esc(cap)}" style="aspect-ratio:${ar.toFixed(4)}" loading="${i < 2 ? "eager" : "lazy"}">
          </button>
          <figcaption>${esc(cap)}</figcaption>
        </figure>`).join("")}
    </div>`;
  }).join("");
}

document.getElementById("projects").innerHTML = PROJECTS.map((p, i) => `
  <article class="project" id="${p.id}">
    <div class="project-text">
      <p class="project-org"><span class="project-num">${String(i + 1).padStart(2, "0")}</span>${esc(p.org)}</p>
      <h3>${esc(p.title)}</h3>
      <p class="project-summary">${esc(p.summary)}</p>
      <ul class="project-points">${p.points.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
      <ul class="tags">${p.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
    </div>
    <div class="mosaic">${mosaic(p, i)}</div>
  </article>`).join("");

// ---------- Lightbox (image zoom only) ----------
const lb = document.getElementById("lightbox");
const lbImg = document.getElementById("lb-img");
const lbCap = document.getElementById("lb-cap");
let lbP = 0, lbI = 0;
function showLb(p, i) {
  const imgs = PROJECTS[p].images;
  lbP = p; lbI = (i + imgs.length) % imgs.length;
  lbImg.src = imgs[lbI][0];
  lbImg.alt = imgs[lbI][1];
  lbCap.textContent = `${PROJECTS[p].title} — ${imgs[lbI][1]}  (${lbI + 1}/${imgs.length})`;
  lb.classList.toggle("single", imgs.length < 2);
}
document.getElementById("projects").addEventListener("click", (e) => {
  const b = e.target.closest(".zoom");
  if (!b) return;
  showLb(Number(b.dataset.p), Number(b.dataset.i));
  lb.showModal();
});
lb.querySelector(".lb-prev").addEventListener("click", (e) => { e.stopPropagation(); showLb(lbP, lbI - 1); });
lb.querySelector(".lb-next").addEventListener("click", (e) => { e.stopPropagation(); showLb(lbP, lbI + 1); });
lb.addEventListener("click", (e) => { if (!e.target.closest(".lb-prev, .lb-next")) lb.close(); });
lb.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") showLb(lbP, lbI - 1);
  if (e.key === "ArrowRight") showLb(lbP, lbI + 1);
});
