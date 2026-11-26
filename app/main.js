// KAVSTAT router — hash routes, one page per indicator. No network, no fetch.
import { viewDashboard, viewPopulation, viewEconomy, viewLabour, viewEducation, viewHealth, viewSources, wireControls } from './views.js';

const ROUTES = {
  '/': { title: 'Dashboard', render: viewDashboard },
  '/population': { title: 'Population', render: viewPopulation },
  '/economy': { title: 'Economy', render: viewEconomy },
  '/labour': { title: 'Labour market', render: viewLabour },
  '/education': { title: 'Education', render: viewEducation },
  '/health': { title: 'Health', render: viewHealth },
  '/sources': { title: 'Sources & methods', render: viewSources },
};

function currentPath() {
  const hash = window.location.hash || '#/';
  const path = hash.slice(1) || '/';
  return ROUTES[path] ? path : '/';
}

export function render() {
  const path = currentPath();
  const view = document.getElementById('view');
  view.innerHTML = ROUTES[path].render();
  document.title = ROUTES[path].title + ' — KAVSTAT, National Statistics of Kavaria';
  document.querySelectorAll('nav a').forEach((a) => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + path);
    if (a.getAttribute('href') === '#' + path) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  wireControls();
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', render);
render();
