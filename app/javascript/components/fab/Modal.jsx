import React, { useState } from 'react';

import { Modal, Paper } from '@mui/material';
import MdEditor from '@app/lib/MdEditor';

function FabModal({ isOpen, handleClose }) {
  const [value, setValue] = useState('');

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
    >
      <Paper
        elevation={3}
        style={{ width: '80%', margin: '0 auto', marginTop: '10rem' }}
        className="p-20"
      >
        <h1>Hello World</h1>
        <MdEditor value={value} setValue={setValue} />
      </Paper>
    </Modal>
  );
}

export default FabModal;
