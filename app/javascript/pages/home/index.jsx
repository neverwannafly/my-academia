import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import withLogin from '@app/hoc/withLogin';
import FAB from '@app/components/fab';
import { loadResources } from '@app/store/resources';

import ResourcePresenter from './ResourcePresenter';
import Quote from './Quote';

function HomePage() {
  const { data: { id } } = useSelector((state) => state.classroom);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadResources(id));
  }, [dispatch, id]);

  return (
    <>
      <div className="container m-t-20">
        <Quote />
        <ResourcePresenter />
      </div>
      <FAB />
    </>
  );
}

export default withLogin(HomePage);
