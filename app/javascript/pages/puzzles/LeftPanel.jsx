import React from 'react';
import Evaluation from './Evaluation';
import Theme from './Theme';

function LeftPanel({
  puzzle,
  themes,
  status,
  nextPuzzle,
}) {
  return (
    <div className="chessground__sibling">
      <Evaluation
        puzzle={puzzle}
        status={status}
        nextPuzzle={nextPuzzle}
      />
      <Theme themes={themes} />
    </div>
  );
}

export default LeftPanel;
