// Renders one landscape page per project for the PDF version (print.html).
// Images come from ?img=<folder> when given (the build script passes smaller copies), else images/projects.
const imgDir = new URLSearchParams(location.search).get("img");
const imgSrc = (src) => (imgDir ? src.replace("images/projects/", imgDir.replace(/\/?$/, "/")) : src);

// Image area on a project page (CSS px; page is 11in × 8.5in = 1056 × 816)
const AREA_W = 626, AREA_H = 690, GAP = 8;

// Split images (in order) into k rows with roughly equal total aspect ratio
function splitRows(items, k) {
  const total = items.reduce((s, x) => s + x[2], 0);
  const rows = [];
  let cur = [], acc = 0, done = 0;
  items.forEach((it, idx) => {
    const left = items.length - idx;          // items not yet placed (including this one)
    const rowsLeft = k - rows.length;         // rows still to fill (including current)
    const target = (total - done) / rowsLeft;
    if (cur.length && rowsLeft > 1 && (acc + it[2] / 2 > target || left < rowsLeft)) {
      rows.push(cur); done += acc; cur = []; acc = 0;
    }
    cur.push(it); acc += it[2];
  });
  rows.push(cur);
  return rows.map((r) => [r, r.reduce((s, x) => s + x[2], 0)]);
}

// Lay rows out: each row fills the width at a shared height, capped for low-res images; scale all to fit the height
function measure(rows) {
  const laid = rows.map(([row, sum, height]) => {
    const h = Math.min((AREA_W - GAP * (row.length - 1)) / sum, rowCap(row, height, AREA_H));
    return { row, sum, h };
  });
  const gaps = GAP * (laid.length - 1);
  const totalH = laid.reduce((s, r) => s + r.h, 0);
  const scale = totalH + gaps > AREA_H ? (AREA_H - gaps) / totalH : 1;
  const area = laid.reduce((s, r) => s + (r.h * scale) ** 2 * r.sum, 0);
  return { laid, scale, area };
}

// Pick the row arrangement that fills the page best. Projects whose rows set a smaller height
// (e.g. the low-res Go Baby Go row) keep their website layout.
function pageMosaic(p) {
  let best;
  if (p.rows && p.rows.some((r) => typeof r === "object")) {
    best = measure(toRows(p.images, p.rows));
  } else {
    const items = p.images.map((im, j) => [im, j, ratio(im[0])]);
    for (let k = 1; k <= Math.min(items.length, 4); k++) {
      const m = measure(splitRows(items, k));
      if (!best || m.area > best.area * 1.02) best = m;
    }
  }
  const { laid: rows, scale } = best;
  return rows.map(({ row, h }) => {
    const rh = Math.floor(h * scale);
    return `<div class="prow" style="height:${rh}px">${row.map(([[src, cap], , ar]) => `
      <figure class="${isDrawing(cap) ? "drawing" : ""}" style="width:${Math.floor(rh * ar)}px">
        <img src="${imgSrc(src)}" alt="${esc(cap)}">
        <figcaption>${esc(cap)}</figcaption>
      </figure>`).join("")}</div>`;
  }).join("");
}

const FIRST_PROJECT_PAGE = 3; // after the cover and the experience page
const total = PROJECTS.length + FIRST_PROJECT_PAGE - 1;

document.getElementById("project-count").textContent = PROJECTS.length;
document.getElementById("contents").innerHTML = PROJECTS.map((p, i) =>
  `<li><span>${esc(p.title)}</span><span class="dots"></span><span>${i + FIRST_PROJECT_PAGE}</span></li>`).join("");

document.getElementById("project-pages").innerHTML = PROJECTS.map((p, i) => `
  <section class="page">
    <div class="proj">
      <div class="proj-text">
        <p class="proj-org"><span>${String(i + 1).padStart(2, "0")}</span>${esc(p.org)}</p>
        <h2>${esc(p.title)}</h2>
        <p class="proj-summary">${esc(p.summary)}</p>
        <ul class="proj-points">${p.points.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
        <ul class="tags">${p.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
      </div>
      <div class="proj-images">${pageMosaic(p)}</div>
    </div>
  </section>`).join("");

// Footer on every page
document.querySelectorAll(".page").forEach((pg, k) => {
  pg.insertAdjacentHTML("beforeend",
    `<footer class="pfoot"><span>Charlie Borchers — Portfolio</span><a href="https://charlieb4.github.io">charlieb4.github.io</a><span>${k + 1} / ${total}</span></footer>`);
});
if (imgDir) document.querySelectorAll(".cover-mosaic img").forEach((im) => (im.src = imgSrc(im.getAttribute("src"))));
