import React from 'react';
import { Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';

import { useStore } from '../../stores'

export const DiscordCallback = observer(() => {
  const { user } = useStore();

  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  if (code != null && user.loginErrorMessage === "") {
    user.completeLogin(code);
  }

  if (user.loggedIn) {
    console.log("Logged In!")
    return <Redirect to="/" />
  }

  if (user.loginErrorMessage !== "") {
    console.log(user.loginErrorMessage)
    return (
      <div>
        <h3>Unable to log you in with Discord.</h3>
        <h5>We got: {user.loginErrorMessage}</h5>
      </div>
    )
  }

  return (
    <h2>Thanks - You are now logged in. Redirecting back now...</h2>
  )
})
