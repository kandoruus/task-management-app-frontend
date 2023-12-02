import * as React from 'react';
//import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from 'helper/testUtils';
import { LoginScreen } from './LoginScreen';
import { setupStore } from 'app/store';

describe('LoginScreen', () => {
  const store = {
    ...setupStore(),
    dispatch: jest.fn(),
  };
  beforeEach(() => {
    renderWithProviders(<LoginScreen />, { store });
  });
  afterEach(() => {
    store.dispatch.mockClear();
  });
  it('TODO', () => {
    expect(true).toBe(true);
  });
});
