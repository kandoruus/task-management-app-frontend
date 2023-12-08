import * as React from 'react';
import { screen } from '@testing-library/react';
import { AccountMasterPane } from './AccountMasterPane';
import { renderWithProviders } from 'helper/testUtils';
import { PAGES, COOKIES } from 'helper/constants';
import { setupStore } from 'app/store';
import { appCtrlSlice } from 'app/slices/appCtrlSlice';

let mockedUseCookies = () => {
  return { [COOKIES.LOGIN]: COOKIES.LOGIN };
};
const mockedNavigator = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigator,
}));
jest.mock('react-cookie', () => ({
  ...jest.requireActual('react-cookie'),
  useCookies: () => [mockedUseCookies()],
}));

describe('AccountMasterPane', () => {
  it('renders the account-master-pane', () => {
    const store = {
      ...setupStore({ appCtrl: { appFocus: PAGES.ACCOUNT } }),
      dispatch: jest.fn(),
    };
    renderWithProviders(<AccountMasterPane />, { store });
    expect(screen.getByTestId('account-master-pane')).toBeInTheDocument();
    expect(store.dispatch).not.toHaveBeenCalled();
    expect(mockedNavigator).not.toHaveBeenCalled();
  });
  it('dispatches focusAccount when appFocus is off ACCOUNT_PAGE', () => {
    const store = {
      ...setupStore({ appCtrl: { appFocus: PAGES.AUTH } }),
      dispatch: jest.fn(),
    };
    renderWithProviders(<AccountMasterPane />, { store });
    expect(store.dispatch).toHaveBeenCalledWith(
      appCtrlSlice.actions.focusAccount()
    );
  });
  it('navigates to WELCOME_ROUTE when the LOGIN_COOKIE is not set to LOGGED_IN_STATUS', () => {
    mockedUseCookies = () => {
      return { [COOKIES.LOGIN]: undefined };
    };
    renderWithProviders(<AccountMasterPane />, {
      preloadedState: { appCtrl: { appFocus: PAGES.ACCOUNT } },
    });
    expect(mockedNavigator).toHaveBeenCalledWith(PAGES.WELCOME);
  });
  it('TODO: Test page contents', () => {
    expect(true).toBe(false);
  });
});
