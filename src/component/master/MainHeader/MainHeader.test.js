import * as React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from 'helper/testUtils';
import { MainHeader } from './MainHeader';
import { setupStore } from 'app/store';
import { appCtrlSlice } from 'app/slices/appCtrlSlice';
import {
  ACCOUNT_PAGE,
  ACCOUNT_ROUTE,
  HOME_PAGE,
  HOME_ROUTE,
  LOGGED_OUT_STATUS,
  LOGIN_COOKIE,
  TASKS_PAGE,
  TASKS_ROUTE,
  TIMESHEET_PAGE,
  TIMESHEET_ROUTE,
} from 'helper/constants';

const mockedNavigator = jest.fn();
const mockedSetCookie = jest.fn();
const mockCookies = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigator,
}));

jest.mock('react-cookie', () => ({
  ...jest.requireActual('react-cookie'),
  useCookies: () => [mockCookies, mockedSetCookie],
}));

describe('MainHeader', () => {
  afterEach(() => {
    mockedNavigator.mockClear();
    mockedSetCookie.mockClear();
  });
  describe('when the store is loaded with the appFocus on Home', () => {
    const store = {
      ...setupStore({
        appCtrl: {
          appFocus: HOME_PAGE,
        },
      }),
      dispatch: jest.fn(),
    };
    beforeEach(() => {
      renderWithProviders(<MainHeader />, { store });
    });
    afterEach(() => {
      store.dispatch.mockClear();
    });
    it('renders the header', () => {
      expect(screen.getByText('Task Management App')).toBeInTheDocument();
      expect(screen.getByTestId('main-menu-btn')).toBeInTheDocument();
      expect(screen.getByText('Logout')).toBeInTheDocument();
    });
    it('dispatches no actions when the app header is clicked', () => {
      fireEvent.click(screen.getByText('Task Management App'));
      expect(store.dispatch).not.toHaveBeenCalled();
    });
    it('dispatches the logout action and updates the LOGIN_COOKIE when the Logout button is clicked', () => {
      fireEvent.click(screen.getByText('Logout'));
      expect(store.dispatch).toHaveBeenCalledWith(
        appCtrlSlice.actions.logout()
      );
      expect(mockedSetCookie).toHaveBeenCalledWith(
        LOGIN_COOKIE,
        LOGGED_OUT_STATUS,
        { path: '/' }
      );
    });
    describe('when the menu button is clicked', () => {
      beforeEach(() => {
        fireEvent.click(screen.getByTestId('main-menu-btn'));
      });
      it('opens the menu and the Home option is missing', async () => {
        expect(
          await screen.findByRole('menuitem', { name: /Tasks/i })
        ).toBeInTheDocument();
        expect(
          await screen.findByRole('menuitem', { name: /Timesheet/i })
        ).toBeInTheDocument();
        expect(
          await screen.findByRole('menuitem', { name: /Account/i })
        ).toBeInTheDocument();
        /* pushed to v3
        expect(
          await screen.findByRole('menuitem', { name: /Settings/i })
        ).toBeInTheDocument();
        expect(
          await screen.findByRole('menuitem', { name: /Administration/i })
        ).toBeInTheDocument();
        */
        expect(screen.queryByRole('menuitem', { name: /Home/i })).toBeNull();
      });
      it('navigates to TASK_ROUTES when the Tasks option is clicked', async () => {
        fireEvent.click(
          await screen.findByRole('menuitem', { name: /Tasks/i })
        );
        expect(mockedNavigator).toHaveBeenCalledWith(TASKS_ROUTE);
      });
      it('navigates to TIMESHEET_ROUTE action when the Timesheet option is clicked', async () => {
        fireEvent.click(
          await screen.findByRole('menuitem', { name: /Timesheet/i })
        );
        expect(mockedNavigator).toHaveBeenCalledWith(TIMESHEET_ROUTE);
      });
      it('navigates to ACCOUNT_ROUTE action when the Account option is clicked', async () => {
        fireEvent.click(
          await screen.findByRole('menuitem', { name: /Account/i })
        );
        expect(mockedNavigator).toHaveBeenCalledWith(ACCOUNT_ROUTE);
      });
      /* pushed to v3
      it('dispatches the focusSettings action when the Settings option is clicked', async () => {
        fireEvent.click(
          await screen.findByRole('menuitem', { name: /Settings/i })
        );
        expect(store.dispatch).toHaveBeenCalledWith(
          appCtrlSlice.actions.focusSettings()
        );
      });
      it('dispatches the focusAdmin action when the Administration option is clicked', async () => {
        fireEvent.click(
          await screen.findByRole('menuitem', { name: /Administration/i })
        );
        expect(store.dispatch).toHaveBeenCalledWith(
          appCtrlSlice.actions.focusAdmin()
        );
      });*/
    });
  });
  describe('when the store is loaded with the appFocus on Tasks', () => {
    beforeEach(() => {
      renderWithProviders(<MainHeader />, {
        preloadedState: {
          appCtrl: {
            appFocus: TASKS_PAGE,
          },
        },
      });
    });
    it('navigates to HOME_ROUTE when the app header is clicked', () => {
      fireEvent.click(screen.getByText('Task Management App'));
      expect(mockedNavigator).toHaveBeenCalledWith(HOME_ROUTE);
    });
    describe('when the menu button is clicked', () => {
      beforeEach(() => {
        fireEvent.click(screen.getByTestId('main-menu-btn'));
      });
      it('opens the menu and the Tasks option is missing', async () => {
        expect(
          await screen.findByRole('menuitem', { name: /Home/i })
        ).toBeInTheDocument();
        expect(
          await screen.findByRole('menuitem', { name: /Timesheet/i })
        ).toBeInTheDocument();
        expect(
          await screen.findByRole('menuitem', { name: /Account/i })
        ).toBeInTheDocument();
        /* pushed to v3
        expect(
          await screen.findByRole('menuitem', { name: /Settings/i })
        ).toBeInTheDocument();
        expect(
          await screen.findByRole('menuitem', { name: /Administration/i })
        ).toBeInTheDocument();*/
        expect(screen.queryByRole('menuitem', { name: /Tasks/i })).toBeNull();
      });
      it('navigates to HOME_ROUTE when the Home option is clicked', async () => {
        fireEvent.click(await screen.findByRole('menuitem', { name: /Home/i }));
        expect(mockedNavigator).toHaveBeenCalledWith(HOME_ROUTE);
      });
    });
  });
  describe('when the store is loaded with the appFocus on Timesheet', () => {
    it('opens the menu and the Timesheet option is missing when the menu button is clicked', async () => {
      renderWithProviders(<MainHeader />, {
        preloadedState: {
          appCtrl: {
            appFocus: TIMESHEET_PAGE,
          },
        },
      });
      fireEvent.click(screen.getByTestId('main-menu-btn'));
      expect(
        await screen.findByRole('menuitem', { name: /Home/i })
      ).toBeInTheDocument();
      expect(
        await screen.findByRole('menuitem', { name: /Tasks/i })
      ).toBeInTheDocument();
      expect(
        await screen.findByRole('menuitem', { name: /Account/i })
      ).toBeInTheDocument();
      /* pushed to v3
        expect(
          await screen.findByRole('menuitem', { name: /Settings/i })
        ).toBeInTheDocument();
        expect(
          await screen.findByRole('menuitem', { name: /Administration/i })
        ).toBeInTheDocument();*/
      expect(screen.queryByRole('menuitem', { name: /Timesheet/i })).toBeNull();
    });
  });
  describe('when the store is loaded with the appFocus on Account', () => {
    it('opens the menu and the Account option is missing when the menu button is clicked', async () => {
      renderWithProviders(<MainHeader />, {
        preloadedState: {
          appCtrl: {
            appFocus: ACCOUNT_PAGE,
          },
        },
      });
      fireEvent.click(screen.getByTestId('main-menu-btn'));
      expect(
        await screen.findByRole('menuitem', { name: /Home/i })
      ).toBeInTheDocument();
      expect(
        await screen.findByRole('menuitem', { name: /Tasks/i })
      ).toBeInTheDocument();
      expect(
        await screen.findByRole('menuitem', { name: /Timesheet/i })
      ).toBeInTheDocument();
      /* pushed to v3
        expect(
          await screen.findByRole('menuitem', { name: /Settings/i })
        ).toBeInTheDocument();
        expect(
          await screen.findByRole('menuitem', { name: /Administration/i })
        ).toBeInTheDocument();*/
      expect(screen.queryByRole('menuitem', { name: /Account/i })).toBeNull();
    });
  });
  /* pushed to v3
  describe('when the store is loaded with the appFocus on Settings', () => {
    const store = {
      ...setupStore({
        appCtrl: {
          appFocus: SETTINGS_PAGE,
        },
      }),
      dispatch: jest.fn(),
    };
    beforeEach(() => {
      renderWithProvidersAndRouter(<MainHeader />, { store });
    });
    it('opens the menu and the Settings option is missing when the menu button is clicked', async () => {
      fireEvent.click(screen.getByTestId('main-menu-btn'));
      expect(
        await screen.findByRole('menuitem', { name: /Home/i })
      ).toBeInTheDocument();
      expect(
        await screen.findByRole('menuitem', { name: /Tasks/i })
      ).toBeInTheDocument();
      expect(
        await screen.findByRole('menuitem', { name: /Timesheet/i })
      ).toBeInTheDocument();
      expect(
        await screen.findByRole('menuitem', { name: /Account/i })
      ).toBeInTheDocument();
      expect(
        await screen.findByRole('menuitem', { name: /Administration/i })
      ).toBeInTheDocument();
      expect(screen.queryByRole('menuitem', { name: /Settings/i })).toBeNull();
    });
  });
  describe('when the store is loaded with the appFocus on Administration', () => {
    const store = {
      ...setupStore({
        appCtrl: {
          appFocus: ADMIN_PAGE,
        },
      }),
      dispatch: jest.fn(),
    };
    beforeEach(() => {
      renderWithProvidersAndRouter(<MainHeader />, { store });
    });
    it('opens the menu and the Administration option is missing when the menu button is clicked', async () => {
      fireEvent.click(screen.getByTestId('main-menu-btn'));
      expect(
        await screen.findByRole('menuitem', { name: /Home/i })
      ).toBeInTheDocument();
      expect(
        await screen.findByRole('menuitem', { name: /Tasks/i })
      ).toBeInTheDocument();
      expect(
        await screen.findByRole('menuitem', { name: /Timesheet/i })
      ).toBeInTheDocument();
      expect(
        await screen.findByRole('menuitem', { name: /Account/i })
      ).toBeInTheDocument();
      expect(
        await screen.findByRole('menuitem', { name: /Settings/i })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole('menuitem', { name: /Administration/i })
      ).toBeNull();
    });
  });*/
});
