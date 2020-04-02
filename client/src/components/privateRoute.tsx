import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { useStore } from '../stores';

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export const PrivateRoute: React.FC<RouteProps> = ({
  children,
  ...rest
}: RouteProps): JSX.Element => {
  const { user } = useStore();
  return (
    <Route
      {...rest}
      render={({ location }): {} | null | undefined =>
        user.loggedIn ? (
          children
        ) : (
          <Redirect to={{ pathname: '/', state: { from: location } }} />
        )
      }
    />
  );
};
