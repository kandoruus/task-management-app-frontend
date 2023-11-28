import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import React from 'react';

interface Props {
  open: boolean;
  closeDialog: () => void;
  question: string;
  response: (res: boolean) => void;
}

export const YesNoDialog: React.FC<Props> = (props: Props) => {
  const { open, closeDialog, question, response } = props;
  const handleYes = () => {
    response(true);
    closeDialog();
  };
  const handleNo = () => {
    response(false);
    closeDialog();
  };
  return (
    <Dialog open={open}>
      <DialogTitle>{question}</DialogTitle>
      <DialogActions>
        <Button onClick={handleYes}>Yes</Button>
        <Button onClick={handleNo}>No</Button>
      </DialogActions>
    </Dialog>
  );
};
