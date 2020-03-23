import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import { Main } from './components/main';
import { TopMenu } from './components/topmenu';

import { DiscordCallback } from './components/auth/discordCallback';

function DefaultRoute() {
  return (
    <div>
      <h1>Welcome to Kondo</h1>
      <Main />
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
            <Route path="/auth/discord/callback"><DiscordCallback /></Route>
            <Route path="/"><DefaultRoute /></Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default App;
