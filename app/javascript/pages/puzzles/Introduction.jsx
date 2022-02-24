import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { randomPuzzle } from '@app/store/puzzles';

function Introduction() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.puzzles);

  const afterFetch = useCallback((slug) => {
    history.push(`/puzzles/${slug}`);
  }, [history]);

  const handleClick = useCallback(() => {
    dispatch(randomPuzzle(afterFetch));
  }, [dispatch, afterFetch]);

  return (
    <Button
      variant="outlined"
      color="success"
      disabled={isLoading}
      onClick={handleClick}
    >
      {isLoading && (
        <CircularProgress
          size={20}
          color="success"
          sx={{
            marginRight: '1rem',
          }}
        />
      )}
      Start Solving Puzzles
    </Button>
  );
}

export default Introduction;
