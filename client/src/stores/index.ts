import React from 'react'

import UserStore from './user'
import State from './state'

export const storesContext = React.createContext({
  user: new UserStore(),
  state: new State()
})

export const useStore = () => React.useContext(storesContext)
