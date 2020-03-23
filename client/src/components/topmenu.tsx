import React from 'react'
import { Container, Menu, Image } from 'semantic-ui-react'
import { observer } from 'mobx-react'

import { useStore } from '../stores'
import { getAPIRoot } from '../envVars'
import { getLoginRedirectUrl } from '../authUtil'

import logo from '../logo.svg'

export const TopMenu = observer(() => {
  const { user } = useStore();
  const leftMenuItems: Array<JSX.Element> = [];
  const rightMenuItems: Array<JSX.Element> = [];

  if (user.loggedIn) {
    rightMenuItems.push(
      <Menu.Item key="username" as='a'>
        <Image size='mini' src={user.avatarUrl} style={{ marginRight: '1em',borderRadius: '50%' }} />
        {user.name}
      </Menu.Item>
    )
    rightMenuItems.push(<Menu.Item key="logout" as='a'>Log Out</Menu.Item>);
  } else {
    const loginUrl = `${getAPIRoot()}/auth/discord?redirect=${getLoginRedirectUrl()}`;
    rightMenuItems.push(<Menu.Item key="login" as='a' href={loginUrl}>Log In with Discord</Menu.Item>);
  }

  return (
    <div>
      <Menu fixed='top' inverted>
        <Container>
          <Menu.Item as='a' header>
            <Image size='mini' src={logo} style={{ marginRight: '1.5em' }} />
            Kondo
          </Menu.Item>
          {leftMenuItems}

          <Menu.Menu position='right'>
          {rightMenuItems}
          </Menu.Menu>
        </Container>
      </Menu>
      {/* Use a 4em spacer to stop content appearing under the header */}
      <Container style={{ marginTop: '6em' }}></Container>
    </div>
  )
})
