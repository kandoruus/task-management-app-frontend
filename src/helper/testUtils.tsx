//this util file setup was copied from https://redux.js.org/usage/writing-tests
import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import type { PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { setupStore } from '../app/store';
import type { AppStore, RootState } from '../app/store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export const getMockTasklist = (tasklistLength: number) => {
  const mockTasklist = [];
  for (let i = 0; i < tasklistLength; i++) {
    mockTasklist.push({
      _id: 'mock _id ' + i,
      data: {
        name: 'mock name ' + i,
        description: 'mock description ' + i,
        status: 'Not Started',
        priority: 'Low',
      },
      __v: 0,
    });
  }
  return mockTasklist;
};
