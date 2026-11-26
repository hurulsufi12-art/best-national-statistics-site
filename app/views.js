// KAVSTAT views — one render function per page. All figures come from data.js;
// every page shows its source and year under the title.
import { DATA } from './data.js';
import { barChart, lineChart, pyramidChart, esc } from './charts.js';

const D = DATA;

export function sourceLine(source, year) {
  return `<p class="src">Source: ${esc(source)} (${year})</p>`;
}

function kpiCard(k) {
  return `<article class="kpi"><p class="kpi-label">${esc(k.label)}</p>`
    + `<p class="kpi-value">${esc(String(k.value))} <span class="kpi-unit">${esc(k.unit)}</span></p>`
    + `<p class="kpi-year">${k.year} · ${esc(k.change)}</p></article>`;
}

function card(title, inner, extra = '') {
  return `<section class="card ${extra}"><h2>${esc(title)}</h2>${inner}</section>`;
}

export function viewDashboard() {
  const k = D.kpi;
  const pop = D.series.population;
  const rows = D.releases.map((r) => `<li><span class="tag">${esc(r.tag)}</span> `
    + `<strong>${esc(r.title)}</strong><span class="date">${esc(r.date)}</span></li>`).join('');
  return `<h1>National statistics at a glance</h1>${sourceLine('KAVSTAT official releases', 2026)}`
    + `<div class="kpi-grid">${kpiCard(k.population)}${kpiCard(k.gdpPerCapita)}${kpiCard(k.unemployment)}`
    + `${kpiCard(k.literacy)}${kpiCard(k.lifeExpectancy)}${kpiCard(k.inflation)}</div>`
    + `<div class="two-col">`
    + card('Population, 2015–2025 (million)', lineChart({ points: pop, format: (v) => v.toFixed(2) }))
    + card('Unemployment rate, 2015–2025 (%)', barChart({
        values: D.labour.unemploymentSeries,
        labels: ['15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25'],
        color: '#b7791f', format: (v) => v.toFixed(1),
      }))
    + `</div>`
    + card('Latest releases', `<ul class="releases">${rows}</ul>`)
    + `<p class="note">KAVSTAT publishes the official statistics of Kavaria: population, economy, `
    + `labour, education and health. Every figure on this site carries its source and year.</p>`;
}

export function viewPopulation() {
  const p = D.population;
  const provRows = p.provinces.map((r) => `<tr><td>${esc(r.name)}</td><td>${r.pop.toFixed(2)}</td>`
    + `<td>${r.density}</td><td>+${r.growth.toFixed(1)}%</td></tr>`).join('');
  return `<h1>Population</h1>${sourceLine(p.source, p.year)}`
    + `<div class="kpi-grid">${kpiCard({ label: 'Total population', value: p.total2025, unit: 'million', year: 2025, change: '+1.0% vs 2024' })}`
    + `${kpiCard({ label: 'Population density', value: p.density, unit: 'per km²', year: 2025, change: 'land 302,000 km²' })}`
    + `${kpiCard({ label: 'Urban share', value: p.urbanShare, unit: '%', year: 2025, change: '+0.4 pp vs 2024' })}`
    + `${kpiCard({ label: 'Annual growth', value: p.growth2025, unit: '%', year: 2025, change: 'natural + migration' })}</div>`
    + `<div class="two-col">`
    + card('Population by age group, 2025 (% of total)', pyramidChart({ groups: p.ageGroups }))
    + card('Population trend, 2015–2025 (million)', lineChart({ points: D.series.population, format: (v) => v.toFixed(2) }))
    + `</div>`
    + card('Population by province, 2025',
      `<div class="controls"><label>Search province <input id="prov-search" type="search" placeholder="Type a province name…"></label> `
      + `<button id="prov-sort" type="button">Sort by population ↓</button></div>`
      + `<table id="prov-table"><thead><tr><th>Province</th><th>Population (m)</th><th>Density /km²</th><th>Growth</th></tr></thead>`
      + `<tbody>${provRows}</tbody></table><p class="src">Provinces sum to 18.42 million. Source: ${esc(p.source)} (${p.year}).</p>`);
}

