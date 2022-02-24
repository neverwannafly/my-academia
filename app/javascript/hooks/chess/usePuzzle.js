import { useCallback, useEffect, useState } from 'react';

import useCommonHook from './useCommon';
import {
  legalMoves,
  oppositeMove,
  parseLastMove,
  turnColor,
} from './utils';

function usePuzzle(initialFen, _solution) {
  const solution = _solution?.split(' ');
  const [puzzleStage, setPuzzleStage] = useState(0);
  const [status, setStatus] = useState();

  const handleOrientation = useCallback((chess) => (
    oppositeMove(chess)
  ), []);

  const {
    chess,
    fen,
    orientation,
    setFen,
    lastMove,
    setLastMove,
    promote,
    showPrompt,
    checkPromotion,
    cancelPromotion,
  } = useCommonHook(initialFen, handleOrientation);

  useEffect(() => {
    if (puzzleStage === solution?.length) {
      setStatus('success');
    }
  }, [puzzleStage, solution, setStatus]);

  useEffect(() => {
    let timeout;

    if (solution && puzzleStage < solution.length) {
      const move = solution[puzzleStage];
      if (turnColor(chess) !== orientation) {
        timeout = setTimeout(() => {
          chess.move(move, { sloppy: true });
          setFen(chess.fen());
          setLastMove(parseLastMove(move));
          setPuzzleStage((prev) => prev + 1);
        }, 50);
      }
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [solution, puzzleStage, chess, orientation, setFen, setLastMove]);

  const cleanup = useCallback(() => {
    setLastMove();
    setPuzzleStage(0);
    setStatus();
  }, [setLastMove, setPuzzleStage, setStatus]);

  const handleMove = useCallback((from, to) => {
    if (puzzleStage === solution?.length) {
      return;
    }

    checkPromotion();
    if (from + to === solution[puzzleStage]) {
      chess.move({ from, to });
      setFen(chess.fen());
      setLastMove([from, to]);
    } else {
      setFen(chess.fen());
      setLastMove([from, to]);
      setStatus('error');
    }
  }, [puzzleStage, chess, setFen, setLastMove, solution, setStatus, checkPromotion]);

  const proxyLegalMoves = useCallback(() => {
    if (puzzleStage === solution?.length) {
      return {
        dests: new Map(),
        color: undefined,
        free: false,
      };
    }

    return legalMoves(chess);
  }, [chess, puzzleStage, solution]);

  return {
    status,
    chess,
    fen,
    lastMove,
    legalMoves: proxyLegalMoves(),
    turnColor: turnColor(chess),
    handleMove,
    orientation,
    cleanup,
    promote,
    showPrompt,
    cancelPromotion,
  };
}

export default usePuzzle;
