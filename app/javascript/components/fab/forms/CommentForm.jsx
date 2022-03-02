import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Button, TextField } from '@mui/material';
import MdEditor from '@app/lib/MdEditor';
import { createComment, updateComment } from '@app/store/comments';

function CommentForm({ handleClose }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { data: { id } } = useSelector((state) => state.classroom);
  const { data: comments } = useSelector((state) => state.comments);
  const { id: commentId, mode } = useSelector((state) => state.fab);
  const { resourceId, resourceType } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!resourceId || !commentId) return;

    const resource = comments[resourceId].filter((r) => r.id === commentId)[0];
    setTitle(resource.title);
    setContent(resource.content);
  }, [resourceId, commentId, comments]);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();

    if (mode === 'edit') {
      dispatch(updateComment(
        id,
        resourceId,
        'classroom_resource',
        commentId,
        { title, content },
        handleClose,
      ));
    } else {
      dispatch(createComment(
        id,
        resourceId,
        resourceType,
        { title, content },
        handleClose,
      ));
    }
  }, [
    dispatch, id, title, content,
    resourceId, handleClose,
    resourceType, commentId, mode,
  ]);

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
