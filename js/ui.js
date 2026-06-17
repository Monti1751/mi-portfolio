const backdrop = document.getElementById('modal-backdrop');
export const tooltip = document.getElementById('tooltip');

export function openModal(proj) {
  document.getElementById('modal-icon').textContent  = proj.icon;
  document.getElementById('modal-title').textContent = proj.title;
  document.getElementById('modal-type').textContent  = proj.type;
  document.getElementById('modal-desc').textContent  = proj.desc;

  const tagsEl = document.getElementById('modal-tags');
  tagsEl.innerHTML = proj.tags.map(t => `<span class="tag">${t}</span>`).join('');

  const linksEl = document.getElementById('modal-links');
  linksEl.innerHTML = '';

  if (proj.github) {
    const a = document.createElement('a');
    a.href = proj.github;
    a.className = 'btn btn-outline';
    a.textContent = '⭐ GitHub';
    a.target = '_blank';
    a.rel = 'noopener';
    linksEl.appendChild(a);
  }

  backdrop.classList.add('open');
}

export function isModalOpen() {
  return backdrop.classList.contains('open');
}

// Configuración de listeners nativos de cierre
document.getElementById('modal-close').addEventListener('click', () => backdrop.classList.remove('open'));
backdrop.addEventListener('click', e => {
  if (e.target === backdrop) backdrop.classList.remove('open');
});