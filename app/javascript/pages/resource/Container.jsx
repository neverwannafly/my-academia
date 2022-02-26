import React from 'react';
import classNames from 'classnames';

import { getResourceType } from '@app/utils/classroom';
import {
  Chip, Divider, Link, Paper,
} from '@mui/material';

import Header from './Header';
import Discuss from './Discuss';

function Container({ isLoaded, resource }) {
  if (!isLoaded) {
    return <h1>Loading!</h1>;
  }

  return (
    <>
      <Header
        title={resource.title}
        type={resource.resource_type}
        score={resource.score}
      />
      <Paper elevation={3} className="column m-t-10">
        <div className="row space-between resource__item" style={{ margin: 0 }}>
          <Link href={resource.link} target="_blank" underline="none" color="inherit">
            <div className={
              classNames(
                'resource__header',
                `resource__header--${getResourceType(resource.resource_type)}`,
              )
            }
            >
              {`${getResourceType(resource.resource_type).toUpperCase()} LINK`}
            </div>
          </Link>
          <Chip
            label={resource.status !== 'pending' ? 'Complete 🥳' : 'Pending'}
            variant="outlined"
            color={resource.status !== 'pending' ? 'success' : 'warning'}
          />
        </div>
        <Divider />
        <div className="resource__body p-10">
          {resource.content}
        </div>
      </Paper>
      <h2 className="m-t-10">Discuss</h2>
      <Discuss />
    </>
  );
}

export default Container;
