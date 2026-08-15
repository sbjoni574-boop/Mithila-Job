// Mithila Job - App Logic

// ---------- Storage ----------
function getJobs() {
  const stored = JSON.parse(localStorage.getItem('mithilaJobs') || '[]');
  // user-posted jobs first, then samples
  return [...stored, ...SAMPLE_JOBS];
}

function saveUserJob(job) {
  const stored = JSON.parse(localStorage.getItem('mithilaJobs') || '[]');
  stored.unshift(job);
  localStorage.setItem('mithilaJobs', JSON.stringify(stored));
}

// ---------- Navigation ----------
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  document.getElementById('page-' + name).classList.remove('hidden');
  document.getElementById('mobileMenu').classList.add('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (name === 'jobs') renderJobs();
  if (name === 'home') renderHome();
}

function toggleMobileMenu() {
  document.getElementById('mobileMenu').classList.toggle('hidden');
}

// ---------- Rendering helpers ----------
const CAT_COLORS = {
  red: 'bg-red-50 text-red-600', blue: 'bg-blue-50 text-blue-600',
  green: 'bg-green-50 text-green-600', orange: 'bg-orange-50 text-orange-600',
  pink: 'bg-pink-50 text-pink-600', yellow: 'bg-yellow-50 text-yellow-600',
  gray: 'bg-gray-100 text-gray-600', purple: 'bg-purple-50 text-purple-600'
};

function categoryIcon(catName) {
  const c = CATEGORIES.find(c => c.name === catName) || CATEGORIES[CATEGORIES.length - 1];
  return c;
}