export function viewEconomy() {
  const e = D.economy;
  const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
  const pts = e.gdpSeries.map((v, i) => ({ year: years[i], value: v }));
  const secRows = e.sectors.map((s) => `<tr><td>${esc(s.name)}</td><td>${s.share.toFixed(1)}%</td><td>+${s.growth.toFixed(1)}%</td></tr>`).join('');
  return `<h1>Economy</h1>${sourceLine(e.source, e.year)}`
    + `<div class="kpi-grid">${kpiCard({ label: 'GDP per capita', value: e.gdpPerCapita2025, unit: 'USD', year: 2025, change: '+4.2% vs 2024' })}`
    + `${kpiCard({ label: 'GDP total', value: e.gdpTotal2025, unit: 'USD bn', year: 2025, change: '+4.6% real growth' })}`
    + `${kpiCard({ label: 'Real GDP growth', value: e.growth2025, unit: '%', year: 2025, change: 'vs 3.9% in 2024' })}`
    + `${kpiCard({ label: 'Inflation (CPI)', value: e.inflation2025, unit: '%', year: 2025, change: 'target 2–4%' })}</div>`
    + `<div class="two-col">`
    + card('GDP per capita, 2015–2025 (USD)', lineChart({ points: pts, color: '#0e7c7b', format: (v) => '$' + v.toLocaleString('en-US') }))
    + card('GDP by sector, 2025 (% of GDP)', barChart({
        values: e.sectors.map((s) => s.share), labels: e.sectors.map((s) => s.name),
        color: '#12324f', format: (v) => v.toFixed(1) + '%',
      }))
    + `</div>`
    + card('Sectors of the economy, 2025',
      `<table><thead><tr><th>Sector</th><th>Share of GDP</th><th>Real growth</th></tr></thead><tbody>${secRows}</tbody></table>`
      + `<p class="src">Source: ${esc(e.source)} (${e.year}).</p>`);
}

export function viewLabour() {
  const l = D.labour;
  const ageRows = l.byAge.map((r) => `<tr><td>${esc(r.group)}</td><td>${r.rate.toFixed(1)}%</td></tr>`).join('');
  const secRows = l.bySector.map((s) => `<tr><td>${esc(s.name)}</td><td>${s.share.toFixed(1)}%</td></tr>`).join('');
  return `<h1>Labour market</h1>${sourceLine(l.source, l.year)}`
    + `<div class="kpi-grid">${kpiCard({ label: 'Unemployment rate', value: l.unemployment2025, unit: '%', year: 2025, change: '-0.4 pp vs 2024' })}`
    + `${kpiCard({ label: 'Labour force', value: l.labourForce, unit: 'million', year: 2025, change: '+1.3% vs 2024' })}`
    + `${kpiCard({ label: 'Participation rate', value: l.participation, unit: '%', year: 2025, change: '+0.5 pp vs 2024' })}`
    + `${kpiCard({ label: 'Youth unemployment', value: 12.6, unit: '%', year: 2025, change: 'ages 15–24' })}</div>`
    + `<div class="two-col">`
    + card('Unemployment by age group, 2025 (%)', barChart({
        values: l.byAge.map((r) => r.rate), labels: l.byAge.map((r) => r.group),
        color: '#b7791f', format: (v) => v.toFixed(1) + '%',
      }))
    + card('Employment by sector, 2025 (% of workers)',
      `<table><thead><tr><th>Sector</th><th>Share</th></tr></thead><tbody>${secRows}</tbody></table>`
      + `<p class="src">Source: ${esc(l.source)} (${l.year}).</p>`)
    + `</div>`
    + card('Unemployment by age group, 2025',
      `<table><thead><tr><th>Age group</th><th>Unemployment rate</th></tr></thead><tbody>${ageRows}</tbody></table>`
      + `<p class="src">Source: ${esc(l.source)} (${l.year}).</p>`);
}

export function viewEducation() {
  const e = D.education;
  const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
  const pts = e.literacySeries.map((v, i) => ({ year: years[i], value: v }));
  const rows = e.byLevel.map((r) => `<tr><td>${esc(r.level)}</td><td>${r.enrolment.toFixed(1)}%</td><td>${r.completion.toFixed(1)}%</td></tr>`).join('');
  return `<h1>Education</h1>${sourceLine(e.source, e.year)}`
    + `<div class="kpi-grid">${kpiCard({ label: 'Literacy rate', value: e.literacy2025, unit: '%', year: 2025, change: 'ages 15+' })}`
    + `${kpiCard({ label: 'Primary enrolment', value: e.primary, unit: '%', year: 2025, change: 'net rate' })}`
    + `${kpiCard({ label: 'Secondary enrolment', value: e.secondary, unit: '%', year: 2025, change: 'net rate' })}`
    + `${kpiCard({ label: 'Tertiary enrolment', value: e.tertiary, unit: '%', year: 2025, change: 'gross rate' })}</div>`
    + `<div class="two-col">`
    + card('Literacy rate, 2015–2025 (%)', lineChart({ points: pts, color: '#0e7c7b', format: (v) => v.toFixed(1) + '%' }))
    + card('Enrolment by level, 2025 (%)', barChart({
        values: e.byLevel.map((r) => r.enrolment), labels: ['Primary', 'Lower sec.', 'Upper sec.', 'Tertiary'],
        color: '#12324f', format: (v) => v.toFixed(1) + '%',
      }))
    + `</div>`
    + card('Enrolment and completion by level, 2025',
      `<table><thead><tr><th>Level</th><th>Enrolment</th><th>Completion</th></tr></thead><tbody>${rows}</tbody></table>`
      + `<p class="src">Source: ${esc(e.source)} (${e.year}).</p>`);
}

