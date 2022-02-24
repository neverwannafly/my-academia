import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function withLogin(Component) {
  return function (props) {
    const { isLoggedin } = useSelector((state) => state.user);
    const { location } = props;

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
