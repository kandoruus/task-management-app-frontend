import * as React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { CredentialsInput } from './CredentialsInput';
import { renderWithProviders } from 'helper/testUtils';

describe('CredentialsInput', () => {
  describe('when the input is used as a password input', () => {
    const passwordInput = {
      input: 'Some password text',
      setInput: jest.fn(),
      isPassword: true,
      label: 'A Password Label',
      id: 'A Password id',
    };
    beforeEach(() => {
      renderWithProviders(<CredentialsInput {...passwordInput} />);
    });
    afterEach(() => {
      passwordInput.setInput.mockClear();
    });
    it('it renders the input', () => {
      const inputField = screen.getByLabelText(passwordInput.label);
      expect(inputField).toBeInTheDocument();
      expect(inputField).toHaveValue(passwordInput.input);
      expect(inputField.id).toEqual(passwordInput.id);
      expect(inputField.type).toEqual('password');
      expect(screen.getByTestId('VisibilityIcon')).toBeInTheDocument();
      expect(screen.queryByTestId('VisibilityOffIcon')).toBeNull();
    });
    it('it changes the input type and button icon when the visibility button is click', async () => {
      fireEvent.click(screen.getByRole('button'));
      expect(
        await screen.findByTestId('VisibilityOffIcon')
      ).toBeInTheDocument();
      expect(screen.queryByTestId('VisibilityIcon')).toBeNull();
      expect(screen.getByLabelText(passwordInput.label).type).toEqual('text');
    });
    it('it calls the setInput function when the value is changed', () => {
      const newInput = 'newInput';
      fireEvent.change(screen.getByLabelText(passwordInput.label), {
        target: { value: newInput },
      });
      expect(passwordInput.setInput).toHaveBeenCalledWith(newInput);
    });
  });
  describe('when the input is used as a non-password input', () => {
    const nonPasswordInput = {
      input: 'Some non-password text',
      setInput: jest.fn(),
      isPassword: false,
      label: 'A non-password Label',
      id: 'A non-password id',
    };
    beforeEach(() => {
      renderWithProviders(<CredentialsInput {...nonPasswordInput} />);
    });
    afterEach(() => {
      nonPasswordInput.setInput.mockClear();
    });
    it('it renders the input', () => {
      const inputField = screen.getByLabelText(nonPasswordInput.label);
      expect(inputField).toBeInTheDocument();
      expect(inputField).toHaveValue(nonPasswordInput.input);
      expect(inputField.id).toEqual(nonPasswordInput.id);
      expect(inputField.type).toEqual('text');
      expect(screen.queryByTestId('VisibilityIcon')).toBeNull();
      expect(screen.queryByTestId('VisibilityOffIcon')).toBeNull();
    });
    it('it calls the setInput function when the value is changed', () => {
      const newInput = 'newInput';
      fireEvent.change(screen.getByLabelText(nonPasswordInput.label), {
        target: { value: newInput },
      });
      expect(nonPasswordInput.setInput).toHaveBeenCalledWith(newInput);
    });
  });
});
