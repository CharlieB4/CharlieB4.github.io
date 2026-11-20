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

// ---------- Projects: full case studies rendered inline (layout helpers in layout.js) ----------
function mosaic(p, i) {
  return toRows(p.images, p.rows).map(([row, sum, height]) => {
    const cap = Math.round(rowCap(row, height, 400)); // row height cap: 400px
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
