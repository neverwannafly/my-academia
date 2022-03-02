import React from 'react';
import classNames from 'classnames';

import {
  Avatar,
  Chip, CircularProgress, Divider, Link, Paper,
} from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import MdEditor from '@app/lib/MdEditor';
import { timeSince } from '@app/utils/datetime';

import Header from './Header';
import Discuss from './Discuss';

function Container({ isLoaded, resource }) {
  if (!isLoaded) {
    return <CircularProgress className="margin-auto" color="secondary" />;
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
                `resource__header--${resource.resource_type}`,
              )
            }
            >
              <div className="row">
                <LinkIcon />
                <span className="m-l-10">
                  {'View '}
                  {resource.resource_type}
                </span>
              </div>
            </div>
          </Link>
          <Chip
            label={resource.score ? 'Complete 🥳' : 'Pending'}
            variant="outlined"
            color={resource.score ? 'success' : 'warning'}
          />
        </div>
        {(resource.content) && (
          <>
            <Divider />
            <div className="resource__body p-10">
              <MdEditor.Preview value={resource.content} />
            </div>
          </>
        )}
        <Divider />
        <div className="p-10">
          <div className="m-t-10 row space-between align-items-center ">
            <span className="row align-items-center">
              <Avatar className="m-r-10" src={resource.profile_pic} />
              {resource.username}
            </span>
            <span className="row">
              {timeSince(resource.created_at)}
              {' '}
              ago
            </span>
          </div>
        </div>
      </Paper>
      <h2 className="m-t-10">Discuss</h2>
      <Discuss />
    </>
  );
}

export default Container;
