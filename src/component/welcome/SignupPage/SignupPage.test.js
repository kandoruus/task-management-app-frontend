import * as React from 'react';
//import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from 'helper/testUtils';
import { SignupPage } from './SignupPage';
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
    renderWithProviders(<SignupPage />, { store });
  });
  afterEach(() => {
    store.dispatch.mockClear();
  });
  it('TODO:', () => {
    expect(true).toBe(false);
  });
});
