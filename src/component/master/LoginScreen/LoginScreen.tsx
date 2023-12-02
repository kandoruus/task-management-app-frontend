import React from 'react';
import './LoginScreen.css';
import { Box, Modal } from '@mui/material';
import { useModal } from 'app/hooks';

export const LoginScreen: React.FC = () => {
  const [open, toggleOpen] = useModal();
  return (
    <Modal open={open} onClose={toggleOpen}>
      <Box></Box>
    </Modal>
  );
};
