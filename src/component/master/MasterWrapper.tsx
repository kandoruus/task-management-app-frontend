import React from 'react';
import 'component/master/_styles.css';
import { Box } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { selectAppCtrl } from 'app/slices/appCtrlSlice';
import { MainHeader } from 'component/master/MainHeader';
import { PAGES } from 'helper/constants';

import { Outlet } from 'react-router-dom';

export const MasterWrapper: React.FC = () => {
  const { appFocus } = useAppSelector((state) => selectAppCtrl(state));

  return (
    <Box className="master-wrapper" data-testid="master-wrapper">
      {appFocus !== PAGES.AUTH && <MainHeader />}
      <Box className="master-container" data-testid="master-container">
        <Outlet />
      </Box>
    </Box>
  );
};
