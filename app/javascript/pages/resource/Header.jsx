import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

import { Breadcrumbs, Button, Typography } from '@mui/material';
import party from 'party-js';
import { useCallback } from 'react';

function Header({ title, type }) {
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
      {!type && (
        <Button ref={ref} variant="contained" onClick={handleClick}>
          Mark as Complete
        </Button>
      )}
    </div>
  );
}

export default Header;
