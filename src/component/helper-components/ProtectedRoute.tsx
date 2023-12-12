import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
interface Props {
  redirectTo: string;
  isAuthenticated: boolean;
}

export const ProtectedRoute: React.FC<Props> = ({
  redirectTo,
  isAuthenticated,
}) => {
  const navigate = useNavigate();
  if (!isAuthenticated) {
    navigate(redirectTo);
  }
  return <Outlet />;
};
