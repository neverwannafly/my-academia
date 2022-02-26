import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import MdEditor from '@app/lib/MdEditor';
import { loadComments } from '@app/store/comments';
import { Avatar, Divider, Paper } from '@mui/material';
import { readableDate } from '@app/utils/datetime';

function Discuss() {
  const { resourceId, resourceType } = useParams();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.comments);
  const { data: { id } } = useSelector((state) => state.classroom);

  useEffect(() => {
    dispatch(loadComments(id, resourceId, resourceType));
  }, [dispatch, id, resourceId, resourceType]);

  if (!(resourceId in data)) {
    return null;
  }

  return (
    <div className="column">
      {data[resourceId].map((row) => (
        <Paper elevation={4} className="column p-10 m-t-10" key={row.id}>
          <h3>{row.title}</h3>
          <MdEditor.Preview value={row.content} />
          <div className="m-t-10" />
          <Divider />
          <div className="m-t-10 row space-between align-items-center ">
            <span className="row align-items-center">
              <Avatar className="m-r-10">{row.username[0]}</Avatar>
              {row.username}
            </span>
            {readableDate(row.created_at)}
          </div>
        </Paper>
      ))}
    </div>
  );
}

export default Discuss;
