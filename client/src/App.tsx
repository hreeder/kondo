import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import { PrivateRoute } from './components/privateRoute';
import { GamesRoot } from './components/games'
import { TopMenu } from './components/topmenu';

import { DiscordCallback } from './components/auth/discordCallback';

function DefaultRoute() {
  return (
    <div>
      <h1>Welcome to Kondo</h1>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Router>
        <TopMenu />
        <Container>
          <Switch>
            {/* Auth Routes */}
            <Route path="/auth/discord/callback"><DiscordCallback /></Route>

            {/* Games */}
            <PrivateRoute path="/games"><GamesRoot /></PrivateRoute>

            {/* Fallback */}
            <Route path="/"><DefaultRoute /></Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default App;
