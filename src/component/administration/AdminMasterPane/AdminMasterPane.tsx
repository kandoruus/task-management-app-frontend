import React from 'react';
import { Box } from '@mui/material';
import './AdminMasterPane.css';

export const AdminMasterPane: React.FC = () => {
  return (
    <Box className="master-pane" data-testid="admin-master-pane">
      ADMINISTRATION
    </Box>
  );
};
