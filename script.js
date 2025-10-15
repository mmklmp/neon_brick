const grid = document.getElementById('grid');
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const filterButtons = document.getElementById('filterButtons');
const brand = document.getElementById('brand');
const hasResizeObserver = typeof ResizeObserver !== 'undefined';

const resizeObserver = hasResizeObserver
  ? new ResizeObserver(entries => {
      entries.forEach(entry => {
        const card = entry.target;
        if (card.hidden) return;
        updateCardSpan(card, entry.contentRect.height);
      });
    })
  : null;

/* PROJECT DATA — curated landscapes and deep space imagery only */
const PROJECTS = [
  { name: 'Aurora Basin', images: [
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80',
    'https://images.pexels.com/photos/998641/pexels-photo-998641.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1600',
    'https://images.pexels.com/photos/2156/sky-night-space-galaxy.jpg?auto=compress&cs=tinysrgb&dpr=2&w=1600'
  ]},
  { name: 'Glacial Mirror', images: [
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1600&q=80',
    'https://images.pexels.com/photos/314726/pexels-photo-314726.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1600',
    'https://images.pexels.com/photos/1192335/pexels-photo-1192335.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1600'
  ]},
  { name: 'Ocean Pulse', images: [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=1600&q=80',
    'https://images.pexels.com/photos/247478/pexels-photo-247478.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1600',
    'https://images.pexels.com/photos/39811/pexels-photo-39811.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1600'
  ]},
  { name: 'Silent Pines', images: [
    'https://images.pexels.com/photos/355241/pexels-photo-355241.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1600',
    'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1600',
    'https://images.pexels.com/photos/237705/pexels-photo-237705.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1600',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80'
  ]},
  { name: 'Cascade Hollow', images: [
    'https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?auto=compress&cs=tinysrgb&dpr=2&w=1600',
    'https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1600',
    'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1600&q=80',
    'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1600'
  ]},
  { name: 'Dune Horizon', images: [
    'https://images.unsplash.com/photo-1441829266145-6d4bfbd38eb4?auto=format&fit=crop&w=1600&q=80',
    'https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1600',
    'https://images.pexels.com/photos/462353/pexels-photo-462353.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1600',
    'https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1600'
  ]},
  { name: 'Summit Veil', images: [
    'https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=crop&w=1600&q=80',
    'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1600',
    'https://images.pexels.com/photos/1139648/pexels-photo-1139648.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1600',
    'https://images.unsplash.com/photo-1455218873509-8097305ee378?auto=format&fit=crop&w=1600&q=80'
  ]},
  { name: 'Forest Aura', images: [
    'https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1600',
    'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1600',
    'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1600',
    'https://images.pexels.com/photos/132037/pexels-photo-132037.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1600'
  ]},
  { name: 'Nebula Drift', images: [
    'https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&dpr=2&w=1600',
    'https://images.pexels.com/photos/847393/pexels-photo-847393.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1600',
    'https://images.pexels.com/photos/924824/pexels-photo-924824.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1600',
    'https://images.pexels.com/photos/1588349/pexels-photo-1588349.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1600'
  ]}
];

