import React from 'react';
import classNames from 'classnames';

import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import { promotionPieces } from '@app/constants/board';

function Promotion({
  open,
  handlePromote,
  color = 'black',
  anchorEl,
  cancelPromotion,
}) {
  if (!anchorEl) {
    return null;
  }

  return (
    <Popover
      id="promotion-popover"
      open={open}
      anchorEl={anchorEl}
      onClose={cancelPromotion}
      anchorOrigin={{
        vertical: color === 'white' ? 'top' : 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: color === 'white' ? 'top' : 'bottom',
        horizontal: 'center',
      }}
    >
      <Box className={classNames(
        'chessground__promotion-container',
        { light: color === 'black' },
      )}
      >
        {promotionPieces.map((piece) => (
          <div
            key={piece[0]}
            className={classNames(
              'chessground__promotion',
              piece[0],
              color,
            )}
            onClick={() => handlePromote && handlePromote(piece[1])}
            role="presentation"
          />
        ))}
      </Box>
    </Popover>
  );
}

export default Promotion;
