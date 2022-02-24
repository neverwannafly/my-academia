import React from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

function Evaluation({ puzzle, status, nextPuzzle }) {
  if (!status) {
    return null;
  }

  return (
    <div className="puzzles__evaluation">
      <h2 className="puzzles__header">Evaluation</h2>
      <div className="puzzles__body">
        <p>
          This puzzle was rated
          {' '}
          {puzzle.rating}
        </p>
        <Alert
          severity={status}
          style={{ alignItems: 'center' }}
          action={(
            <Button
              variant="outline"
              color="inherit"
              size="small"
              onClick={nextPuzzle(puzzle.rating, status === 'success')}
            >
              Next
            </Button>
            )}
        >
          <div style={{ fontSize: '1rem' }}>
            {status === 'error'
              ? 'Wrong solution 😔'
              : 'Correct solution 🥳'}
          </div>
        </Alert>
      </div>
    </div>
  );
}

export default Evaluation;
