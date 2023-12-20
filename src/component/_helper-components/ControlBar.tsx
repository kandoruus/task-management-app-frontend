import React, { PropsWithChildren, useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import 'component/tasks/_styles.css';
import { AppDispatch } from 'app/store';
import { MenuButtonConfig } from 'helper/componentConfig';

interface Props {
  buttons: MenuButtonConfig[];
  title: string;
  tooltipLabel?: string;
  dispatch: AppDispatch;
}

export const ControlBar: React.FC<PropsWithChildren<Props>> = ({
  buttons,
  title,
  tooltipLabel,
  dispatch,
  children,
}) => {
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
      <Tooltip
        title={tooltipLabel !== undefined ? tooltipLabel : ''}
        placement="bottom-start"
      >
        <IconButton
          size="small"
          edge="start"
          onClick={handleMenuClick}
          aria-label="menu-btn"
          sx={{ ml: '-5px', mr: '23px' }}
        >
          {children}
        </IconButton>
      </Tooltip>
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
