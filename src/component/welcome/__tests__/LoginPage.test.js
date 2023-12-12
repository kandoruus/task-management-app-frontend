import * as React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from 'helper/testUtils';
import { LoginPage } from '../LoginPage';
import { setupStore } from 'app/store';
import { COOKIES, ERR_MSG, PAGES } from 'helper/constants';
import { login } from 'app/slices/appCtrlSlice';

const mockedCookie = jest.fn();
const mockedSetCookie = jest.fn();
const mockedNavigator = jest.fn();
const sendAlert = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigator,
}));
jest.mock('react-cookie', () => ({
  ...jest.requireActual('react-cookie'),
  useCookies: () => [mockedCookie, mockedSetCookie],
}));
const store = {
  ...setupStore(),
  dispatch: jest.fn(),
};
const validUsername = 'validUsername';
const validPassword = 'validPassword';

describe('LoginPage', () => {
  beforeEach(() => {
    renderWithProviders(<LoginPage sendAlert={sendAlert} />, { store });
  });
  afterEach(() => {
    store.dispatch.mockClear();
    sendAlert.mockClear();
    mockedNavigator.mockClear();
    mockedSetCookie.mockClear();
  });
  it('renders the login page', () => {
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });
  it('navigates to the signup page when the signup button is clicked', () => {
    fireEvent.click(screen.getByText('Sign Up'));
    expect(mockedNavigator).toHaveBeenCalledWith(PAGES.SIGNUP);
  });
  it('sends the ERR_MSG.INPUT_IS_BLANK message when the login button is clicked and the username field is blank', () => {
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: validPassword },
    });
    fireEvent.click(screen.getByText('Login'));
    expect(sendAlert).toHaveBeenCalledWith(ERR_MSG.INPUT_IS_BLANK);
    expect(store.dispatch).not.toHaveBeenCalled();
  });
  it('sends the ERR_MSG.INPUT_IS_BLANK message when the login button is clicked and the password field is blank', () => {
    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: validUsername },
    });
    fireEvent.click(screen.getByText('Login'));
    expect(sendAlert).toHaveBeenCalledWith(ERR_MSG.INPUT_IS_BLANK);
    expect(store.dispatch).not.toHaveBeenCalled();
  });
  describe('when the password and username are valid and the login button is clicked', () => {
    beforeEach(() => {
      fireEvent.change(screen.getByLabelText('Username'), {
        target: { value: validUsername },
      });
      fireEvent.change(screen.getByLabelText('Password'), {
        target: { value: validPassword },
      });
    });
    it('dispatches the login action and sends the ERR_MSG.LOGIN_FAILED message if the response is undefined', async () => {
      store.dispatch.mockReturnValueOnce({
        payload: undefined,
      });
      fireEvent.click(screen.getByText('Login'));
      expect(store.dispatch.mock.calls[0][0].toString()).toEqual(
        login({ username: validUsername, password: validPassword }).toString()
      );
      await waitFor(() =>
        expect(sendAlert).toHaveBeenCalledWith(ERR_MSG.LOGIN_FAILED)
      );
    });
    it('dispatches the login action and sends the message if the response status is not "success"', async () => {
      const mockedErrorMessage = 'mockedErrorMessage';
      store.dispatch.mockReturnValueOnce({
        payload: {
          data: {
            message: mockedErrorMessage,
            username: '',
            sessionCode: '',
          },
          status: 'error',
        },
      });
      fireEvent.click(screen.getByText('Login'));

      expect(store.dispatch.mock.calls[0][0].toString()).toEqual(
        login({ username: validUsername, password: validPassword }).toString()
      );
      await waitFor(() =>
        expect(sendAlert).toHaveBeenCalledWith(mockedErrorMessage)
      );
    });
    it('dispatches the login action and sets the login and session data cookies when the response status is success', async () => {
      const mockedSessionCode = 'mockedSessionCode';
      store.dispatch.mockReturnValueOnce({
        payload: {
          data: {
            message: '',
            username: validUsername,
            sessionCode: mockedSessionCode,
          },
          status: 'success',
        },
      });
      fireEvent.click(screen.getByText('Login'));
      expect(store.dispatch.mock.calls[0][0].toString()).toEqual(
        login({ username: validUsername, password: validPassword }).toString()
      );
      await waitFor(() =>
        expect(mockedSetCookie).toHaveBeenCalledWith(
          COOKIES.LOGIN,
          COOKIES.LOGIN,
          { path: '/' }
        )
      );
      await waitFor(() =>
        expect(mockedSetCookie).toHaveBeenCalledWith(
          COOKIES.USERNAME,
          validUsername,
          { path: '/' }
        )
      );
      await waitFor(() =>
        expect(mockedSetCookie).toHaveBeenCalledWith(
          COOKIES.SESSIONCODE,
          mockedSessionCode,
          { path: '/' }
        )
      );
    });
  });
});
