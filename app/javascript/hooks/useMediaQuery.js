import { useMedia } from 'react-media';

import {
  desktopWidth,
  largeDesktopWidth,
  mobileWidth,
  tabletWidth,
} from '@app/constants/media';

export const MEDIA_QUERIES = {
  mobile: `(max-width: ${mobileWidth}px)`,
  tablet: `(max-width: ${tabletWidth}px)`,
  tabletOnly:
    `(min-width: ${mobileWidth + 1}px) and (max-width: ${tabletWidth})px`,
  desktop: `(min-width: ${desktopWidth}px)`,
  smallDesktop: `(max-width: ${largeDesktopWidth}px)`,
};

function useMediaQuery() {
  return useMedia({ queries: MEDIA_QUERIES });
}

export default useMediaQuery;
