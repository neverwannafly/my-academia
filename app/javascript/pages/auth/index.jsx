import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import SignupForm from './forms/SignupForm';
import SigninForm from './forms/SigninForm';
import NotFound from '@app/NotFound';

function AuthPage() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route
        exact
        path={`${path}/signup`}
        component={SignupForm}
      />
      <Route
        exact
        path={`${path}/signin`}
        component={SigninForm}
      />
      <Route component={NotFound} />
    </Switch>
  );
}

export default AuthPage;
