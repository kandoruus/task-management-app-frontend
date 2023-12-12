import * as React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from 'helper/testUtils';
import { MainHeader } from '../MainHeader';
import { setupStore } from 'app/store';
import { logout } from 'app/slices/appCtrlSlice';
import { PAGES, COOKIES } from 'helper/constants';

const mockedNavigator = jest.fn();
const mockedSetCookie = jest.fn();
const mockedRemoveCookie = jest.fn();
const mockCookies = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigator,
}));

jest.mock('react-cookie', () => ({
  ...jest.requireActual('react-cookie'),
  useCookies: () => [mockCookies, mockedSetCookie, mockedRemoveCookie],
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
          appFocus: PAGES.HOME,
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
      expect(store.dispatch.mock.calls[0][0].toString()).toEqual(
        logout().toString()
      );
      expect(mockedRemoveCookie).toHaveBeenCalledWith(COOKIES.LOGIN, {
        path: '/',
      });
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
        expect(mockedNavigator).toHaveBeenCalledWith(PAGES.TASKS);
      });
      it('navigates to TIMESHEET_ROUTE action when the Timesheet option is clicked', async () => {
        fireEvent.click(
          await screen.findByRole('menuitem', { name: /Timesheet/i })
        );
        expect(mockedNavigator).toHaveBeenCalledWith(PAGES.TIMESHEET);
      });
      it('navigates to ACCOUNT_ROUTE action when the Account option is clicked', async () => {
        fireEvent.click(
          await screen.findByRole('menuitem', { name: /Account/i })
        );
        expect(mockedNavigator).toHaveBeenCalledWith(PAGES.ACCOUNT);
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
            appFocus: PAGES.TASKS,
          },
        },
      });
    });
    it('navigates to HOME_ROUTE when the app header is clicked', () => {
      fireEvent.click(screen.getByText('Task Management App'));
      expect(mockedNavigator).toHaveBeenCalledWith(PAGES.HOME);
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
        expect(mockedNavigator).toHaveBeenCalledWith(PAGES.HOME);
      });
    });
  });
  describe('when the store is loaded with the appFocus on Timesheet', () => {
    it('opens the menu and the Timesheet option is missing when the menu button is clicked', async () => {
      renderWithProviders(<MainHeader />, {
        preloadedState: {
          appCtrl: {
            appFocus: PAGES.TIMESHEET,
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
            appFocus: PAGES.ACCOUNT,
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
