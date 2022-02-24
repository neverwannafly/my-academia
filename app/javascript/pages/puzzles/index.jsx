import withLogin from '@app/hoc/withLogin';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Board from './Board';
import Introduction from './Introduction';

function PuzzlePage() {
  const { path } = useRouteMatch();

  return (
    <div className="container puzzles">
      <h1>Puzzles</h1>
      <Switch>
        <Route
          exact
          component={Introduction}
          path={path}
        />
        <Route
          component={Board}
          path={`${path}/:slug`}
        />
      </Switch>
    </div>
  );
}

export default withLogin(PuzzlePage);
