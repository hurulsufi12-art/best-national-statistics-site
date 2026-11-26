# KAVSTAT — National Statistics of Kavaria: 6 indicator pages, 11 charts, 9 tables, every figure sourced 2015–2025

[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/hurulsufi12-art/best-national-statistics-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/hurulsufi12-art/best-national-statistics-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

Entry for the make.fun bounty
[Make the best national statistics site](https://make.fun/bounty/best-national-statistics-site-20261126-0539).

## What it is

**KAVSTAT** is the national statistics site of Kavaria, a fictional island
nation of 18.42 million people. Dashboard plus one page per indicator —
population, economy, labour market, education and health — plus a sources
& methods page. Every page is reached by a link; every figure carries its
source and year.

- **6 pages**: dashboard, population, economy, labour, education, health,
  sources & methods (hash routing, no page reload).
- **11 charts**: population trend, unemployment, age pyramid, GDP per
  capita, sector shares, unemployment by age, literacy trend, enrolment,
  life expectancy — pure SVG, drawn by the site's own code.
- **9 tables**: provinces, sectors, age groups, education levels, health
  indicators — with a working search and sort on the province table.
- **Figures**: 2015–2025 series throughout; dashboard KPIs are the same
  numbers the indicator pages show (one data file, one source of truth).

## Run it

```sh
node serve.ts
# open http://localhost:8080
```

No build step, no network: static HTML/CSS/JS only.

## Files

- `app/index.html` — page shell, navigation
- `app/main.js` — hash router
- `app/views.js` — one render function per page
- `app/charts.js` — SVG bar / line / pyramid charts
- `app/data.js` — every figure, with source and year
- `app/styles.css` — all styling
- `main.ts` — hand-in program (Node 22 stdlib only): copies `app/` and
  `screenshots/` to the output directory and writes `dossier.json`
- `vendor/makefun-frontend.ts` — make.fun dossier library (kit, unchanged)
- `screenshots/` — 4 screenshots of the running site (desktop + phone)

## License

MIT — see `LICENSE`.
