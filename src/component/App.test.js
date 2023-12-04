import * as React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from 'helper/testUtils';
import { App } from './App';
import { HOME_PAGE } from 'helper/constants';

describe('app', () => {
  describe('when the store is loaded with defaults', () => {
    it('renders the auth page when the store is loaded with defaults', () => {
      renderWithProviders(<App />);
      expect(screen.getByTestId('auth-page-wrapper')).toBeInTheDocument();
      expect(screen.queryByTestId('master-container')).toBeNull();
    });
    it('renders the MasterContainer when appFocus is off of AUTH_PAGE', () => {
      renderWithProviders(<App />, {
        preloadedState: {
          appCtrl: {
            appFocus: HOME_PAGE,
          },
        },
      });
      expect(screen.getByTestId('master-container')).toBeInTheDocument();
      expect(screen.queryByTestId('auth-page-wrapper')).toBeNull();
    });
  });
});
