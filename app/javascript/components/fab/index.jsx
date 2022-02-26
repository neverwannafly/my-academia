import React, { useCallback } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';

import { setFabClose, setFabOpen, setFabState } from '@app/store/fab';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import Modal from './Modal';

function FAB({ type }) {
  const { isOpen, mode } = useSelector((state) => state.fab);
  const dispatch = useDispatch();

  const handleOpen = useCallback(() => {
    batch(() => {
      dispatch(setFabOpen());
      dispatch(setFabState({ mode: 'create', type }));
    });
  }, [dispatch, type]);

  const handleClose = useCallback(() => (
    dispatch(setFabClose())
  ), [dispatch]);

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
        type={type}
      />
    </>
  );
}

export default FAB;
