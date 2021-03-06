import React from 'react';
import { useSelector } from 'react-redux';

import CircularProgress from '@mui/material/CircularProgress';
import { filterResources, groupResourcesByDate } from '@app/utils/classroom';
import { readableDate } from '@app/utils/datetime';
import Resource from './Resource';

function ResourcePresenter({ filterState }) {
  const { data, isLoading } = useSelector((state) => state.resources);
  const groupedData = groupResourcesByDate(data);

  if (isLoading) {
    return <CircularProgress className="margin-auto" color="secondary" />;
  }

  return Object.keys(groupedData).map((key) => (
    <div key={key} className="resource">
      <div className="resource__header">
        {readableDate(key)}
      </div>
      <div className="resource__item-container">
        {groupedData[key]
          .map((resource) => (
            <Resource key={resource.id} {...resource} />
          ))
          .filter((resource) => filterResources(resource, filterState))}
      </div>
    </div>
  ));
}

export default ResourcePresenter;
