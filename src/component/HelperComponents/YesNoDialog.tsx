import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import React from 'react';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  question: string;
  response: (res: boolean) => void;
}

export const YesNoDialog: React.FC<Props> = (props: Props) => {
  const { open, setOpen, question, response } = props;
  const handleYes = () => {
    response(true);
    setOpen(false);
  };
  const handleNo = () => {
    response(false);
    setOpen(false);
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
