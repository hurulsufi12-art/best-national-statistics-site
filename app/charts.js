// KAVSTAT charts — pure-SVG bar, line and paired-bar (age pyramid) charts.
// No libraries, no network. Every function returns an SVG string.
export function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function niceMax(values) {
  const m = Math.max(...values);
  if (m <= 0) return 1;
  const p = Math.pow(10, Math.floor(Math.log10(m)));
  return Math.ceil(m / p) * p;
}

export function barChart({ values, labels, width = 640, height = 260, color = '#0e7c7b', format = (v) => String(v) }) {
  const max = niceMax(values);
  const padL = 44, padB = 28, padT = 12;
  const cw = width - padL - 8, ch = height - padT - padB;
  const bw = cw / values.length;
  let bars = '';
  values.forEach((v, i) => {
    const bh = (v / max) * ch;
    const x = padL + i * bw + bw * 0.18;
    const y = padT + ch - bh;
    bars += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${(bw * 0.64).toFixed(1)}" height="${bh.toFixed(1)}" fill="${color}" rx="3"/>`
      + `<text x="${(x + bw * 0.32).toFixed(1)}" y="${(y - 5).toFixed(1)}" text-anchor="middle" font-size="11" fill="#33414f">${esc(format(v))}</text>`
      + `<text x="${(x + bw * 0.32).toFixed(1)}" y="${(padT + ch + 18).toFixed(1)}" text-anchor="middle" font-size="11" fill="#5b6b7a">${esc(labels[i])}</text>`;
  });
  return `<svg viewBox="0 0 ${width} ${height}" width="100%" role="img" aria-label="Bar chart">`
    + `<line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + ch}" stroke="#c8d2da"/>`
    + `<line x1="${padL}" y1="${padT + ch}" x2="${width - 8}" y2="${padT + ch}" stroke="#c8d2da"/>${bars}</svg>`;
}

export function lineChart({ points, width = 640, height = 260, color = '#12324f', format = (v) => String(v) }) {
  const values = points.map((p) => p.value);
  const min = Math.min(...values), max = Math.max(...values);
  const span = max - min || 1;
  const padL = 48, padB = 28, padT = 14;
  const cw = width - padL - 12, ch = height - padT - padB;
  const x = (i) => padL + (i / (points.length - 1)) * cw;
  const y = (v) => padT + ch - ((v - min) / span) * ch * 0.85 - ch * 0.05;
  let d = '';
  points.forEach((p, i) => { d += (i === 0 ? 'M' : 'L') + x(i).toFixed(1) + ' ' + y(p.value).toFixed(1) + ' '; });
  let dots = '';
  points.forEach((p, i) => {
    dots += `<circle cx="${x(i).toFixed(1)}" cy="${y(p.value).toFixed(1)}" r="3.5" fill="${color}"/>`
      + `<text x="${x(i).toFixed(1)}" y="${(padT + ch + 18).toFixed(1)}" text-anchor="middle" font-size="10.5" fill="#5b6b7a">${esc(String(p.year).slice(2))}</text>`;
  });
  const last = points[points.length - 1];
  return `<svg viewBox="0 0 ${width} ${height}" width="100%" role="img" aria-label="Line chart">`
    + `<line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + ch}" stroke="#c8d2da"/>`
    + `<line x1="${padL}" y1="${padT + ch}" x2="${width - 12}" y2="${padT + ch}" stroke="#c8d2da"/>`
    + `<text x="6" y="${(y(max) + 4).toFixed(1)}" font-size="11" fill="#5b6b7a">${esc(format(max))}</text>`
    + `<text x="6" y="${(y(min) + 4).toFixed(1)}" font-size="11" fill="#5b6b7a">${esc(format(min))}</text>`
    + `<path d="${d}" fill="none" stroke="${color}" stroke-width="2.5"/>${dots}`
    + `<text x="${(width - 12).toFixed(0)}" y="${(y(last.value) - 10).toFixed(1)}" text-anchor="end" font-size="12" font-weight="700" fill="${color}">${esc(format(last.value))}</text></svg>`;
}

// Paired horizontal bars: men left of centre, women right (age pyramid).
export function pyramidChart({ groups, width = 640, height = 280 }) {
  const max = Math.max(...groups.flatMap((g) => [g.male, g.female]));
  const mid = width / 2, padT = 30, rowH = (height - padT - 26) / groups.length;
  let rows = '';
  groups.forEach((g, i) => {
    const y = padT + i * rowH + 4;
    const bh = rowH - 10;
    const mw = (g.male / max) * (mid - 70);
    const fw = (g.female / max) * (mid - 70);
    rows += `<rect x="${(mid - 8 - mw).toFixed(1)}" y="${y}" width="${mw.toFixed(1)}" height="${bh}" fill="#12324f" rx="2"/>`
      + `<rect x="${(mid + 8).toFixed(1)}" y="${y}" width="${fw.toFixed(1)}" height="${bh}" fill="#0e7c7b" rx="2"/>`
      + `<rect x="${(mid - 30).toFixed(1)}" y="${y}" width="60" height="${bh}" fill="#ffffff"/>`
      + `<text x="${(mid - 14 - mw).toFixed(1)}" y="${(y + bh / 2 + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="#33414f">${g.male.toFixed(1)}%</text>`
      + `<text x="${(mid + 14 + fw).toFixed(1)}" y="${(y + bh / 2 + 4).toFixed(1)}" font-size="11" fill="#33414f">${g.female.toFixed(1)}%</text>`
      + `<text x="${mid}" y="${(y + bh / 2 + 4).toFixed(1)}" text-anchor="middle" font-size="11.5" font-weight="600" fill="#12324f">${esc(g.group)}</text>`;
  });
  return `<svg viewBox="0 0 ${width} ${height}" width="100%" role="img" aria-label="Age pyramid chart">`
    + `<text x="${(mid - 60).toFixed(0)}" y="16" text-anchor="middle" font-size="12" font-weight="700" fill="#12324f">Men</text>`
    + `<text x="${(mid + 60).toFixed(0)}" y="16" text-anchor="middle" font-size="12" font-weight="700" fill="#0e7c7b">Women</text>`
    + `<line x1="${mid}" y1="24" x2="${mid}" y2="${height - 22}" stroke="#c8d2da"/>${rows}</svg>`;
}
