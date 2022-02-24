import { useCallback } from 'react';
import useCommonHook from './useCommon';
import { legalMoves, turnColor } from './utils';

function useChess(initialFen) {
  const {
    chess,
    fen,
    setFen,
    setLastMove,
    lastMove,
    orientation,
    promote,
    showPrompt,
    checkPromotion,
    cancelPromotion,
  } = useCommonHook(initialFen);

  const handleMove = useCallback((from, to) => {
    checkPromotion(from, to);

    if (chess.move({ from, to, promotion: 'x' })) {
      setFen(chess.fen());
      setLastMove([from, to]);
    }
  }, [checkPromotion, setFen, chess, setLastMove]);

  return {
    chess,
    fen,
    lastMove,
    legalMoves: legalMoves(chess),
    turnColor: turnColor(chess),
    handleMove,
    orientation,
    promote,
    showPrompt,
    cancelPromotion,
  };
}

export default useChess;
