import React from 'react'

import GamesStore from './games'
import UserStore from './user'

export const storesContext = React.createContext({
  games: new GamesStore(),
  user: new UserStore(),
})

export const useStore = () => React.useContext(storesContext)
