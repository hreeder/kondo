import axios from 'axios';
import { observable, computed } from 'mobx';

import { getAPIRoot } from '../envVars';

import { getLoginRedirectUrl } from '../authUtil';

interface DiscordUserInfo {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
}

export default class UserStore {
  @observable accessToken = '';
  @observable tokenExpiresAt = 0;

  @observable id = '';
  @observable name = '';
  @observable discriminator = 0;
  @observable avatarHash = '';

  @observable loginErrorMessage = '';

  @computed get loggedIn(): boolean {
    return this.accessToken === '' ? false : true;
  }

  constructor() {
    const storedJWT = localStorage.getItem('kondo-user-jwt');

    if (storedJWT) {
      const { accessToken, expiration } = JSON.parse(storedJWT);
      // Only hydrate the access token if it's still valid
      if (new Date().getTime() < expiration) {
        this.accessToken = accessToken;
        this.tokenExpiresAt = expiration;

        axios
          .get(`${getAPIRoot()}/auth/discord/userinfo`, {
            headers: {
              Authorization: `Bearer ${this.accessToken}`,
            },
          })
          .then((response) =>
            this.updateFromUserInfo(response.data as DiscordUserInfo)
          );
      }
    }
  }

  @computed get avatarUrl(): string {
    if (this.avatarHash === '' && this.discriminator !== 0) {
      const modulatedDiscriminator = this.discriminator % 5;
      return `https://cdn.discordapp.com/embed/avatars/${modulatedDiscriminator}.png`;
    } else if (this.avatarHash !== '') {
      return `https://cdn.discordapp.com/avatars/${this.id}/${this.avatarHash}`;
    }
    return 'https://cdn.discordapp.com/embed/avatars/1.png';
  }

  @computed get displayName(): string {
    return `${this.name}#${this.discriminator}`;
  }

  completeLogin(code: string): void {
    axios
      .get(
        `${getAPIRoot()}/auth/discord/callback?code=${code}&redirect=${getLoginRedirectUrl()}`
      )
      .then((response) => {
        this.loginErrorMessage = '';
        this.accessToken = response.data.jwt.access_token;
        const expires = new Date();
        expires.setSeconds(expires.getSeconds() + response.data.jwt.expires_in);
        this.tokenExpiresAt = expires.getTime();

        this.updateFromUserInfo(response.data.user_info as DiscordUserInfo);

        // Store these for retrieval later
        localStorage.setItem(
          'kondo-user-jwt',
          JSON.stringify({
            accessToken: this.accessToken,
            expiration: this.tokenExpiresAt,
          })
        );
      })
      .catch((error) => {
        console.error('Unable to authenticate with Discord (via backend)');
        console.error(error.response.data);
        this.loginErrorMessage = error.response.data.error_description;
      });
  }

  private updateFromUserInfo({
    id,
    username,
    discriminator,
    avatar,
  }: DiscordUserInfo): void {
    this.id = id;
    this.name = username;
    this.discriminator = parseInt(discriminator);
    this.avatarHash = avatar;
  }
}
