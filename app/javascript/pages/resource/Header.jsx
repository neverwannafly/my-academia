import React, { useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { Breadcrumbs, Button, Typography } from '@mui/material';
import party from 'party-js';

function Header({ title, status }) {
  const ref = useRef();

  const handleClick = useCallback(() => {
    party.confetti(ref.current, {
      count: party.variation.range(20, 40),
      size: party.variation.range(1, 2),
      spread: party.variation.range(30, 80),
    });
  }, []);

  return (
    <div ref={ref} className="row space-between">
      <Breadcrumbs aria-label="breadcrumb">
        <Link className="primary-text" to="/">
          Home
        </Link>
        <Typography color="text.primary">{title}</Typography>
      </Breadcrumbs>
      {status === 'pending' && (
        <Button ref={ref} variant="contained" onClick={handleClick}>
          Mark as Complete
        </Button>
      )}
    </div>
  );
}

export default Header;
