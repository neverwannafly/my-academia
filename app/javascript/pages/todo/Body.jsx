import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { CircularProgress } from '@mui/material';
import TaskEditor from './TaskEditor';

function Body() {
  const { data, isLoading } = useSelector((state) => state.tasks);
  const currentDate = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);
  const overdued = data.filter((row) => new Date(row.deadline) <= currentDate && row.status === 'pending');
  const pending = data.filter((row) => row.status === 'pending');
  const complete = data.filter((row) => row.status === 'complete');

  if (isLoading) {
    return <CircularProgress />;
  }

  if (data.length === 0) {
    return <h3>Create your first task to get started 🥳</h3>;
  }

  return (
    <div>
      {overdued.length > 0 && (
        <h3 className="danger-text">
          Overdue
          (
          { overdued.length }
          )
        </h3>
      )}
      {overdued
        .map((row) => (
          <TaskEditor key={row.id} {...row} />
        ))}
      <h3 className="primary-text">
        Pending
        (
        { pending.length }
        )
      </h3>
      {pending.map((row) => (
        <TaskEditor key={row.id} {...row} />
      ))}
      <h3 className="success-text">
        Completed 🥳
        (
        { complete.length }
        )
      </h3>
      {complete.map((row) => (
        <TaskEditor key={row.id} {...row} />
      ))}
    </div>
  );
}

export default Body;
