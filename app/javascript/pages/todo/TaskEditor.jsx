import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { debounce } from 'lodash';

import TextField from '@mui/material/TextField';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Checkbox } from '@mui/material';
import { updateTask } from '@app/store/tasks';

function TaskEditor({
  className,
  id,
  deadline,
  content,
  status,
}) {
  const [state, setState] = useState({ deadline, content, status });
  const dispatch = useDispatch();

  const debouncedUpdate = useCallback(debounce((payload) => {
    dispatch(updateTask(id, payload));
  }, 666), [id]);

  const handleChange = useCallback((key) => (event) => {
    let value;
    if (key === 'status') {
      value = event.target.checked ? 'complete' : 'pending';
    } else {
      value = event?.target?.value || event;
    }

    if (value !== state[key]) {
      setState((prevState) => ({ ...prevState, [key]: value }));
      debouncedUpdate({ [key]: value });
    }
  }, [state, debouncedUpdate]);

  return (
    <div
      className={classNames(
        'row',
        'task-editor',
        'align-items-center',
        { [className]: className },
      )}
    >
      <div className="row m-r-10 align-items-center" style={{ flexGrow: 1 }}>
        <Checkbox
          size="large"
          color="success"
          checked={state.status === 'complete'}
          onChange={handleChange('status')}
        />
        <TextField
          type="text"
          margin="normal"
          label="Task"
          variant="filled"
          sx={{ width: '100%', marginLeft: '1rem' }}
          multiline
          maxRows={4}
          onChange={handleChange('content')}
          value={state.content}
        />
      </div>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <MobileDatePicker
          label="Deadline"
          inputFormat="dd/MM/yyyy"
          value={state.deadline}
          onChange={handleChange('deadline')}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </div>
  );
}

export default TaskEditor;
