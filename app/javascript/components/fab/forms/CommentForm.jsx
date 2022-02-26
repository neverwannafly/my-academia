import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, TextField } from '@mui/material';
import MdEditor from '@app/lib/MdEditor';
import { createComment } from '@app/store/comments';
import { useParams } from 'react-router-dom';

function CommentForm({ handleClose }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { data: { id } } = useSelector((state) => state.classroom);
  const { data: comments } = useSelector((state) => state.comments);
  const { id: commentId } = useSelector((state) => state.fab);
  const { resourceId, resourceType } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(comments[resourceId], commentId);
  }, []);

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
