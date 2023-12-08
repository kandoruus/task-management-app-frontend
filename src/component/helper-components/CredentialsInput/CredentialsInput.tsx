import { VisibilityOff, Visibility } from '@mui/icons-material';
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import React, { useState } from 'react';

interface Props {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  isPassword?: boolean;
  label: string;
  id: string;
}

export const CredentialsInput: React.FC<Props> = ({
  input,
  setInput,
  isPassword = false,
  label,
  id,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          isPassword && (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={toggleShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }
        label={label}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
    </FormControl>
  );
};
