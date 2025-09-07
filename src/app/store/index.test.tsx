import { describe, it, expect } from 'vitest';

import { store } from './index';

describe('Redux store', () => {
  it('should have correct initial state for country slice', () => {
    const state = store.getState();
    expect(state.country.countries).toContain('USA');
  });

  it('should have correct initial state for forms slice', () => {
    const state = store.getState();
    expect(state.forms).toBeDefined();
  });
});
