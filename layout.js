// Shared by the website (script.js) and the PDF version (print.js).
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
// CAD renders / drawings are shown on white with a thin border
const isDrawing = (cap) => /CAD|DFM|schematic|drawing|pocketed/i.test(cap);
const sizes = typeof IMAGE_SIZES !== "undefined" ? IMAGE_SIZES : {};
const ratio = (src) => (sizes[src] ? sizes[src][0] / sizes[src][1] : 4 / 3);

// Justified rows: images in a row share one height and keep their own shape (no cropping).
// The first row holds fewer images so the lead image is large.
// Returns [[ [image, index, aspectRatio], ... ], sumOfAspectRatios, optionalMaxHeight] per row.
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

// Tallest a row may be: its own max height (if set), and no more than ~1.2x a low-res image's native height
function rowCap(row, height, fallback) {
  const minH = Math.min(...row.map(([[src]]) => (sizes[src] ? sizes[src][1] : 1e4)));
  return Math.min(height || fallback, minH * 1.2);
}
