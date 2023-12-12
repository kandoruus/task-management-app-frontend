import * as React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from 'helper/testUtils';
import { WelcomePage } from '../WelcomePage';
import { PAGES } from 'helper/constants';

const mockedNavigator = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigator,
}));

describe('WelcomePage', () => {
  beforeEach(() => {
    renderWithProviders(<WelcomePage />);
  });
  afterEach(() => {
    mockedNavigator.mockClear();
  });
  it('renders the welcome page', () => {
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });
  it('navigates to the login page when the login button is clicked', () => {
    fireEvent.click(screen.getByText('Login'));
    expect(mockedNavigator).toHaveBeenCalledWith(PAGES.LOGIN);
  });
  it('navigates to the signup page when the sign up button is clicked', () => {
    fireEvent.click(screen.getByText('Sign Up'));
    expect(mockedNavigator).toHaveBeenCalledWith(PAGES.SIGNUP);
  });
});
