import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Alert } from '@mui/material';
import { loadQuote, toggleQuote } from '@app/store/quote';

function Quote() {
  const { data, isOpen } = useSelector((state) => state.quote);
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    dispatch(toggleQuote());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadQuote());
  }, [dispatch]);

  if (!isOpen || !data) {
    return null;
  }

  return (
    <Alert
      onClose={handleClick}
      severity="info"
      className="m-b-20"
    >
      {data || 'Something went wrong! Please try later'}
    </Alert>
  );
}

export default Quote;
