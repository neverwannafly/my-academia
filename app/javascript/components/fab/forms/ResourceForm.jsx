import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button, FormControl, InputLabel,
  MenuItem, Select, TextField,
} from '@mui/material';
import { createResource } from '@app/store/resources';
import { resourceMapping } from '@app/constants/fab';

function ResourceForm({
  initialTitle = '',
  initialLink = '',
  initialType = 'problem',
  handleClose,
}) {
  const { data: { id } } = useSelector((state) => state.classroom);
  const [title, setTitle] = useState(initialTitle);
  const [link, setLink] = useState(initialLink);
  const [type, setType] = useState(initialType);
  const dispatch = useDispatch();

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();

    if (title.length === 0 || link.length === 0) {
      return;
    }

    dispatch(createResource(
      id,
      { title, link, resource_type: resourceMapping[type] },
      handleClose,
    ));
  }, [dispatch, id, link, title, type, handleClose]);

  return (
    <form className="column" onSubmit={handleSubmit}>
      <TextField
        margin="normal"
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        margin="normal"
        label="Link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <div className="m-t-10" />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Resource Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Resource Type"
          onChange={(e) => setType(e.target.value)}
        >
          <MenuItem value="problem">Problem</MenuItem>
          <MenuItem value="article">Article</MenuItem>
        </Select>
      </FormControl>
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

export default ResourceForm;