/* HELPERS */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function randomAccent() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue} 100% 55%)`;
}

function debounce(fn, wait = 150) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(null, args), wait);
  };
}

/* THEME */
function applyTheme(theme, { persist = true } = {}) {
  root.setAttribute('data-theme', theme);
  if (persist) {
    localStorage.setItem('theme', theme);
  }
  const isLight = theme === 'light';
  themeToggle.classList.toggle('is-light', isLight);
  themeToggle.setAttribute('aria-pressed', String(isLight));
  themeToggle.setAttribute('title', isLight ? 'Switch to dark theme' : 'Switch to light theme');
}

const savedTheme = localStorage.getItem('theme');
const initialTheme = savedTheme === 'light' ? 'light' : 'dark';
applyTheme(initialTheme, { persist: false });

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  const next = current === 'light' ? 'dark' : 'light';
  applyTheme(next);
});

/* NAV PANELS */
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const id = link.dataset.panel;
    document.querySelectorAll('.panel').forEach(p => {
      p.classList.toggle('open', p.id === id && !p.classList.contains('open'));
    });
  });
  link.addEventListener('mouseenter', () => link.style.setProperty('--accent', randomAccent()));
  link.addEventListener('mouseleave', () => link.style.removeProperty('--accent'));
});
brand.addEventListener('mouseenter', () => brand.style.setProperty('--accent', randomAccent()));
brand.addEventListener('mouseleave', () => brand.style.removeProperty('--accent'));

/* GRID CREATION */
function createCard(projectName, src) {
  const card = document.createElement('article');
  card.className = 'card';
  card.dataset.project = projectName;

  const img = document.createElement('img');
  img.src = src;
  img.alt = projectName;
  img.loading = 'lazy';

  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.textContent = projectName;

  card.appendChild(img);
  card.appendChild(overlay);
  prepareCard(card);
  return card;
}
function batchFromProjects(projects) {
  const items = [];
  projects.forEach(p => p.images.forEach(url => items.push({project: p.name, url})));
  return shuffle(items).map(i => createCard(i.project, i.url));
}
function renderInitial() {
  grid.innerHTML = '';
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
  const items = batchFromProjects(PROJECTS);
  const frag = document.createDocumentFragment();
  items.forEach(el => frag.appendChild(el));
  grid.appendChild(frag);
  items.forEach(registerCard);
  requestAnimationFrame(updateAllMasonry);
}
renderInitial();

/* INFINITE SCROLL (append randomized batches) */
let appending = false;
function maybeAppendMore() {
  if (appending) return;
  const nearBottom = window.scrollY + window.innerHeight >= document.body.scrollHeight - 800;
  if (!nearBottom) return;
  appending = true;
  const items = batchFromProjects(PROJECTS);
  const frag = document.createDocumentFragment();
  items.forEach(el => frag.appendChild(el));
  grid.appendChild(frag);
  items.forEach(registerCard);
  requestAnimationFrame(() => {
    updateAllMasonry();
    appending = false;
  });
}
window.addEventListener('scroll', maybeAppendMore, { passive: true });

/* FILTER BUTTONS */
function createFilterButton(label, token, projectName = '') {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'filter-btn';
  button.dataset.project = token;
  button.textContent = label;
  button.addEventListener('click', () => {
    const value = token === '*' ? '' : projectName;
    filterProject(value);
    setActiveFilter(token);
  });
  button.addEventListener('mouseenter', () => button.style.setProperty('--accent', randomAccent()));
  button.addEventListener('mouseleave', () => button.style.removeProperty('--accent'));
  return button;
}

function buildFilters() {
  filterButtons.innerHTML = '';
  filterButtons.appendChild(createFilterButton('All', '*'));
  PROJECTS.forEach(p => {
    filterButtons.appendChild(createFilterButton(p.name, p.name, p.name));
  });
  setActiveFilter('*');
}

function setActiveFilter(token) {
  filterButtons.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.project === token);
  });
}

function filterProject(name) {
  document.querySelectorAll('.card').forEach(card => {
    const match = !name || card.dataset.project === name;
    if (match) {
      card.hidden = false;
      registerCard(card);
    } else {
      card.hidden = true;
      card.style.gridRowEnd = 'span 1';
      if (resizeObserver) {
        resizeObserver.unobserve(card);
      }
    }
  });
  requestAnimationFrame(updateAllMasonry);
}

buildFilters();

/* MASONRY GRID HELPERS */
function chooseColumnSpan() {
  const roll = Math.random();
  if (roll > 0.88) return 3;
  if (roll > 0.52) return 2;
  return 1;
}

function prepareCard(card) {
  const span = chooseColumnSpan();
  card.style.gridColumn = `span ${span}`;
  card.style.gridRowEnd = 'span 1';
  const img = card.querySelector('img');
  const onLoad = () => requestAnimationFrame(updateAllMasonry);
  if (img.complete) {
    requestAnimationFrame(updateAllMasonry);
  } else {
    img.addEventListener('load', onLoad, { once: true });
    img.addEventListener('error', onLoad, { once: true });
  }
}

function registerCard(card) {
  if (resizeObserver) {
    resizeObserver.observe(card);
  } else {
    requestAnimationFrame(() => updateCardSpan(card));
  }
}

function getMasonryMetrics() {
  const styles = getComputedStyle(grid);
  const rowHeight = parseFloat(styles.getPropertyValue('--masonry-row-height')) || 1;
  const rowGap = parseFloat(styles.getPropertyValue('row-gap')) || 0;
  return { rowHeight, rowGap };
}

function updateCardSpan(card, measuredHeight) {
  const { rowHeight, rowGap } = getMasonryMetrics();
  const height = typeof measuredHeight === 'number' ? measuredHeight : card.getBoundingClientRect().height;
  if (!height) return;
  const span = Math.max(1, Math.ceil((height + rowGap) / (rowHeight + rowGap)));
  card.style.gridRowEnd = `span ${span}`;
}

function updateAllMasonry() {
  if (!grid) return;
  document.querySelectorAll('.card').forEach(card => {
    if (card.hidden) return;
    updateCardSpan(card);
  });
}

window.addEventListener('resize', debounce(() => {
  updateAllMasonry();
}, 200));
