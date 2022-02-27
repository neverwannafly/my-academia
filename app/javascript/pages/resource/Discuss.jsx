import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useParams } from 'react-router-dom';

import MdEditor from '@app/lib/MdEditor';
import { loadComments } from '@app/store/comments';
import { Avatar, Divider, Paper } from '@mui/material';
import { timeSince } from '@app/utils/datetime';
import { setFabOpen, setFabState } from '@app/store/fab';
import ModeEditOutlined from '@mui/icons-material/ModeEditOutlined';

function Discuss() {
  const { resourceId, resourceType } = useParams();
  const dispatch = useDispatch();
  const { id: userId } = useSelector((state) => state.user);
  const { data } = useSelector((state) => state.comments);
  const { data: { id } } = useSelector((state) => state.classroom);

  const handleEdit = useCallback((commentId) => () => {
    batch(() => {
      dispatch(setFabOpen(commentId));
      dispatch(setFabState({ type: 'comment', mode: 'edit' }));
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadComments(id, resourceId, resourceType));
  }, [dispatch, id, resourceId, resourceType]);

  if (!(resourceId in data)) {
    return null;
  }

  return (
    <div className="column">
      {data[resourceId].map((row) => (
        <Paper
          elevation={4}
          className="column p-10 m-t-10"
          key={row.id}
        >
          <h3>{row.title}</h3>
          <MdEditor.Preview value={row.content} />
          <div className="m-t-10" />
          <Divider />
          <div className="m-t-10 row space-between align-items-center ">
            <span className="row align-items-center">
              <Avatar className="m-r-10" src={row.profile_pic} />
              {row.username}
            </span>
            <span className="row">
              {userId === row.user_id && (
              <ModeEditOutlined
                className="pointer m-r-5"
                color="primary"
                onClick={handleEdit(row.id)}
              />
              )}
              {timeSince(row.created_at)}
              {' '}
              ago
            </span>
          </div>
        </Paper>
      ))}
    </div>
  );
}

export default Discuss;
