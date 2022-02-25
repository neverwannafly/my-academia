import React from 'react';

import CommentForm from './CommentForm';
import ResourceForm from './ResourceForm';

function Form({ mode, handleClose }) {
  return (
    <div className="form">
      <h3>
        {mode === 'comment' ? 'Add Comment' : 'Create Resource'}
      </h3>
      {mode === 'comment' ? (
        <CommentForm handleClose={handleClose} />
      ) : (
        <ResourceForm handleClose={handleClose} />
      )}
    </div>
  );
}

export default Form;
