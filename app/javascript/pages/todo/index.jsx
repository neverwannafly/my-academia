import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';

import { loadTasks, newTask } from '@app/store/tasks';
import Body from './Body';

function TodoPage() {
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    dispatch(newTask());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadTasks());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="row space-between align-items-center">
        <h1>Manage your day</h1>
        <Button
          startIcon={<AddIcon />}
          color="secondary"
          onClick={handleClick}
        >
          New Task
        </Button>
      </div>
      <Body />
    </div>
  );
}

export default TodoPage;
