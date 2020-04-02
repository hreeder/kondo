import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { GamesList } from './list';
import { NewGame } from './new';

export const GamesRoot = ({ match }: any): JSX.Element => {
  return (
    <Switch>
      <Route path={`${match.path}/new`} component={NewGame} />
      <Route component={GamesList} />
    </Switch>
  );
};
