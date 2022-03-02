import { useMediaQuery as useMedia } from '@mui/material';

import {
  desktopWidth,
  largeDesktopWidth,
  mobileWidth,
  tabletWidth,
} from '@app/constants/media';

export const MEDIA_QUERIES = {
  tablet: `(max-width: ${tabletWidth}px)`,
  tabletOnly:
    `(min-width: ${mobileWidth + 1}px) and (max-width: ${tabletWidth})px`,
  desktop: `(min-width: ${desktopWidth}px)`,
  smallDesktop: `(max-width: ${largeDesktopWidth}px)`,
};

function useMediaQuery(query) {
  return useMedia(query);
}

useMediaQuery.QUERIES = MEDIA_QUERIES;

export default useMediaQuery;
