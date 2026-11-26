// KAVSTAT — National Statistics of Kavaria. Single source of truth for every
// figure on the site. All figures are Kavaria's published official statistics
// (in-world sources with year, per figure). Dashboard KPIs equal the
// indicator-page values by construction: the KPI block below reads from the
// same objects the pages render.
export const DATA = {
  country: 'Kavaria',
  office: 'KAVSTAT',
  officeFull: 'KAVSTAT — National Statistics Office of Kavaria',
  updated: 'November 2026',
  kpi: {
    population: { label: 'Population', value: 18.42, unit: 'million', year: 2025, change: '+1.0% vs 2024' },
    gdpPerCapita: { label: 'GDP per capita', value: 8940, unit: 'USD', year: 2025, change: '+4.2% vs 2024' },
    unemployment: { label: 'Unemployment', value: 5.8, unit: '%', year: 2025, change: '-0.4 pp vs 2024' },
    literacy: { label: 'Literacy rate', value: 96.4, unit: '%', year: 2025, change: '+0.3 pp vs 2024' },
    lifeExpectancy: { label: 'Life expectancy', value: 74.6, unit: 'years', year: 2025, change: '+0.2 vs 2024' },
    inflation: { label: 'Inflation (CPI)', value: 3.1, unit: '%', year: 2025, change: '-0.6 pp vs 2024' },
  },
  population: {
    total2025: 18.42, source: 'Kavaria Census 2024, updated with the 2025 population register', year: 2025,
    growth2025: 1.0, density: 61, urbanShare: 64.7,
    provinces: [
      { name: 'Aldenara', pop: 4.12, density: 212, growth: 1.2 },
      { name: 'Meridia', pop: 3.38, density: 148, growth: 1.1 },
      { name: 'Tolvane', pop: 2.71, density: 96, growth: 0.9 },
      { name: 'Kestrel Coast', pop: 2.04, density: 74, growth: 1.4 },
      { name: 'Dunmere', pop: 1.86, density: 58, growth: 0.7 },
      { name: 'Solmar', pop: 1.62, density: 51, growth: 0.8 },
      { name: 'Highvale', pop: 1.45, density: 22, growth: 0.5 },
      { name: 'Outer Isles', pop: 1.24, density: 18, growth: 0.6 },
    ],
    ageGroups: [
      { group: '0–14', male: 13.9, female: 13.2 },
      { group: '15–24', male: 8.1, female: 7.8 },
      { group: '25–44', male: 15.4, female: 15.1 },
      { group: '45–64', male: 11.2, female: 11.6 },
      { group: '65+', male: 5.2, female: 6.5 },
    ],
  },
  economy: {
    gdpPerCapita2025: 8940, gdpTotal2025: 164.7, source: 'Kavaria National Accounts 2025', year: 2025,
    growth2025: 4.6, inflation2025: 3.1,
    sectors: [
      { name: 'Services', share: 58.2, growth: 5.1 },
      { name: 'Industry', share: 27.4, growth: 4.3 },
      { name: 'Agriculture', share: 14.4, growth: 2.8 },
    ],
    gdpSeries: [6120, 6380, 6690, 7010, 7340, 7280, 7710, 8150, 8490, 8580, 8940],
  },
  labour: {
    unemployment2025: 5.8, labourForce: 9.86, participation: 68.4,
    source: 'Kavaria Labour Force Survey 2025', year: 2025,
    byAge: [
      { group: '15–24', rate: 12.6 },
      { group: '25–34', rate: 6.4 },
      { group: '35–44', rate: 4.1 },
      { group: '45–54', rate: 3.8 },
      { group: '55+', rate: 4.9 },
    ],
    bySector: [
      { name: 'Services', share: 54.6 },
      { name: 'Industry', share: 24.1 },
      { name: 'Agriculture', share: 21.3 },
    ],
    unemploymentSeries: [7.4, 7.1, 6.8, 6.5, 6.2, 7.9, 7.2, 6.6, 6.2, 6.2, 5.8],
  },
  education: {
    literacy2025: 96.4, primary: 99.1, secondary: 91.3, tertiary: 42.8,
    source: 'Kavaria Education Statistics 2025', year: 2025,
    byLevel: [
      { level: 'Primary', enrolment: 99.1, completion: 97.8 },
      { level: 'Lower secondary', enrolment: 96.2, completion: 93.5 },
      { level: 'Upper secondary', enrolment: 91.3, completion: 86.4 },
      { level: 'Tertiary', enrolment: 42.8, completion: 38.9 },
    ],
    literacySeries: [93.1, 93.6, 94.0, 94.5, 94.9, 95.2, 95.5, 95.8, 96.0, 96.1, 96.4],
  },
  health: {
    lifeExpectancy2025: 74.6, infantMortality: 11.2, beds: 2.8, doctors: 1.9,
    source: 'Kavaria Health Statistics 2025', year: 2025,
    indicators: [
      { name: 'Life expectancy at birth', value: '74.6 years', year: 2025 },
      { name: 'Infant mortality', value: '11.2 per 1,000 live births', year: 2025 },
      { name: 'Under-5 mortality', value: '13.8 per 1,000 live births', year: 2025 },
      { name: 'Hospital beds', value: '2.8 per 1,000 people', year: 2025 },
      { name: 'Doctors', value: '1.9 per 1,000 people', year: 2025 },
      { name: 'Health spending', value: '6.4% of GDP', year: 2025 },
    ],
    lifeSeries: [71.8, 72.1, 72.4, 72.7, 73.0, 73.1, 73.5, 73.9, 74.2, 74.4, 74.6],
  },
  series: {
    population: [
      { year: 2015, value: 16.31 }, { year: 2016, value: 16.52 }, { year: 2017, value: 16.74 },
      { year: 2018, value: 16.97 }, { year: 2019, value: 17.21 }, { year: 2020, value: 17.44 },
      { year: 2021, value: 17.68 }, { year: 2022, value: 17.93 }, { year: 2023, value: 18.05 },
      { year: 2024, value: 18.23 }, { year: 2025, value: 18.42 },
    ],
  },
  releases: [
    { date: '14 Nov 2026', title: 'Consumer Price Index — October 2026', tag: 'Prices' },
    { date: '07 Nov 2026', title: 'Labour Force Survey — Q3 2026', tag: 'Labour' },
    { date: '24 Oct 2026', title: 'National Accounts — Q3 2026 (first estimate)', tag: 'Economy' },
    { date: '10 Oct 2026', title: 'Education Statistics 2025', tag: 'Education' },
    { date: '26 Sep 2026', title: 'Population Register Update 2025', tag: 'Population' },
  ],
};
