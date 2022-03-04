import React, { useCallback, useMemo } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';

import { Chip, Divider, Paper } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import { setFabOpen, setFabState } from '@app/store/fab';
import useMediaQuery from '@app/hooks/useMediaQuery';
import { toggleLike } from '@app/store/classroom';

function Resource({
  resource_type: resourceType,
  title,
  score,
  id,
  comments_count: commentsCount,
  likes_count: likesCount,
  user_id: ownerId,
  liked,
}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { data: { id: classroomId } } = useSelector((state) => state.classroom);
  const { id: userId } = useSelector((state) => state.user);

  const handleClick = useCallback(() => {
    history.push(`/discuss/classroom_resource/${id}/`);
  }, [history, id]);

  const handleEdit = useCallback(() => {
    batch(() => {
      dispatch(setFabOpen(id));
      dispatch(setFabState({ type: 'classroom_resource', mode: 'edit' }));
    });
  }, [dispatch, id]);

  const isTablet = useMediaQuery(useMediaQuery.QUERIES.tablet);

  const style = useMemo(() => {
    if (isTablet) {
      return { flexBasis: '100%' };
    }
    return { flexBasis: '30%', marginRight: '1rem' };
  }, [isTablet]);

  const handleLike = useCallback(() => {
    dispatch(toggleLike(classroomId, 'classroom_resource', id));
  }, [dispatch, id, classroomId]);

  return (
    <Paper
      className="m-t-10"
      elevation={3}
      sx={style}
    >
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
      <div className="row p-10 space-between">
        <span className="row">
          <span
            className="row m-r-10 align-items-center pointer"
            role="presentation"
            onClick={handleLike}
          >
            {liked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon color="error" />}
            {likesCount}
          </span>
          <span className="row align-items-center">
            <ChatBubbleOutlineOutlinedIcon color="info" />
            {commentsCount}
          </span>
        </span>
        {userId === ownerId && (
          <span className="row">
            <ModeEditOutlinedIcon
              className="pointer"
              color="primary"
              onClick={handleEdit}
            />
          </span>
        )}
      </div>
    </Paper>
  );
}

export default Resource;
