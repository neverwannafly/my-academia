import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import NotificationsIcon from '@mui/icons-material/Notifications';
import { loadActivities } from '@app/store/activities';
import {
  Avatar, IconButton, Menu, MenuItem,
} from '@mui/material';
import parseActivity from '@app/utils/activities';

function Notification() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { data: { id } } = useSelector((state) => state.classroom);
  const { data } = useSelector((state) => state.activities);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleMenuClose = useCallback((link) => () => {
    setAnchorEl(null);
    if (link) {
      history.push(link);
    }
  }, [history]);

  useEffect(() => {
    dispatch(loadActivities(id));
  }, [dispatch, id]);

  return (
    <>
      <IconButton
        onClick={handleMenuOpen}
        className="m-r-5"
        component="span"
      >
        <NotificationsIcon sx={{ fontSize: 30 }} />
      </IconButton>
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
        {(!data || data.length === 0) && (
          <MenuItem sx={{ whiteSpace: 'break-spaces' }}>
            No notifications to show 🚀
          </MenuItem>
        )}
        {data.map((activity) => {
          const {
            text, link, profilePic, time, activityId,
          } = parseActivity(activity);
          return (
            <MenuItem
              key={activityId}
              onClick={handleMenuClose(link)}
              sx={{ whiteSpace: 'break-spaces' }}
            >
              <div className="row">
                <Avatar src={profilePic} />
                <div className="column m-l-10">
                  <div>{text}</div>
                  <div>
                    {time}
                    {' '}
                    ago
                  </div>
                </div>
              </div>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}

export default Notification;
