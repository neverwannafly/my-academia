import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import withLogin from '@app/hoc/withLogin';
import FAB from '@app/components/fab';
import { loadResources } from '@app/store/resources';
import { setFabState } from '@app/store/fab';

import ResourcePresenter from './ResourcePresenter';
import Quote from './Quote';
import Filters from './Filters';

function HomePage() {
  const { data: { id } } = useSelector((state) => state.classroom);
  const dispatch = useDispatch();
  const [filterState, setFilterState] = useState({ tags: [], state: [], type: [] });

  useEffect(() => {
    dispatch(loadResources(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(setFabState({ type: 'resource' }));
  }, [dispatch]);

  return (
    <>
      <div className="container">
        <Quote />
        <Filters setFilterState={setFilterState} filterState={filterState} />
        <ResourcePresenter filterState={filterState} />
      </div>
      <FAB type="resource" />
    </>
  );
}

export default withLogin(HomePage);
