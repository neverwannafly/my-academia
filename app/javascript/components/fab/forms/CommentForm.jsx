import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, TextField } from '@mui/material';
import MdEditor from '@app/lib/MdEditor';
import { createComment } from '@app/store/comments';
import { useParams } from 'react-router-dom';

function CommentForm({
  initialTitle = '',
  initialContent = '',
  handleClose,
}) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const { data: { id } } = useSelector((state) => state.classroom);
  const { resourceId, resourceType } = useParams();
  const dispatch = useDispatch();

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();

    dispatch(createComment(
      id,
      resourceId,
      resourceType,
      { title, content },
      handleClose,
    ));
  }, [dispatch, id, title, content, resourceId, handleClose, resourceType]);

  return (
    <form className="column" onSubmit={handleSubmit}>
      <TextField
        margin="normal"
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <MdEditor
        value={content}
        setValue={setContent}
      />
      <Button
        className="auth-form__submit"
        variant="contained"
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
}

export default CommentForm;
