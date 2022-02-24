import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import { unsetToast } from '@app/store/toast';

function ToastHandler() {
  const dispatch = useDispatch();
  const { message, type } = useSelector((state) => state.toast);

  const handleClose = useCallback(() => {
    dispatch(unsetToast());
  }, [dispatch]);

  if (!message || message.length === 0) {
    return null;
  }

  return (
    <Snackbar
      open={Boolean(message)}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <MuiAlert
        elevation={6}
        onClose={handleClose}
        severity={type}
        sx={{ width: '100%' }}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
}

export default ToastHandler;
