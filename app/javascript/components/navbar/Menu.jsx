import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';

import { MENU_ITEMS } from '@app/constants/components';

function UserMenu() {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    isLoggedin,
    username,
  } = useSelector((state) => state.user);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = useCallback((onClick) => () => {
    setAnchorEl(null);
    if (onClick) {
      onClick({ history, dispatch });
    }
  }, [dispatch, history]);

  if (!isLoggedin) return null;

  return (
    <Box sx={{ flexGrow: 0, marginLeft: '2rem' }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
          <Avatar>{username[0]}</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '3.5rem' }}
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose()}
      >
        {MENU_ITEMS.map(({ label, onClick }) => (
          <MenuItem key={label} onClick={handleMenuClose(onClick)}>
            <Typography sx={{ width: '10rem' }} textAlign="left">{label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default UserMenu;
