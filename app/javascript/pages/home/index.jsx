import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import withLogin from '@app/hoc/withLogin';
import FAB from '@app/components/fab';
import { loadResources } from '@app/store/resources';
import { setFabState } from '@app/store/fab';
import { loadStats } from '@app/store/stats';

import ResourcePresenter from './ResourcePresenter';
import Quote from './Quote';
import Stats from './Stats';

function HomePage() {
  const { data: { id } } = useSelector((state) => state.classroom);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadResources(id));
    dispatch(loadStats(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(setFabState({ type: 'resource' }));
  }, [dispatch]);

  return (
    <>
      <div className="container">
        <Quote />
        <Stats />
        <ResourcePresenter />
      </div>
      <FAB type="resource" />
    </>
  );
}

export default withLogin(HomePage);
