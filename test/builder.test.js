import test from 'node:test';
import assert from 'node:assert/strict';

import { calculatePower, defaultSelection, updateSelection } from '../src/builder.js';

test('calculatePower returns total power', () => {
  assert.equal(calculatePower(defaultSelection), 15);
});

test('updateSelection changes selected part', () => {
  const updated = updateSelection(defaultSelection, 'arms', 'arms-kaiju');
  assert.equal(updated.arms.id, 'arms-kaiju');
  assert.equal(calculatePower(updated), 20);
});

test('selected parts contain visual metadata for preview cards', () => {
  assert.equal(typeof defaultSelection.head.art.primary, 'string');
  assert.equal(typeof defaultSelection.torso.art.secondary, 'string');
  assert.equal(typeof defaultSelection.legs.art.glyph, 'string');
});

test('updateSelection throws on invalid part', () => {
  assert.throws(() => updateSelection(defaultSelection, 'head', 'unknown-id'));
});
