import React, { useCallback } from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';

import { Chip, Paper } from '@mui/material';

function Resource({
  resource_type: resourceType,
  title,
  score,
  id,
}) {
  const history = useHistory();
  const handleClick = useCallback(() => {
    history.push(`/discuss/classroom_resource/${id}/`);
  }, [history, id]);

  return (
    <Paper elevation={3} onClick={handleClick}>
      <div className="resource__item">
        <div
          className={
            classNames(
              'resource__header',
              `resource__header--${resourceType}`,
            )
          }
        >
          {`[${resourceType.toUpperCase()}] `}
          {title}
        </div>
        <Chip
          label={score ? 'Complete 🥳' : 'Pending'}
          variant="outlined"
          color={score ? 'success' : 'warning'}
        />
      </div>
    </Paper>
  );
}

export default Resource;
