import { useCallback, useEffect, useState } from 'react';
import Chess from 'chess.js';

import { turnColor } from './utils';

function useCommonHook(initialFen, _setOrientation) {
  const [chess] = useState(new Chess(initialFen));
  const [fen, setFen] = useState(initialFen);
  const [orientation, setOrientation] = useState();
  const [lastMove, setLastMove] = useState();
  const [pendingMove, setPendingMove] = useState();
  const [showPrompt, setPromptVisibility] = useState(false);

  useEffect(() => {
    if (initialFen) {
      chess.load(initialFen);
      setFen(chess.fen());
      if (_setOrientation) {
        setOrientation(_setOrientation(chess));
      } else {
        setOrientation(turnColor(chess));
      }
    }
  }, [initialFen, chess, setFen, setOrientation, _setOrientation]);

  const checkPromotion = useCallback((from, to) => {
    const moves = chess.moves({ verbose: true });
    const { length } = moves;

    for (let i = 0; i < length; i += 1) {
      if (moves[i].flags.indexOf('p') !== -1 && moves[i].from === from) {
        setPendingMove([from, to]);
        setPromptVisibility(true);
        break;
      }
    }
  }, [chess]);

  const promote = useCallback((piece) => {
    const [from, to] = pendingMove;
    chess.move({ from, to, promotion: piece });
    setFen(chess.fen());
    setLastMove([from, to]);
    setPromptVisibility(false);
  }, [chess, pendingMove]);

  const cancelPromotion = useCallback(() => {
    setPromptVisibility(false);
  }, []);

  return {
    fen,
    orientation,
    chess,
    setFen,
    promote,
    showPrompt,
    lastMove,
    setLastMove,
    checkPromotion,
    cancelPromotion,
  };
}

export default useCommonHook;
