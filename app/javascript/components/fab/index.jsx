import React, { useState } from 'react';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import Modal from './Modal';

function FAB() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
        }}
        className="fab"
      >
        <Fab
          color="secondary"
          aria-label="add"
          onClick={() => setOpen(true)}
        >
          <AddIcon />
        </Fab>
      </div>
      <Modal
        isOpen={isOpen}
        handleClose={() => setOpen(false)}
      />
    </>
  );
}

export default FAB;
