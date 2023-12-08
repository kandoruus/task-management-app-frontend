import * as React from 'react';
//import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from 'helper/testUtils';
import { LoginPage } from './LoginPage';
import { setupStore } from 'app/store';
const mockedNavigator = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigator,
}));
describe('LoginPage', () => {
  const store = {
    ...setupStore(),
    dispatch: jest.fn(),
  };
  beforeEach(() => {
    renderWithProviders(<LoginPage />, { store });
  });
  afterEach(() => {
    store.dispatch.mockClear();
  });
  it('TODO:', () => {
    expect(true).toBe(false);
  });
});
