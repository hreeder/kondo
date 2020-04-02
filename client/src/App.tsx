import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import { PrivateRoute } from './components/privateRoute';
import { GamesRoot } from './components/games';
import { TopMenu } from './components/topmenu';

import { DiscordCallback } from './components/auth/discordCallback';

const DefaultRoute = (): JSX.Element => {
  return (
    <div>
      <h1>Welcome to Kondo</h1>
    </div>
  );
};

const App = (): JSX.Element => {
  return (
    <div className="App">
      <Router>
        <TopMenu />
        <Container>
          <Switch>
            {/* Auth Routes */}
            <Route path="/auth/discord/callback" component={DiscordCallback} />

            {/* Games */}
            <PrivateRoute path="/games" component={GamesRoot} />
            {/* <Route path="/games" component={GamesRoot} /> */}

            {/* Fallback */}
            <Route path="/" component={DefaultRoute} />
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
