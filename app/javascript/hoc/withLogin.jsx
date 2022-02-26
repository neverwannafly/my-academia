import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { loadClassroom } from '@app/store/classroom';

function withLogin(Component) {
  return function (props) {
    const { isLoggedin } = useSelector((state) => state.user);
    const { data: { id } } = useSelector((state) => state.classroom);
    const dispatch = useDispatch();
    const { location } = props;

    useEffect(() => {
      if (isLoggedin && !id) {
        dispatch(loadClassroom());
      }
    }, [dispatch, isLoggedin, id]);

    if (isLoggedin) {
      return <Component {...props} />;
    }

    return (
      <Redirect
        to={{
          pathname: '/auth/signin',
          state: { from: location },
        }}
      />
    );
  };
}

export default withLogin;
