import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import Chessboard from '@app/lib/chessground';
import withLogin from '@app/hoc/withLogin';
import useChess from '@app/hooks/chess/useChess';
import { Button } from '@mui/material';

function HomePage() {
  const {
    fen,
    lastMove,
    legalMoves,
    turnColor,
    handleMove,
    promote,
    showPrompt,
    cancelPromotion,
  } = useChess();

  const history = useHistory();
  const handleClick = useCallback(() => {
    history.push('/puzzles');
  }, [history]);

  return (
    <div className="container">
      <h1>Analysis Board</h1>
      <div className="chessground__container">
        <div className="home">
          <Chessboard
            theme="purple"
            promotionPrompt={showPrompt}
            handlePromote={promote}
            cancelPromotion={cancelPromotion}
            config={{
              movable: legalMoves,
              turnColor,
              lastMove,
              fen,
              events: {
                move: handleMove,
              },
            }}
          />
        </div>
        <div className="chessground__sibling">
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClick}
          >
            My Puzzles
          </Button>
        </div>
      </div>
    </div>
  );
}

export default withLogin(HomePage);
