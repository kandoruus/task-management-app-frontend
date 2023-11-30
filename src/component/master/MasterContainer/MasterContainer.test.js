import * as React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from 'helper/testUtils';
import { MasterContainer } from './MasterContainer';
import { setupStore } from 'app/store';
import { appCtrlSlice } from 'app/appCtrlSlice';
import {
  ACCOUNT_PAGE,
  ADMIN_PAGE,
  SETTINGS_PAGE,
  TASKS_PAGE,
  TIMESHEET_PAGE,
} from 'helper/constants';

describe('MasterContainer', () => {
  describe('when the store is loaded with default values', () => {
    const store = {
      ...setupStore(),
      dispatch: jest.fn(),
    };
    beforeEach(() => {
      renderWithProviders(<MasterContainer />, { store });
    });
    afterEach(() => {
      store.dispatch.mockClear();
    });
    it('renders the header and the home page', () => {
      expect(screen.getByText('Task Management App')).toBeInTheDocument();
      expect(screen.getByTestId('main-menu-btn')).toBeInTheDocument();
      expect(screen.getByTestId('home-master-pane')).toBeInTheDocument();
    });
    it('dispatches no actions when the app header is clicked', () => {
      fireEvent.click(screen.getByText('Task Management App'));
      expect(store.dispatch).not.toHaveBeenCalled();
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
        expect(
          await screen.findByRole('menuitem', { name: /Settings/i })
        ).toBeInTheDocument();
        expect(
          await screen.findByRole('menuitem', { name: /Administration/i })
        ).toBeInTheDocument();
        expect(screen.queryByRole('menuitem', { name: /Home/i })).toBeNull();
      });
      it('dispatches the focusTasks action when the Tasks option is clicked', async () => {
        fireEvent.click(
          await screen.findByRole('menuitem', { name: /Tasks/i })
        );
        expect(store.dispatch).toHaveBeenCalledWith(
          appCtrlSlice.actions.focusTasks()
        );
      });
      it('dispatches the focusTimesheet action when the Timesheet option is clicked', async () => {
        fireEvent.click(
          await screen.findByRole('menuitem', { name: /Timesheet/i })
        );
        expect(store.dispatch).toHaveBeenCalledWith(
          appCtrlSlice.actions.focusTimesheet()
        );
      });
      it('dispatches the focusAccount action when the Account option is clicked', async () => {
        fireEvent.click(
          await screen.findByRole('menuitem', { name: /Account/i })
        );
        expect(store.dispatch).toHaveBeenCalledWith(
          appCtrlSlice.actions.focusAccount()
        );
      });
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
      });
    });
  });
  describe('when the store is loaded with the appFocus on Tasks', () => {
    const store = {
      ...setupStore({
        appCtrl: {
          appFocus: TASKS_PAGE,
        },
      }),
      dispatch: jest.fn(),
    };
    beforeEach(() => {
      renderWithProviders(<MasterContainer />, { store });
    });
    it('renders the tasks page', () => {
      expect(screen.getByTestId('tasklist-master-pane')).toBeInTheDocument();
    });
    it('dispatches the focusHome action when the app header is clicked', () => {
      fireEvent.click(screen.getByText('Task Management App'));
      expect(store.dispatch).toHaveBeenCalledWith(
        appCtrlSlice.actions.focusHome()
      );
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
        expect(
          await screen.findByRole('menuitem', { name: /Settings/i })
        ).toBeInTheDocument();
        expect(
          await screen.findByRole('menuitem', { name: /Administration/i })
        ).toBeInTheDocument();
        expect(screen.queryByRole('menuitem', { name: /Tasks/i })).toBeNull();
      });
      it('dispatches the focusHome action when the Home option is clicked', async () => {
        fireEvent.click(await screen.findByRole('menuitem', { name: /Home/i }));
        expect(store.dispatch).toHaveBeenCalledWith(
          appCtrlSlice.actions.focusHome()
        );
      });
    });
  });
  describe('when the store is loaded with the appFocus on Timesheet', () => {
    const store = {
      ...setupStore({
        appCtrl: {
          appFocus: TIMESHEET_PAGE,
        },
      }),
      dispatch: jest.fn(),
    };
    beforeEach(() => {
      renderWithProviders(<MasterContainer />, { store });
    });
    it('renders the timesheet page', () => {
      expect(screen.getByTestId('timesheet-master-pane')).toBeInTheDocument();
    });
    it('opens the menu and the Timesheet option is missing when the menu button is clicked', async () => {
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
      expect(
        await screen.findByRole('menuitem', { name: /Settings/i })
      ).toBeInTheDocument();
      expect(
        await screen.findByRole('menuitem', { name: /Administration/i })
      ).toBeInTheDocument();
      expect(screen.queryByRole('menuitem', { name: /Timesheet/i })).toBeNull();
    });
  });
  describe('when the store is loaded with the appFocus on Account', () => {
    const store = {
      ...setupStore({
        appCtrl: {
          appFocus: ACCOUNT_PAGE,
        },
      }),
      dispatch: jest.fn(),
    };
    beforeEach(() => {
      renderWithProviders(<MasterContainer />, { store });
    });
    it('renders the account page', () => {
      expect(screen.getByTestId('account-master-pane')).toBeInTheDocument();
    });
    it('opens the menu and the Account option is missing when the menu button is clicked', async () => {
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
        await screen.findByRole('menuitem', { name: /Settings/i })
      ).toBeInTheDocument();
      expect(
        await screen.findByRole('menuitem', { name: /Administration/i })
      ).toBeInTheDocument();
      expect(screen.queryByRole('menuitem', { name: /Account/i })).toBeNull();
    });
  });
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
      renderWithProviders(<MasterContainer />, { store });
    });
    it('renders the settings page', () => {
      expect(screen.getByTestId('settings-master-pane')).toBeInTheDocument();
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
      renderWithProviders(<MasterContainer />, { store });
    });
    it('renders the admin page', () => {
      expect(screen.getByTestId('admin-master-pane')).toBeInTheDocument();
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
  });
});
