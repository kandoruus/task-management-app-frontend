import * as React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { AccountMasterPane } from './AccountMasterPane';
import { renderWithProviders } from 'helper/testUtils';
import { PAGES, COOKIES, ERR_MSG } from 'helper/constants';
import { setupStore } from 'app/store';
import {
  appCtrlSlice,
  changePassword,
  deleteAccount,
} from 'app/slices/appCtrlSlice';
import { act } from 'react-dom/test-utils';

const mockedRemoveCookie = jest.fn();
const mockedSetCookie = jest.fn();
const mockedUseLoggedInCookies = () => {
  return {
    [COOKIES.LOGIN]: COOKIES.LOGIN,
  };
};
const mockedUseLoggedOutCookies = () => {
  return { [COOKIES.LOGIN]: undefined };
};
let mockedUseCookies = mockedUseLoggedInCookies;
const mockedNavigator = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigator,
}));
jest.mock('react-cookie', () => ({
  ...jest.requireActual('react-cookie'),
  useCookies: () => [mockedUseCookies(), mockedSetCookie, mockedRemoveCookie],
}));

describe('AccountMasterPane', () => {
  afterEach(() => {
    mockedSetCookie.mockClear();
    mockedRemoveCookie.mockClear();
  });
  describe('When loaded with the correct app data', () => {
    const store = {
      ...setupStore({ appCtrl: { appFocus: PAGES.ACCOUNT } }),
      dispatch: jest.fn(),
    };
    beforeEach(() => {
      renderWithProviders(<AccountMasterPane />, { store });
    });
    afterEach(() => {
      store.dispatch.mockClear();
    });
    it('renders the account-master-pane', () => {
      expect(screen.getByTestId('account-master-pane')).toBeInTheDocument();
      expect(screen.getByText('Account Settings')).toBeInTheDocument();
      expect(screen.getAllByText('Change Password')).toHaveLength(2);
      expect(screen.getAllByText('Old Password')).toHaveLength(2);
      expect(screen.getAllByText('New Password')).toHaveLength(2);
      expect(screen.getAllByText('Confirm New Password')).toHaveLength(2);
      expect(screen.getAllByText('Delete Account')).toHaveLength(2);
      expect(screen.getAllByText('Password')).toHaveLength(2);
      expect(store.dispatch).not.toHaveBeenCalled();
      expect(mockedNavigator).not.toHaveBeenCalled();
    });
    describe('when the Change Password button is clicked', () => {
      const oldPassword = 'oldPassword';
      const newPassword = 'newPassword';
      const notMatchingPassword = 'notMatchPassword';
      beforeEach(() => {
        fireEvent.change(screen.getByLabelText('Old Password'), {
          target: { value: oldPassword },
        });
        fireEvent.change(screen.getByLabelText('New Password'), {
          target: { value: newPassword },
        });
        fireEvent.change(screen.getByLabelText('Confirm New Password'), {
          target: { value: newPassword },
        });
      });
      it('sends the ERR_MSG.INPUT_IS_BLANK message when the old password field is blank', async () => {
        fireEvent.change(screen.getByLabelText('Old Password'), {
          target: { value: '' },
        });
        fireEvent.click(
          screen.getByRole('button', { name: /Change Password/i })
        );
        expect(
          await screen.findByText(ERR_MSG.INPUT_IS_BLANK)
        ).toBeInTheDocument();
        expect(store.dispatch).not.toHaveBeenCalled();
      });
      it('sends the ERR_MSG.INPUT_IS_BLANK message when the new password field is blank', async () => {
        fireEvent.change(screen.getByLabelText('New Password'), {
          target: { value: '' },
        });
        fireEvent.click(
          screen.getByRole('button', { name: /Change Password/i })
        );
        expect(
          await screen.findByText(ERR_MSG.INPUT_IS_BLANK)
        ).toBeInTheDocument();
        expect(store.dispatch).not.toHaveBeenCalled();
      });
      it('sends the ERR_MSG.INPUT_IS_BLANK message when the confirm new password field is blank', async () => {
        fireEvent.change(screen.getByLabelText('Confirm New Password'), {
          target: { value: '' },
        });
        fireEvent.click(
          screen.getByRole('button', { name: /Change Password/i })
        );
        expect(
          await screen.findByText(ERR_MSG.INPUT_IS_BLANK)
        ).toBeInTheDocument();
        expect(store.dispatch).not.toHaveBeenCalled();
      });
      it('sends the ERR_MSG.NOT_PWD_MATCH message when the new password field does not match the confirm new password field', async () => {
        fireEvent.change(screen.getByLabelText('Confirm New Password'), {
          target: { value: notMatchingPassword },
        });
        fireEvent.click(
          screen.getByRole('button', { name: /Change Password/i })
        );
        expect(
          await screen.findByText(ERR_MSG.NOT_PWD_MATCH)
        ).toBeInTheDocument();
        expect(store.dispatch).not.toHaveBeenCalled();
      });
      it('dispatches the changePassword action and sends the ERR_MSG.PWD_UPDATE_FAILED message if the response is undefined', async () => {
        store.dispatch.mockReturnValueOnce({ payload: undefined });
        act(() => {
          fireEvent.click(
            screen.getByRole('button', { name: /Change Password/i })
          );
        });
        expect(store.dispatch.mock.calls[0][0].toString()).toEqual(
          changePassword({ oldPassword, newPassword }).toString()
        );
        expect(
          await screen.findByText(ERR_MSG.PWD_UPDATE_FAILED)
        ).toBeInTheDocument();
      });
      it('dispatches the changePassword action and sends the res.message when the res.status is not "success"', async () => {
        const mockErrorMessage = 'mockErrorMessage';
        store.dispatch.mockReturnValueOnce({
          payload: { message: mockErrorMessage, status: 'error' },
        });
        act(() => {
          fireEvent.click(
            screen.getByRole('button', { name: /Change Password/i })
          );
        });
        expect(store.dispatch.mock.calls[0][0].toString()).toEqual(
          changePassword({ oldPassword, newPassword }).toString()
        );
        expect(await screen.findByText(mockErrorMessage)).toBeInTheDocument();
      });
      it('dispatches the changePassword action, sends the res.message, and clears the inputs when the res.status is success', async () => {
        const mockSuccessMessage = 'mockSuccessMessage';
        store.dispatch.mockReturnValueOnce({
          payload: { message: mockSuccessMessage, status: 'success' },
        });
        act(() => {
          fireEvent.click(
            screen.getByRole('button', { name: /Change Password/i })
          );
        });
        expect(store.dispatch.mock.calls[0][0].toString()).toEqual(
          changePassword({ oldPassword, newPassword }).toString()
        );
        expect(await screen.findByText(mockSuccessMessage)).toBeInTheDocument();
        expect(screen.getByLabelText('Old Password')).toHaveValue('');
        expect(screen.getByLabelText('New Password')).toHaveValue('');
        expect(screen.getByLabelText('Confirm New Password')).toHaveValue('');
      });
    });
    describe('when the Delete Account button is clicked', () => {
      it('sends the ERR_MSG.INPUT_IS_BLANK message when the password field is blank', async () => {
        fireEvent.change(screen.getByLabelText('Password'), {
          target: { value: '' },
        });
        fireEvent.click(
          screen.getByRole('button', { name: /Delete Account/i })
        );
        expect(
          await screen.findByText(ERR_MSG.INPUT_IS_BLANK)
        ).toBeInTheDocument();
        expect(store.dispatch).not.toHaveBeenCalled();
      });
      describe('when the password field contains a valid value', () => {
        const validPassword = 'validPassword';
        beforeEach(() => {
          fireEvent.change(screen.getByLabelText('Password'), {
            target: { value: validPassword },
          });
        });
        it('dispatches the deleteAccount action and sends the ERR_MSG.DELETE_ACC_FAILED message when the response is undefined', async () => {
          store.dispatch.mockReturnValueOnce({ payload: undefined });
          fireEvent.click(
            screen.getByRole('button', { name: /Delete Account/i })
          );
          expect(
            await screen.findByText(ERR_MSG.DELETE_ACC_FAILED)
          ).toBeInTheDocument();
          expect(store.dispatch.mock.calls[0][0].toString()).toEqual(
            deleteAccount({ password: validPassword }).toString()
          );
        });
        it('dispatches the deleteAccount action and sends the res.message with the res.status is not "success"', async () => {
          const mockErrorMessage = 'mockErrorMessage';
          store.dispatch.mockReturnValueOnce({
            payload: { message: mockErrorMessage, status: 'error' },
          });
          fireEvent.click(
            screen.getByRole('button', { name: /Delete Account/i })
          );
          expect(await screen.findByText(mockErrorMessage)).toBeInTheDocument();
          expect(store.dispatch.mock.calls[0][0].toString()).toEqual(
            changePassword({ password: validPassword }).toString()
          );
        });
        it('dispatches the deleteAccount action, sends the res.message, clears the password field, and deletes the login cookie with the res.status is success', async () => {
          const mockSuccessMessage = 'mockSuccessMessage';
          store.dispatch.mockReturnValueOnce({
            payload: { message: mockSuccessMessage, status: 'success' },
          });
          fireEvent.click(
            screen.getByRole('button', { name: /Delete Account/i })
          );
          expect(
            await screen.findByText(mockSuccessMessage)
          ).toBeInTheDocument();
          expect(store.dispatch.mock.calls[0][0].toString()).toEqual(
            changePassword({ password: validPassword }).toString()
          );
          expect(screen.getByLabelText('Password')).toHaveValue('');
          expect(mockedRemoveCookie).toHaveBeenCalledWith(COOKIES.LOGIN, {
            path: '/',
          });
        });
      });
    });
  });

  describe('when loaded with incorrect app data', () => {
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
      mockedUseCookies = mockedUseLoggedOutCookies;
      renderWithProviders(<AccountMasterPane />, {
        preloadedState: { appCtrl: { appFocus: PAGES.ACCOUNT } },
      });
      expect(mockedNavigator).toHaveBeenCalledWith(PAGES.WELCOME);
      mockedUseCookies = mockedUseLoggedInCookies;
    });
  });
});
