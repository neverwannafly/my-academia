import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function withLogout(Component) {
  return function (props) {
    const { isLoggedin } = useSelector((state) => state.user);
    const { location } = props;

    if (!isLoggedin) {
      return <Component {...props} />;
    }

    return (
      <Redirect
        to={{
          pathname: '/',
          state: { from: location },
        }}
      />
    );
  };
}

export default withLogout;
