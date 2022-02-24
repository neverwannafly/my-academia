import React from 'react';
import Chip from '@mui/material/Chip';

function Theme({ themes }) {
  return (
    <div className="puzzles__theme">
      <h2 className="puzzles__header">Themes</h2>
      <div className="puzzles__body">
        {themes.map((theme) => (
          <div
            className="puzzles__chip"
            key={theme.slug}
          >
            <Chip
              label={theme.title}
              variant="outlined"
              color="success"
              onClick={() => {}}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Theme;
