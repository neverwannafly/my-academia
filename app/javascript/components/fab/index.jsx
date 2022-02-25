import React, { useCallback, useState } from 'react';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import Modal from './Modal';

function FAB({ mode }) {
  const [isOpen, setOpen] = useState(false);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <>
      <div
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
        }}
        className="fab"
      >
        <Fab
          color="secondary"
          aria-label="add"
          onClick={handleOpen}
        >
          <AddIcon />
        </Fab>
      </div>
      <Modal
        isOpen={isOpen}
        handleClose={handleClose}
        mode={mode}
      />
    </>
  );
}

export default FAB;
