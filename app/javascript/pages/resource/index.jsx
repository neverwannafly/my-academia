import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';

import withLogin from '@app/hoc/withLogin';
import { loadResources } from '@app/store/resources';
import FAB from '@app/components/fab';

import Container from './Container';

function ResourcePage() {
  const { data: { id } } = useSelector((state) => state.classroom);
  const { data, isLoaded } = useSelector((state) => state.resources);
  const { resourceId } = useParams();
  const dispatch = useDispatch();

  const resource = useMemo(() => (
    data.find((row) => row.id === Number(resourceId))
  ), [data, resourceId]);

  useEffect(() => {
    dispatch(loadResources(id));
  }, [dispatch, id]);

  if (isLoaded && !resource) {
    return (
      <Redirect to={{ pathname: '/not_found' }} />
    );
  }

  return (
    <>
      <div className="container">
        <Container isLoaded={isLoaded} resource={resource} />
      </div>
      <FAB mode="comment" />
    </>
  );
}

export default withLogin(ResourcePage);