function jobCard(job) {
  const cat = categoryIcon(job.category);
  return `
  <div class="job-card bg-white rounded-2xl shadow p-5 border border-gray-100 cursor-pointer" onclick="openJob(${job.id})">
    <div class="flex items-start justify-between mb-3">
      <div class="w-12 h-12 rounded-xl ${CAT_COLORS[cat.color]} flex items-center justify-center text-xl">
        <i class="fa-solid ${cat.icon}"></i>
      </div>
      <span class="text-xs px-3 py-1 rounded-full ${job.type === 'Full Time' ? 'bg-green-50 text-green-700' : job.type === 'Part Time' ? 'bg-blue-50 text-blue-700' : 'bg-orange-50 text-orange-700'} font-semibold">${job.type}</span>
    </div>
    <h4 class="font-bold text-lg mb-1">${escapeHtml(job.title)}</h4>
    <p class="text-gray-500 text-sm mb-3"><i class="fa-solid fa-building mr-1"></i>${escapeHtml(job.company)}</p>
    <div class="flex flex-wrap gap-2 text-xs text-gray-600 mb-4">
      <span class="bg-gray-50 px-3 py-1.5 rounded-full"><i class="fa-solid fa-location-dot mr-1 text-mithila-red"></i>${job.location}</span>
      <span class="bg-gray-50 px-3 py-1.5 rounded-full"><i class="fa-solid fa-indian-rupee-sign mr-1 text-mithila-green"></i>${escapeHtml(job.salary)}</span>
    </div>
    <div class="flex items-center justify-between pt-3 border-t border-gray-100">
      <span class="text-xs text-gray-400"><i class="fa-regular fa-clock mr-1"></i>${job.postedAt}</span>
      <span class="text-mithila-red font-semibold text-sm">विवरण देखें <i class="fa-solid fa-arrow-right"></i></span>
    </div>
  </div>`;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

// ---------- Home ----------
function renderHome() {
  const jobs = getJobs();
  // stats
  animateCount('statJobs', jobs.length);
  animateCount('statCompanies', new Set(jobs.map(j => j.company)).size);
  animateCount('statLocations', LOCATIONS.length);
  animateCount('statCategories', CATEGORIES.length);
  // categories
  document.getElementById('categoryGrid').innerHTML = CATEGORIES.map(c => {
    const count = jobs.filter(j => j.category === c.name).length;
    return `
    <div class="category-card bg-white rounded-2xl shadow p-5 text-center" onclick="goCategory('${c.name}')">
      <div class="w-14 h-14 mx-auto rounded-full ${CAT_COLORS[c.color]} flex items-center justify-center text-2xl mb-3">
        <i class="fa-solid ${c.icon}"></i>
      </div>
      <h5 class="font-semibold text-sm mb-1">${c.name}</h5>
      <p class="text-xs text-gray-400">${count} नौकरियाँ</p>
    </div>`;
  }).join('');
  // latest 6 jobs
  document.getElementById('latestJobs').innerHTML = jobs.slice(0, 6).map(jobCard).join('');
}

function animateCount(id, target) {
  const el = document.getElementById(id);
  let cur = 0;
  const step = Math.max(1, Math.ceil(target / 30));
  const timer = setInterval(() => {
    cur += step;
    if (cur >= target) { cur = target; clearInterval(timer); }
    el.textContent = cur + (id === 'statJobs' ? '+' : '');
  }, 30);
}

function goCategory(cat) {
  showPage('jobs');
  document.getElementById('filterCategory').value = cat;
  renderJobs();
}

function heroSearchGo() {
  const q = document.getElementById('heroSearch').value;
  const loc = document.getElementById('heroLocation').value;
  showPage('jobs');
  document.getElementById('filterSearch').value = q;
  document.getElementById('filterLocation').value = loc;
  renderJobs();
}

// ---------- Jobs list ----------
function renderJobs() {
  const q = document.getElementById('filterSearch').value.toLowerCase().trim();
  const loc = document.getElementById('filterLocation').value;
  const cat = document.getElementById('filterCategory').value;
  const type = document.getElementById('filterType').value;

  const jobs = getJobs().filter(j => {
    const matchQ = !q || (j.title + ' ' + j.company + ' ' + j.description + ' ' + j.category).toLowerCase().includes(q);
    return matchQ && (!loc || j.location === loc) && (!cat || j.category === cat) && (!type || j.type === type);
  });

  document.getElementById('jobsCount').innerHTML = `<b>${jobs.length}</b> नौकरियाँ मिलीं`;
  document.getElementById('jobsList').innerHTML = jobs.map(jobCard).join('');
  document.getElementById('noJobs').classList.toggle('hidden', jobs.length > 0);
}

// ---------- Job detail modal ----------
function openJob(id) {
  const job = getJobs().find(j => j.id === id);
  if (!job) return;
  const cat = categoryIcon(job.category);
  document.getElementById('jobModalContent').innerHTML = `
    <div class="bg-gradient-to-r from-mithila-red to-mithila-orange text-white p-6 rounded-t-2xl relative">
      <button onclick="closeModal()" class="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 transition"><i class="fa-solid fa-xmark"></i></button>
      <div class="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center text-2xl mb-3"><i class="fa-solid ${cat.icon}"></i></div>
      <h3 class="text-2xl font-bold">${escapeHtml(job.title)}</h3>
      <p class="opacity-90 mt-1"><i class="fa-solid fa-building mr-1"></i>${escapeHtml(job.company)}</p>
    </div>
    <div class="p-6 space-y-4">
      <div class="grid grid-cols-2 gap-3 text-sm">
        <div class="bg-gray-50 rounded-xl p-3"><div class="text-gray-400 text-xs mb-1">जिला</div><b><i class="fa-solid fa-location-dot text-mithila-red mr-1"></i>${job.location}</b></div>
        <div class="bg-gray-50 rounded-xl p-3"><div class="text-gray-400 text-xs mb-1">सैलरी</div><b class="text-mithila-green">${escapeHtml(job.salary)}</b></div>
        <div class="bg-gray-50 rounded-xl p-3"><div class="text-gray-400 text-xs mb-1">प्रकार</div><b>${job.type}</b></div>
        <div class="bg-gray-50 rounded-xl p-3"><div class="text-gray-400 text-xs mb-1">योग्यता</div><b>${escapeHtml(job.qualification || 'कोई नहीं')}</b></div>
      </div>
      <div>
        <h5 class="font-bold mb-2">नौकरी का विवरण</h5>
        <p class="text-gray-600 text-sm leading-relaxed">${escapeHtml(job.description)}</p>
      </div>
      <div class="grid grid-cols-2 gap-3 pt-2">
        <a href="tel:${job.phone}" class="bg-mithila-green hover:bg-green-700 text-white text-center py-3 rounded-xl font-bold transition"><i class="fa-solid fa-phone mr-2"></i>Call करें</a>
        <a href="https://wa.me/91${job.phone}?text=${encodeURIComponent('नमस्ते, मैंने Mithila Job पर आपकी "' + job.title + '" की नौकरी देखी। मुझे इसमें रुचि है।')}" target="_blank" class="bg-[#25D366] hover:bg-green-600 text-white text-center py-3 rounded-xl font-bold transition"><i class="fa-brands fa-whatsapp mr-2"></i>WhatsApp</a>
      </div>
    </div>`;
  document.getElementById('jobModal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('jobModal').classList.add('hidden');
  document.body.style.overflow = '';
}

// ---------- Post job ----------
function submitJob(e) {
  e.preventDefault();
  const job = {
    id: Date.now(),
    title: document.getElementById('pj_title').value.trim(),
    company: document.getElementById('pj_company').value.trim(),
    location: document.getElementById('pj_location').value,
    category: document.getElementById('pj_category').value,
    type: document.getElementById('pj_type').value,
    salary: document.getElementById('pj_salary').value.trim(),
    qualification: document.getElementById('pj_qualification').value.trim(),
    phone: document.getElementById('pj_phone').value.trim(),
    description: document.getElementById('pj_description').value.trim(),
    postedAt: new Date().toISOString().slice(0, 10)
  };
  saveUserJob(job);
  document.getElementById('postJobForm').reset();
  showToast('✅ नौकरी सफलतापूर्वक पोस्ट हो गई!');
  setTimeout(() => showPage('jobs'), 800);
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.remove('hidden');
  setTimeout(() => t.classList.add('hidden'), 3000);
}

// ---------- Init ----------
function fillSelect(id, options, placeholder) {
  const el = document.getElementById(id);
  el.innerHTML = (placeholder ? `<option value="">${placeholder}</option>` : '') +
    options.map(o => `<option value="${o}">${o}</option>`).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  fillSelect('heroLocation', LOCATIONS, 'सभी जिले');
  fillSelect('filterLocation', LOCATIONS, 'सभी जिले');
  fillSelect('filterCategory', CATEGORIES.map(c => c.name), 'सभी श्रेणियाँ');
  fillSelect('pj_location', LOCATIONS, 'जिला चुनें');
  fillSelect('pj_category', CATEGORIES.map(c => c.name), 'श्रेणी चुनें');
  renderHome();
  // Enter key on hero search
  document.getElementById('heroSearch').addEventListener('keydown', e => {
    if (e.key === 'Enter') heroSearchGo();
  });
});
