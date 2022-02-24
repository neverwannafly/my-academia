import React from 'react';
import { Skeleton } from '@mui/material';

function Loader() {
  return (
    <>
      <Skeleton variant="rectangular" width="100%" height="4rem" />
      <p className="m-20" />
      <Skeleton animation="wave" variant="rectangular" width="100%" height="100%" />
    </>
  );
}

export default Loader;
