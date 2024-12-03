import * as React from 'react';
import { screen, render } from '@testing-library/react';
import { ProtectedRoute } from '../ProtectedRoute';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('ProtectedRoute', () => {
  it('renders its child without calling useNavigate if isAuthenticated is true', () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route
            path="*"
            element={
              <ProtectedRoute redirectTo="test" isAuthenticated={true} />
            }
          >
            <Route path="*" element={<div>Outlet</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Outlet')).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
  it('calls useNavigate with redirectTo if isAuthenticated is false', () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route
            path="*"
            element={
              <ProtectedRoute redirectTo="test" isAuthenticated={false} />
            }
          >
            <Route path="*" element={<div>Outlet</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    expect(mockNavigate).toHaveBeenCalledWith('test');
  });
});
