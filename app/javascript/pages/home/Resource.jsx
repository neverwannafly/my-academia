import React, { useCallback } from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';

import { Chip, Paper } from '@mui/material';
import { getResourceType } from '@app/utils/classroom';

function Resource({
  resource_type: resourceType,
  title,
  status,
  id,
}) {
  const history = useHistory();
  const handleClick = useCallback(() => {
    history.push(`/resource/${id}/`);
  }, [history, id]);

  return (
    <Paper elevation={3} onClick={handleClick}>
      <div className="resource__item">
        <div
          className={
            classNames(
              'resource__header',
              `resource__header--${getResourceType(resourceType)}`,
            )
          }
        >
          {`[${getResourceType(resourceType).toUpperCase()}] `}
          {title}
        </div>
        <Chip
          label={status !== 'pending' ? 'Complete 🥳' : 'Pending'}
          variant="outlined"
          color={status !== 'pending' ? 'success' : 'warning'}
        />
      </div>
    </Paper>
  );
}

export default Resource;
