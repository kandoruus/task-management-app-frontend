import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import 'component/tasks/_styles.css';
import { AppDispatch } from 'app/store';
import { AsyncThunkT } from 'helper/componentConfig';

interface Props {
  buttons: {
    id: string;
    value: string;
    action: AsyncThunkT;
  }[];
  title: string;
  dispatch: AppDispatch;
}

export const ControlBar: React.FC<Props> = ({ buttons, title, dispatch }) => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(menuAnchor);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  return (
    <Toolbar variant="dense" sx={{ minHeight: '34px', width: '100%' }}>
      <IconButton
        size="small"
        edge="start"
        onClick={handleMenuClick}
        aria-label="menu-btn"
      >
        <MenuIcon />
      </IconButton>
      <Menu anchorEl={menuAnchor} open={menuOpen} onClose={handleMenuClose}>
        {buttons.map((button) => (
          <MenuItem
            id={button.id}
            onClick={() => {
              handleMenuClose();
              dispatch(button.action());
            }}
            value={button.value}
            key={button.id}
          >
            {button.value}
          </MenuItem>
        ))}
      </Menu>
      <Typography noWrap variant="h6">
        {title}
      </Typography>
    </Toolbar>
  );
};
