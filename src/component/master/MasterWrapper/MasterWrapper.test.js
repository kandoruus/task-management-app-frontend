import * as React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from 'helper/testUtils';
import { MasterWrapper } from './MasterWrapper';
import { HOME_PAGE, AUTH_PAGE } from 'helper/constants';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('MasterWrapper', () => {
  it('renders the master-container but not the main-header when the store is loaded with the appFocus on AUTH_PAGE', () => {
    renderWithProviders(<MasterWrapper />, {
      preloadedState: {
        appCtrl: {
          appFocus: AUTH_PAGE,
        },
      },
    });
    expect(screen.queryByTestId('main-header')).toBeNull();
    expect(screen.getByTestId('master-container')).toBeInTheDocument();
  });
  it('renders the master-container and the main-header when the store is loaded with the appFocus off AUTH_PAGE', () => {
    renderWithProviders(<MasterWrapper />, {
      preloadedState: {
        appCtrl: {
          appFocus: HOME_PAGE,
        },
      },
    });
    expect(screen.getByTestId('main-header')).toBeInTheDocument();
    expect(screen.getByTestId('master-container')).toBeInTheDocument();
  });
});
