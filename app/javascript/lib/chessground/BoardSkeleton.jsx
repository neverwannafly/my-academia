import React from 'react';
import classNames from 'classnames';

import useWindowSize from '@app/hooks/useWindowSize';
import { optimumBoardSize } from '@app/utils/board';
import { CircularProgress } from '@mui/material';

const SQUARES = 8;
const ARRAY = [1, 2, 3, 4, 5, 6, 7, 8];

function BoardSkeleton({ text }) {
  const dimensions = useWindowSize();
  const size = optimumBoardSize(dimensions, 180);

  const loaderSize = size / SQUARES;

  return (
    <div className="chessground-skeleton" style={{ height: size, width: size }}>
      {ARRAY.map((i) => (
        <div
          key={i}
          className="chessground-skeleton__row"
          style={{ height: loaderSize, width: size }}
        >
          {ARRAY.map((j) => (
            <div
              key={i + 8 * j}
              className={classNames(
                'chessground-skeleton__cell',
                { light: (i + j) % 2 === 0 },
                { dark: (i + j) % 2 !== 0 },
              )}
              style={{ height: loaderSize, width: loaderSize }}
            />
          ))}
        </div>
      ))}
      <div className="chessground-skeleton__card">
        <CircularProgress size={60} />
        <div className="chessground-skeleton__text">
          {text}
        </div>
      </div>
    </div>
  );
}

export default BoardSkeleton;
