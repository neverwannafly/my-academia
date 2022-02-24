export const turnColor = (chess) => (
  chess.turn() === 'w' ? 'white' : 'black'
);

export const oppositeMove = (chess) => (
  chess.turn() === 'w' ? 'black' : 'white'
);

export const legalMoves = (chess) => {
  const movesMap = new Map();
  chess.SQUARES.forEach((square) => {
    const moves = chess.moves({ square, verbose: true });
    if (moves.length) {
      movesMap.set(square, moves.map((move) => move.to));
    }
  });

  return {
    free: false,
    dests: movesMap,
    color: turnColor(chess),
  };
};

export const parseLastMove = (move) => [
  move[0] + move[1],
  move[2] + move[3],
];
