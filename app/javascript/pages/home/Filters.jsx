import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';

import MultiSelect from '@app/components/MultiSelect';
import { FILTER_STATES, FILTER_TYPES } from '@app/constants/components';

function Filters({ filterState, setFilterState }) {
  const { tags } = useSelector((state) => state.classroom);

  const handleChange = useCallback((prop) => (event) => {
    const { target: { value } } = event;
    const newValue = typeof value === 'string' ? value.split(',') : value;
    setFilterState((prev) => ({ ...prev, [prop]: newValue }));
  }, [setFilterState]);

  return (
    <div className="row m-b-10">
      <MultiSelect
        title="Filter by Tags"
        handleChange={handleChange('tags')}
        items={tags}
        selectedItems={filterState.tags}
      />
      <MultiSelect
        title="Filter by State"
        handleChange={handleChange('state')}
        items={FILTER_STATES}
        selectedItems={filterState.state}
      />
      <MultiSelect
        title="Filter by Type"
        handleChange={handleChange('type')}
        items={FILTER_TYPES}
        selectedItems={filterState.type}
      />
    </div>
  );
}

export default Filters;
