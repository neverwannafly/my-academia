import React from 'react';

import { Modal, Paper } from '@mui/material';
import Form from './forms/index.jsx';

function FabModal({
  isOpen,
  handleClose,
  mode,
  type,
}) {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
    >
      <Paper
        elevation={3}
        style={{ width: '80%', margin: '0 auto', marginTop: '1rem' }}
        className="p-20"
      >
        <Form
          handleClose={handleClose}
          mode={mode}
          type={type}
        />
      </Paper>
    </Modal>
  );
}

export default FabModal;
