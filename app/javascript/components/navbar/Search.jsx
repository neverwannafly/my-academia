import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import {
  Menu, MenuItem, Avatar, Typography,
} from '@mui/material';
import debounce from 'lodash/debounce';
import { useDispatch, useSelector } from 'react-redux';
import { search } from '@app/store/classroom';

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

function SearchMenu({
  anchorEl,
  handleMenuClose,
  hide,
}) {
  const { searchables } = useSelector((state) => state.classroom);

  if (hide) {
    return null;
  }

  return (
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
      {searchables.length === 0 && (
        <p className="p-10">Nothing to show here! 🤔</p>
      )}
      {searchables.map(({
        id,
        title,
        commentable_type: commentableType,
        commentable_id: commentableId,
        profile_pic: profilePic,
      }) => (
        <MenuItem
          key={id}
          onClick={handleMenuClose(id, commentableId)}
          sx={{ whiteSpace: 'break-spaces' }}
        >
          <div className="row">
            <Avatar src={profilePic} />
            <div className="column m-l-10">
              <div className="m-b">{title}</div>
              <Typography color="primary">
                {commentableType ? 'Comment' : 'Resource'}
              </Typography>
            </div>
          </div>
        </MenuItem>
      ))}
    </Menu>
  );
}

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [hidden, setHidden] = useState(true);
  const searchRef = useRef();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleMenuClose = useCallback((id, commentableId) => () => {
    setHidden(true);
    if (id) {
      history.push(`/discuss/classroom_resource/${commentableId || id}`);
    }
  }, [history]);

  const handleApiRequest = useCallback(debounce((value) => {
    dispatch(search(value, () => setHidden(false), () => {}));
  }, 300), []);

  const handleSearch = useCallback((event) => {
    const { target: { value } } = event;

    setSearchTerm(value);
    handleApiRequest(value);
  }, [handleApiRequest]);

  return (
    <>
      <Search ref={searchRef}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          value={searchTerm}
          onChange={handleSearch}
        />
      </Search>
      <SearchMenu
        handleMenuClose={handleMenuClose}
        anchorEl={searchRef.current}
        hide={hidden}
      />
    </>
  );
}

export default SearchBar;
