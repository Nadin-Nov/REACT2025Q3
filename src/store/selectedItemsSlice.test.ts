import { mockValidCharacters } from '../__tests__/characters';

import reducer, {
  toggleSelect,
  unselectAll,
  type SelectedItem,
} from './selectedItemsSlice';

describe('selectedItemsSlice reducer', () => {
  const initialState = { items: [] };

  const mockItem: SelectedItem = {
    ...mockValidCharacters[0],
    detailsUrl: `/details/${mockValidCharacters[0].id}`,
  };

  test('should return the initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  test('should handle toggleSelect to add an item', () => {
    const nextState = reducer(initialState, toggleSelect(mockItem));
    expect(nextState.items).toHaveLength(1);
    expect(nextState.items[0]).toEqual(mockItem);
  });

  test('should handle toggleSelect to remove an existing item', () => {
    const stateWithItem = { items: [mockItem] };
    const nextState = reducer(stateWithItem, toggleSelect(mockItem));
    expect(nextState.items).toHaveLength(0);
  });

  test('should handle unselectAll to clear items', () => {
    const stateWithItem = { items: [mockItem] };
    const nextState = reducer(stateWithItem, unselectAll());
    expect(nextState.items).toHaveLength(0);
  });
});