export function viewHealth() {
  const h = D.health;
  const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
  const pts = h.lifeSeries.map((v, i) => ({ year: years[i], value: v }));
  const rows = h.indicators.map((r) => `<tr><td>${esc(r.name)}</td><td>${esc(r.value)}</td><td>${r.year}</td></tr>`).join('');
  return `<h1>Health</h1>${sourceLine(h.source, h.year)}`
    + `<div class="kpi-grid">${kpiCard({ label: 'Life expectancy', value: h.lifeExpectancy2025, unit: 'years', year: 2025, change: '+0.2 vs 2024' })}`
    + `${kpiCard({ label: 'Infant mortality', value: h.infantMortality, unit: 'per 1,000', year: 2025, change: '-0.4 vs 2024' })}`
    + `${kpiCard({ label: 'Hospital beds', value: h.beds, unit: 'per 1,000', year: 2025, change: 'public + private' })}`
    + `${kpiCard({ label: 'Doctors', value: h.doctors, unit: 'per 1,000', year: 2025, change: '+0.1 vs 2024' })}</div>`
    + `<div class="two-col">`
    + card('Life expectancy at birth, 2015–2025 (years)', lineChart({ points: pts, color: '#0e7c7b', format: (v) => v.toFixed(1) }))
    + card('Key health indicators, 2025',
      `<table><thead><tr><th>Indicator</th><th>Value</th><th>Year</th></tr></thead><tbody>${rows}</tbody></table>`)
    + `</div>`
    + `<p class="note">Health spending was 6.4% of GDP in 2025. Source: ${esc(h.source)} (${h.year}).</p>`;
}

export function viewSources() {
  const items = [
    ['Population', D.population.source, 2025],
    ['Economy', D.economy.source, 2025],
    ['Labour', D.labour.source, 2025],
    ['Education', D.education.source, 2025],
    ['Health', D.health.source, 2025],
  ].map(([t, s, y]) => `<tr><td>${esc(t)}</td><td>${esc(s)}</td><td>${y}</td></tr>`).join('');
  return `<h1>Sources &amp; methods</h1><p class="src">KAVSTAT — National Statistics Office of Kavaria</p>`
    + card('Where every figure comes from',
      `<table><thead><tr><th>Topic</th><th>Source</th><th>Year</th></tr></thead><tbody>${items}</tbody></table>`
      + `<p class="src">Figures are the official statistics published by KAVSTAT. `
      + `Population is updated yearly from the population register; economic figures follow the `
      + `national accounts; labour figures come from the quarterly Labour Force Survey.</p>`)
    + card('Methods in brief',
      `<ul class="methods"><li><strong>Census-based:</strong> population totals benchmarked to the Kavaria Census 2024.</li>`
      + `<li><strong>Survey-based:</strong> labour and education figures from nationally representative samples.</li>`
      + `<li><strong>Revisions:</strong> figures are revised when better data arrives; the latest release always wins.</li></ul>`);
}

// Wire the page-specific controls after a view renders (search + sort).
export function wireControls() {
  const search = document.getElementById('prov-search');
  const sortBtn = document.getElementById('prov-sort');
  const table = document.getElementById('prov-table');
  if (!search || !sortBtn || !table) return;
  let descending = true;
  const rows = () => Array.from(table.querySelectorAll('tbody tr'));
  search.addEventListener('input', () => {
    const q = search.value.trim().toLowerCase();
    rows().forEach((tr) => { tr.style.display = tr.textContent.toLowerCase().includes(q) ? '' : 'none'; });
  });
  sortBtn.addEventListener('click', () => {
    descending = !descending;
    const body = table.querySelector('tbody');
    const sorted = rows().sort((a, b) => {
      const av = parseFloat(a.children[1].textContent), bv = parseFloat(b.children[1].textContent);
      return descending ? bv - av : av - bv;
    });
    sorted.forEach((tr) => body.appendChild(tr));
    sortBtn.textContent = descending ? 'Sort by population ↓' : 'Sort by population ↑';
  });
}
