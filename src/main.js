import { calculatePower, defaultSelection, updateSelection, zombieParts } from './builder.js';

const welcomeScreen = document.querySelector('#welcome-screen');
const builderScreen = document.querySelector('#builder-screen');
const startButton = document.querySelector('#start-builder');
const partGroups = document.querySelector('#part-groups');
const selectedParts = document.querySelector('#selected-parts');
const powerRating = document.querySelector('#power-rating');
const zombiePreview = document.querySelector('#zombie-preview');

let selection = structuredClone(defaultSelection);

function renderPartControls() {
  partGroups.innerHTML = '';

  Object.entries(zombieParts).forEach(([slot, items]) => {
    const block = document.createElement('article');
    block.className = 'part-block';

    const label = document.createElement('label');
    label.setAttribute('for', `slot-${slot}`);
    label.textContent = `Слот: ${slot}`;

    const select = document.createElement('select');
    select.id = `slot-${slot}`;
    select.dataset.slot = slot;

    items.forEach((part) => {
      const option = document.createElement('option');
      option.value = part.id;
      option.textContent = `${part.name} (+${part.power})`;
      option.selected = part.id === selection[slot].id;
      select.append(option);
    });

    select.addEventListener('change', (event) => {
      selection = updateSelection(selection, slot, event.target.value);
      renderCurrentBuild();
    });

    block.append(label, select);
    partGroups.append(block);
  });
}

function renderPreviewCard(slot, part) {
  return `
    <article class="preview-card">
      <h4>${slot.toUpperCase()}</h4>
      <svg viewBox="0 0 220 120" role="img" aria-label="${part.name}">
        <defs>
          <linearGradient id="${part.id}-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="${part.art.primary}" />
            <stop offset="100%" stop-color="${part.art.secondary}" />
          </linearGradient>
        </defs>
        <rect x="6" y="6" width="208" height="108" rx="16" fill="url(#${part.id}-gradient)" />
        <circle cx="40" cy="60" r="22" fill="rgba(16, 13, 32, 0.45)" />
        <text x="40" y="68" text-anchor="middle" font-size="26" fill="#fff">${part.art.glyph}</text>
        <text x="78" y="54" font-size="12" fill="#f8f5ff">${part.name}</text>
        <text x="78" y="74" font-size="11" fill="#f8f5ff">Мощь +${part.power}</text>
      </svg>
    </article>
  `;
}

function renderCurrentBuild() {
  selectedParts.innerHTML = '';
  Object.entries(selection).forEach(([slot, part]) => {
    const li = document.createElement('li');
    li.textContent = `${slot}: ${part.name} (сила ${part.power})`;
    selectedParts.append(li);
  });

  zombiePreview.innerHTML = Object.entries(selection)
    .map(([slot, part]) => renderPreviewCard(slot, part))
    .join('');

  powerRating.textContent = `Общая мощь зомби: ${calculatePower(selection)}`;
}

startButton.addEventListener('click', () => {
  welcomeScreen.classList.add('hidden');
  builderScreen.classList.remove('hidden');
  renderPartControls();
  renderCurrentBuild();
});
