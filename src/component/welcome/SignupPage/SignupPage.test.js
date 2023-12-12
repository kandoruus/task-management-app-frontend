import * as React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from 'helper/testUtils';
import { SignupPage } from './SignupPage';
import { setupStore } from 'app/store';
import { ERR_MSG, PAGES } from 'helper/constants';
import { signup } from 'app/slices/appCtrlSlice';

const mockedNavigator = jest.fn();
const mockedSendAlert = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigator,
}));
const store = {
  ...setupStore(),
  dispatch: jest.fn(),
};
const validPassword = 'validPassword';
const validUsername = 'validUsername';

describe('LoginPage', () => {
  beforeEach(() => {
    renderWithProviders(<SignupPage sendAlert={mockedSendAlert} />, { store });
  });
  afterEach(() => {
    store.dispatch.mockClear();
    mockedSendAlert.mockClear();
    mockedNavigator.mockClear();
  });
  it('renders the signup page', () => {
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByText('Already have an account?')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });
  it('navigates to the login page when the login button is clicked', () => {
    fireEvent.click(screen.getByText('Login'));
    expect(mockedNavigator).toHaveBeenCalledWith(PAGES.LOGIN);
  });
  describe('when the sign up button is clicked', () => {
    describe('when one of the input fields is blank', () => {
      beforeEach(() => {
        fireEvent.change(screen.getByLabelText('Username'), {
          target: { value: validUsername },
        });
        fireEvent.change(screen.getByLabelText('Password'), {
          target: { value: validPassword },
        });
        fireEvent.change(screen.getByLabelText('Confirm Password'), {
          target: { value: validPassword },
        });
      });
      it('sends the ERR_MSG.INPUT_IS_BLANK when the username field is blank', () => {
        fireEvent.change(screen.getByLabelText('Username'), {
          target: { value: '' },
        });
        fireEvent.click(screen.getByText('Sign Up'));
        expect(mockedSendAlert).toHaveBeenCalledWith(ERR_MSG.INPUT_IS_BLANK);
      });
      it('sends the ERR_MSG.INPUT_IS_BLANK when the password field is blank', () => {
        fireEvent.change(screen.getByLabelText('Password'), {
          target: { value: '' },
        });
        fireEvent.click(screen.getByText('Sign Up'));
        expect(mockedSendAlert).toHaveBeenCalledWith(ERR_MSG.INPUT_IS_BLANK);
      });
      it('sends the ERR_MSG.INPUT_IS_BLANK when the confirm username field is blank', () => {
        fireEvent.change(screen.getByLabelText('Confirm Password'), {
          target: { value: '' },
        });
        fireEvent.click(screen.getByText('Sign Up'));
        expect(mockedSendAlert).toHaveBeenCalledWith(ERR_MSG.INPUT_IS_BLANK);
      });
    });
    it('sends the message ERR_MSG.NOT_PWD_MATCH when the password does not match the confirm password', () => {
      fireEvent.change(screen.getByLabelText('Username'), {
        target: { value: validUsername },
      });
      fireEvent.change(screen.getByLabelText('Password'), {
        target: { value: validPassword },
      });
      fireEvent.change(screen.getByLabelText('Confirm Password'), {
        target: { value: 'differentPassword' },
      });
      fireEvent.click(screen.getByText('Sign Up'));
      expect(mockedSendAlert).toHaveBeenCalledWith(ERR_MSG.NOT_PWD_MATCH);
    });
    describe('when the input field has valid contents', () => {
      beforeEach(() => {
        fireEvent.change(screen.getByLabelText('Username'), {
          target: { value: validUsername },
        });
        fireEvent.change(screen.getByLabelText('Password'), {
          target: { value: validPassword },
        });
        fireEvent.change(screen.getByLabelText('Confirm Password'), {
          target: { value: validPassword },
        });
      });
      it('dispatches the signup action and sends the ERR_MSG.SIGNUP_FAILED message if the response is undefined', async () => {
        store.dispatch.mockReturnValueOnce({
          payload: undefined,
        });
        fireEvent.click(screen.getByText('Sign Up'));
        expect(store.dispatch.mock.calls[0][0].toString()).toEqual(
          signup({
            username: validUsername,
            password: validPassword,
          }).toString()
        );
        await waitFor(() =>
          expect(mockedSendAlert).toHaveBeenCalledWith(ERR_MSG.SIGNUP_FAILED)
        );
      });
      it('dispatches the signup action and sends the error message when the response status is not "success"', async () => {
        const mockedErrorMessage = 'mockedErrorMessage';
        store.dispatch.mockReturnValueOnce({
          payload: {
            message: mockedErrorMessage,
            status: 'error',
          },
        });
        fireEvent.click(screen.getByText('Sign Up'));

        expect(store.dispatch.mock.calls[0][0].toString()).toEqual(
          signup({
            username: validUsername,
            password: validPassword,
          }).toString()
        );
        await waitFor(() =>
          expect(mockedSendAlert).toHaveBeenCalledWith(mockedErrorMessage)
        );
      });
      it('dispatches the signup action, send the success message, and navigates to the login screen when the response status is success', async () => {
        const mockedSuccessMessage = 'mockedSuccessMessage';
        store.dispatch.mockReturnValueOnce({
          payload: {
            message: mockedSuccessMessage,
            status: 'error',
          },
        });
        fireEvent.click(screen.getByText('Sign Up'));
        expect(store.dispatch.mock.calls[0][0].toString()).toEqual(
          signup({
            username: validUsername,
            password: validPassword,
          }).toString()
        );
        await waitFor(() =>
          expect(mockedSendAlert).toHaveBeenCalledWith(mockedSuccessMessage)
        );
      });
    });
  });
});
