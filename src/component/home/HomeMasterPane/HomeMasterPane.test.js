import * as React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { HomeMasterPane } from './HomeMasterPane';
import { appCtrlSlice } from 'app/slices/appCtrlSlice';
import { renderWithProviders } from 'helper/testUtils';
import {
  ACCOUNT_ROUTE,
  AUTH_PAGE,
  HOME_PAGE,
  LOGGED_IN_STATUS,
  LOGGED_OUT_STATUS,
  LOGIN_COOKIE,
  TASKS_ROUTE,
  TIMESHEET_ROUTE,
  WELCOME_ROUTE,
} from 'helper/constants';
import { setupStore } from 'app/store';

let mockedUseCookies = () => {
  return { [LOGIN_COOKIE]: LOGGED_IN_STATUS };
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

describe('HomeMasterPane', () => {
  afterEach(() => {
    mockedNavigator.mockClear();
  });
  describe('when opened with the appFocus on HOME_PAGE and the status set to LOGGED_IN_STATUS', () => {
    beforeEach(() => {
      renderWithProviders(<HomeMasterPane />, {
        preloadedState: { appCtrl: { appFocus: HOME_PAGE } },
      });
    });
    it('renders the home page', () => {
      expect(
        screen.getByText('Welcome to the Task Management App!')
      ).toBeInTheDocument();
      expect(screen.getByText('Tasks')).toBeInTheDocument();
      expect(screen.getByText('Timesheet')).toBeInTheDocument();
      expect(screen.getByText('Account')).toBeInTheDocument();
      expect(mockedNavigator).not.toHaveBeenCalled();
    });
    it('navigates to TASKS_ROUTE when the Tasks button is clicked', () => {
      fireEvent.click(screen.getByText('Tasks'));
      expect(mockedNavigator).toHaveBeenCalledWith(TASKS_ROUTE);
    });
    it('navigates to TIMESHEET_ROUTE when the Timesheet button is clicked', () => {
      fireEvent.click(screen.getByText('Timesheet'));
      expect(mockedNavigator).toHaveBeenCalledWith(TIMESHEET_ROUTE);
    });
    it('navigates to ACCOUNT_ROUTE when the Account button is clicked', () => {
      fireEvent.click(screen.getByText('Account'));
      expect(mockedNavigator).toHaveBeenCalledWith(ACCOUNT_ROUTE);
    });
  });
  describe('when opened with the appFocus off HOME_PAGE', () => {
    it('dispatches the focusHome action', () => {
      const store = {
        ...setupStore({ appCtrl: { appFocus: AUTH_PAGE } }),
        dispatch: jest.fn(),
      };
      renderWithProviders(<HomeMasterPane />, { store });
      expect(store.dispatch).toHaveBeenCalledWith(
        appCtrlSlice.actions.focusHome()
      );
    });
  });
  describe('when opened with the status not set to LOGGED_IN_STATUS', () => {
    it('navigates to WELCOME_ROUTE', () => {
      mockedUseCookies = () => {
        return { [LOGIN_COOKIE]: LOGGED_OUT_STATUS };
      };
      const store = {
        ...setupStore({ appCtrl: { appFocus: HOME_PAGE } }),
      };
      renderWithProviders(<HomeMasterPane />, { store });
      expect(mockedNavigator).toHaveBeenCalledWith(WELCOME_ROUTE);
    });
  });
});
