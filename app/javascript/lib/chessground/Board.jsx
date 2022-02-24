import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Chessground as NativeChessground } from 'chessground';

import useWindowSize from '@app/hooks/useWindowSize';
import { optimumBoardSize } from '@app/utils/board';
import { defaultConfig } from '@app/constants/board';

import Promotion from './Promotion';

function Chessboard({
  theme,
  style,
  config,
  promotionPrompt,
  handlePromote,
  cancelPromotion,
}) {
  const chessgroundRef = useRef();
  const [api, setApi] = useState();

  const dimensions = useWindowSize();
  const size = optimumBoardSize(dimensions, 180);
  const { turnColor } = config;

  useEffect(() => {
    if (chessgroundRef.current && !api) {
      const finalConfig = { ...defaultConfig, ...config };
      const chessgroundApi = NativeChessground(chessgroundRef.current, finalConfig);
      setApi(chessgroundApi);
    } else if (chessgroundRef.current && api) {
      api.set(config);
    }
  }, [api, config]);

  return (
    <>
      <div
        className={classNames(
          'chessground',
          { [theme]: theme },
        )}
        ref={chessgroundRef}
        style={{
          height: size,
          width: size,
          ...style,
        }}
      />
      <Promotion
        open={promotionPrompt}
        anchorEl={chessgroundRef.current}
        handlePromote={handlePromote}
        color={turnColor}
        cancelPromotion={cancelPromotion}
      />
    </>
  );
}

export default Chessboard;
