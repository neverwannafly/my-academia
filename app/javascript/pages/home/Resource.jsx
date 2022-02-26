import React, { useCallback } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';

import { Chip, Divider, Paper } from '@mui/material';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
// import { toggleLike } from '@app/store/classroom';

function Resource({
  resource_type: resourceType,
  title,
  score,
  id,
  comments_count: commentsCount,
}) {
  const history = useHistory();
  // const dispatch = useDispatch();
  // const { data: { id: classroomId } } = useSelector((state) => state.classroom);

  const handleClick = useCallback(() => {
    history.push(`/discuss/classroom_resource/${id}/`);
  }, [history, id]);

  // const handleLike = useCallback(() => {
  //   dispatch(toggleLike(classroomId, 'classroom_resource', id));
  // }, [dispatch, id, classroomId]);

  return (
    <Paper className="m-t-10" elevation={3}>
      <div className="row" role="presentation" onClick={handleClick}>
        <div className="resource__item">
          <div
            className={
              classNames(
                'resource__header',
                `resource__header--${resourceType}`,
              )
            }
          >
            {title}
          </div>
          <Chip
            label={score ? 'Complete 🥳' : 'Pending'}
            variant="outlined"
            color={score ? 'success' : 'warning'}
          />
        </div>
      </div>
      <Divider />
      <div className="row p-10">
        <span className="row">
          {/* <span
            className="row m-r-10 align-items-center pointer"
            role="presentation"
            onClick={handleLike}
          >
            {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            {likesCount}
          </span> */}
          <span className="row align-items-cente">
            <ChatBubbleOutlineOutlinedIcon />
            {commentsCount}
          </span>
        </span>
      </div>
    </Paper>
  );
}

export default Resource;
