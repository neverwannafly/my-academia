import React from 'react';

import CommentForm from './CommentForm';
import ResourceForm from './ResourceForm';

function Form({ type, mode, handleClose }) {
  return (
    <div className="form">
      <h3>
        {mode.toUpperCase()}
        {' '}
        {type.toUpperCase()}
      </h3>
      {type === 'comment' ? (
        <CommentForm mode={mode} handleClose={handleClose} />
      ) : (
        <ResourceForm handleClose={handleClose} />
      )}
    </div>
  );
}

export default Form;
