import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import Chessboard from '@app/lib/chessground';
import usePuzzle from '@app/hooks/chess/usePuzzle';
import { loadPuzzle, randomPuzzle } from '@app/store/puzzles';

import LeftPanel from './LeftPanel';

function Board() {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const {
    isLoading,
    data,
  } = useSelector((state) => state.puzzles);
  const { puzzle = {}, themes = {} } = data[slug] || {};
  const {
    starting_position_fen: startingFen,
    solution,
  } = puzzle;

  const {
    fen,
    lastMove,
    legalMoves,
    turnColor,
    handleMove,
    orientation,
    status,
    cleanup,
    promote,
    showPrompt,
    cancelPromotion,
  } = usePuzzle(startingFen, solution);

  const history = useHistory();

  const afterFetch = useCallback((_slug) => {
    history.push(`/puzzles/${_slug}`);
  }, [history]);

  const handleNextPuzzle = useCallback((rating, didSolve) => () => {
    cleanup();
    const newStrength = rating + (didSolve ? 25 : -25);
    dispatch(randomPuzzle(afterFetch, newStrength));
  }, [dispatch, afterFetch, cleanup]);

  useEffect(() => {
    dispatch(loadPuzzle(slug));
  }, [slug, dispatch]);

  if (isLoading || !data[slug]) {
    return <Chessboard.Skeleton text="Loading Puzzle" />;
  }

  return (
    <div className="chessground__container">
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
          orientation,
          events: {
            move: handleMove,
          },
        }}
      />
      <LeftPanel
        themes={themes}
        nextPuzzle={handleNextPuzzle}
        status={status}
        puzzle={puzzle}
      />
    </div>
  );
}

export default Board;
