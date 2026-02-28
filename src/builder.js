export const zombieParts = {
  head: [
    {
      id: 'head-scout',
      name: 'Голова: Разведчик "Токио"',
      power: 4,
      art: { primary: '#8b5cf6', secondary: '#f5d0fe', glyph: '◉' },
    },
    {
      id: 'head-onyx',
      name: 'Голова: Onyx-idol',
      power: 6,
      art: { primary: '#4c1d95', secondary: '#c4b5fd', glyph: '◈' },
    },
    {
      id: 'head-mecha',
      name: 'Голова: Mecha-Neko',
      power: 8,
      art: { primary: '#7c3aed', secondary: '#fde68a', glyph: '⬢' },
    },
  ],
  torso: [
    {
      id: 'torso-school',
      name: 'Торс: Школьная броня',
      power: 4,
      art: { primary: '#0369a1', secondary: '#bae6fd', glyph: '▣' },
    },
    {
      id: 'torso-night',
      name: 'Торс: Ночной полк',
      power: 7,
      art: { primary: '#155e75', secondary: '#99f6e4', glyph: '▦' },
    },
    {
      id: 'torso-arena',
      name: 'Торс: Арена титанов',
      power: 9,
      art: { primary: '#0f766e', secondary: '#5eead4', glyph: '▩' },
    },
  ],
  arms: [
    {
      id: 'arms-ribbon',
      name: 'Руки: Ribbon claws',
      power: 3,
      art: { primary: '#be123c', secondary: '#fecdd3', glyph: '✦' },
    },
    {
      id: 'arms-cyclone',
      name: 'Руки: Cyclone blades',
      power: 6,
      art: { primary: '#e11d48', secondary: '#fda4af', glyph: '✶' },
    },
    {
      id: 'arms-kaiju',
      name: 'Руки: Kaiju breaker',
      power: 8,
      art: { primary: '#9f1239', secondary: '#f43f5e', glyph: '✹' },
    },
  ],
  legs: [
    {
      id: 'legs-runner',
      name: 'Ноги: Runner feet',
      power: 4,
      art: { primary: '#15803d', secondary: '#bbf7d0', glyph: '⬣' },
    },
    {
      id: 'legs-moon',
      name: 'Ноги: Moon jump',
      power: 6,
      art: { primary: '#166534', secondary: '#86efac', glyph: '⬡' },
    },
    {
      id: 'legs-thunder',
      name: 'Ноги: Thunder drive',
      power: 8,
      art: { primary: '#14532d', secondary: '#4ade80', glyph: '⬟' },
    },
  ],
};

export const defaultSelection = {
  head: zombieParts.head[0],
  torso: zombieParts.torso[0],
  arms: zombieParts.arms[0],
  legs: zombieParts.legs[0],
};

export function calculatePower(selection) {
  return Object.values(selection).reduce((sum, part) => sum + part.power, 0);
}

export function updateSelection(selection, slot, partId) {
  const part = zombieParts[slot].find((item) => item.id === partId);
  if (!part) {
    throw new Error(`Неизвестная часть для слота ${slot}: ${partId}`);
  }

  return {
    ...selection,
    [slot]: part,
  };
}
