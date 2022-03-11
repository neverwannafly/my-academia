import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFound from './NotFound';

// Pages
const HomePage = lazy(() => import('@app/pages/home'));
const AboutPage = lazy(() => import('@app/pages/about'));
const AuthPage = lazy(() => import('@app/pages/auth'));
const ResourcePage = lazy(() => import('@app/pages/resource'));
const ProfilePage = lazy(() => import('@app/pages/profile'));
const IdePage = lazy(() => import('@app/pages/ide'));

function AppRouter() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        component={HomePage}
      />
      <Route
        exact
        path="/about"
        component={AboutPage}
      />
      <Route
        path="/auth"
        component={AuthPage}
      />
      <Route
        path="/profile"
        component={ProfilePage}
        exact
      />
      <Route
        path="/ide"
        component={IdePage}
        exact
      />
      <Route
        path="/discuss/:resourceType/:resourceId"
        component={ResourcePage}
        exact
      />
      <Route component={NotFound} />
    </Switch>
  );
}

export default AppRouter;
