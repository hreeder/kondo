// Thanks to https://mobx-react.js.org/recipes-context
import React from 'react';

import GamesStore from './games';
import UserStore from './user';

export interface StoreInterface {
  games: GamesStore;
  user: UserStore;
}

export const storesContext = React.createContext({
  games: new GamesStore(),
  user: new UserStore(),
});

export const useStore = (): StoreInterface => React.useContext(storesContext);
