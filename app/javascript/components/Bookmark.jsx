import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { bookmarkResource } from '@app/store/resources';

function Bookmark({
  bookmarked, type, id, partial = true, clickable = true,
}) {
  const dispatch = useDispatch();

  const onClick = useCallback(() => {
    if (!clickable) {
      return;
    }
    dispatch(bookmarkResource(type, id));
  }, [dispatch, type, id, clickable]);

  const props = {
    onClick,
    color: 'warning',
    className: 'm-r-10',
  };

  if (bookmarked) {
    return <StarIcon {...props} />;
  }

  if (partial) {
    return null;
  }

  return <StarBorderIcon {...props} />;
}

export default Bookmark;
