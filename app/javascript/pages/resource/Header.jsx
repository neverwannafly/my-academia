import React, { useRef, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import party from 'party-js';
import { Breadcrumbs, Button, Typography } from '@mui/material';
import { markCompleted } from '@app/store/resources';

function Header({ title, score }) {
  const ref = useRef();
  const dispatch = useDispatch();
  const { data: { id } } = useSelector((state) => state.classroom);
  const { resourceId } = useParams();

  const afterComplete = useCallback((userProgress) => {
    console.log(userProgress);
  }, []);

  const handleClick = useCallback(() => {
    dispatch(markCompleted(id, resourceId, afterComplete));
    party.confetti(ref.current, {
      count: party.variation.range(20, 40),
      size: party.variation.range(1, 2),
      spread: party.variation.range(30, 80),
    });
  }, [dispatch, id, resourceId, afterComplete]);

  return (
    <div ref={ref} className="row space-between">
      <Breadcrumbs aria-label="breadcrumb">
        <Link className="primary-text" to="/">
          Home
        </Link>
        <Typography color="text.primary">{title}</Typography>
      </Breadcrumbs>
      {!score && (
        <Button ref={ref} variant="contained" onClick={handleClick}>
          Mark as Complete
        </Button>
      )}
    </div>
  );
}

export default Header;
