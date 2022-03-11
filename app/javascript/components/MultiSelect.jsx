import React from 'react';

import {
  FormControl, InputLabel, Select, MenuItem,
  ListItemText, Checkbox,
  OutlinedInput, Box, Chip,
} from '@mui/material';

function MultiSelect({
  title, selectedItems, handleChange, items,
}) {
  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="tag-selector">{title}</InputLabel>
      <Select
        id="tag-selector"
        multiple
        value={selectedItems}
        onChange={handleChange}
        input={<OutlinedInput label={title} />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} color="secondary" />
            ))}
          </Box>
        )}
      >
        {items.map(({ name, id }) => (
          <MenuItem key={id} value={name}>
            <Checkbox checked={selectedItems.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default MultiSelect;
