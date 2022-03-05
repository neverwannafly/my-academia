import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { bookmarkResource } from '@app/store/resources';

function Bookmark({
  bookmarked, type, id, partial = true,
}) {
  const dispatch = useDispatch();

  const onClick = useCallback(() => {
    dispatch(bookmarkResource(type, id));
  }, [dispatch, type, id]);

  const props = { onClick, color: 'warning' };

  if (bookmarked) {
    return <StarIcon {...props} />;
  }

  if (partial) {
    return null;
  }

  return <StarBorderIcon {...props} />;
}

export default Bookmark;
