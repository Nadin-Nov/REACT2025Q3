import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import selectedItemsReducer from '../store/selectedItemsSlice';

export function renderWithProviders(
  ui: React.ReactElement,
  { route = '/' } = {}
) {
  const store = configureStore({
    reducer: {
      selectedItems: selectedItemsReducer,
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </Provider>
  );
}
