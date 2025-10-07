const grid = document.getElementById('grid');
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const dropdown = document.querySelector('.dropdown');
const showAll = document.getElementById('showAll');
const brand = document.getElementById('brand');

/* PROJECT DATA — 9 projects, 2–7 images each */
const PROJECTS = [
  { name: 'Project001', images: [
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1499084732479-de2c02d45fc4?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1520697222868-7b22f76b1d2b?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1535909339361-9b84b0d0a91a?q=80&w=1600&auto=format&fit=crop'
  ]},
  { name: 'Project002', images: [
    'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1516637090014-cb1ab0d08fc7?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1532634822-0444f2122541?q=80&w=1600&auto=format&fit=crop'
  ]},
  { name: 'Project003', images: [
    'https://images.unsplash.com/photo-1520962918287-7448c2878f65?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1600&auto=format&fit=crop'
  ]},
  { name: 'Project004', images: [
    'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1526814059966-542a8316e83c?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1520975693416-8f7880654e7b?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1508830524289-0adcbe822b40?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?q=80&w=1600&auto=format&fit=crop'
  ]},
  { name: 'Project005', images: [
    'https://images.unsplash.com/photo-1496307042754-00b4f2b91b0b?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509529711801-deac231925ac?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1495562569060-2eec283d3391?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1520975650623-7b1c7c5cf4b4?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1500534314210-9b3f0f9c5a2c?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1514890547357-a9ee9a20e46f?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1465420961937-e0eba4dda519?q=80&w=1600&auto=format&fit=crop'
  ]},
  { name: 'Project006', images: [
    'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1600&auto=format&fit=crop'
  ]},
  { name: 'Project007', images: [
    'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1520975732678-0f6155c9c6ad?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1500534314209-6b7c2673e1bf?q=80&w=1600&auto=format&fit=crop'
  ]},
  { name: 'Project008', images: [
    'https://images.unsplash.com/photo-1499084732479-c84f91e6c6bf?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1526483360412-f4dbaf036963?q=80&w=1600&auto=format&fit=crop'
  ]},
  { name: 'Project009', images: [
    'https://images.unsplash.com/photo-1508830524289-0adcbe822b40?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1520975485225-8b1d2e5a3f51?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop'
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

/* THEME */
const savedTheme = localStorage.getItem('theme');
if (savedTheme) root.setAttribute('data-theme', savedTheme);
themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  const next = current === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
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
  return card;
}
function batchFromProjects(projects) {
  const items = [];
  projects.forEach(p => p.images.forEach(url => items.push({project: p.name, url})));
  return shuffle(items).map(i => createCard(i.project, i.url));
}
function renderInitial() {
  grid.innerHTML = '';
  const items = batchFromProjects(PROJECTS);
  const frag = document.createDocumentFragment();
  items.forEach(el => frag.appendChild(el));
  grid.appendChild(frag);
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
  appending = false;
}
window.addEventListener('scroll', maybeAppendMore, { passive: true });

/* DROPDOWN BUILD + FILTERING */
function buildDropdown() {
  dropdown.innerHTML = '';
  PROJECTS.forEach(p => {
    const a = document.createElement('a');
    a.href = '#';
    a.textContent = p.name;
    a.dataset.project = p.name;
    a.addEventListener('click', e => {
      e.preventDefault();
      filterProject(p.name);
      setActiveDropdown(p.name);
    });
    a.addEventListener('mouseenter', () => a.style.setProperty('--accent', randomAccent()));
    a.addEventListener('mouseleave', () => a.style.removeProperty('--accent'));
    dropdown.appendChild(a);
  });
}
function setActiveDropdown(name) {
  dropdown.querySelectorAll('a').forEach(el => {
    el.classList.toggle('is-active', el.dataset.project === name);
  });
}
function filterProject(name) {
  document.querySelectorAll('.card').forEach(card => {
    card.style.display = name ? (card.dataset.project === name ? '' : 'none') : '';
  });
}
buildDropdown();

showAll.addEventListener('click', e => {
  e.preventDefault();
  filterProject('');
  setActiveDropdown(null);
});
showAll.addEventListener('mouseenter', () => showAll.style.setProperty('--accent', randomAccent()));
showAll.addEventListener('mouseleave', () => showAll.style.removeProperty('--accent'));

/* Keyboard: open/close dropdown with Enter/Space */
const projectsTrigger = document.getElementById('projectsTrigger');
projectsTrigger.tabIndex = 0;
projectsTrigger.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    const isOpen = getComputedStyle(dropdown).display !== 'none';
    dropdown.style.display = isOpen ? 'none' : 'block';
  }
});