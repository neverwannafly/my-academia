import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';

import Menu from './Menu';
import Search from './Search';
import { HEADER_ITEMS } from '@app/constants/components';

function Header() {
  const history = useHistory();
  const { data: { title } } = useSelector((state) => state.classroom);

  return (
    <Box sx={{ zIndex: 101 }}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <div className="row" style={{ alignItems: 'center' }}>
              <div
                className="pointer"
                role="presentation"
                onClick={() => history.push('/')}
              >
                {title || 'My Classroom'}
              </div>
              {HEADER_ITEMS.map(({ url, label }) => (
                <div
                  key={label}
                  className="pointer m-l-10"
                  style={{ fontSize: '1rem' }}
                  role="presentation"
                  onClick={() => history.push(url)}
                >
                  {label}
                </div>
              ))}
            </div>
          </Typography>
          <Search />
          <Menu />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
