import { Box, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import React from 'react';

export interface PunchInputProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}
export const PunchInput: React.FC<PunchInputProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  disabled,
}) => {
  return (
    <Box sx={{ m: '10px auto', width: '35ch' }}>
      <FormControl sx={{ mt: '10px', width: '100%' }} variant="outlined">
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <OutlinedInput
          type={type}
          label={label}
          id={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
        ></OutlinedInput>
      </FormControl>
    </Box>
  );
};
