import axios from "axios";
import { observable, computed } from "mobx"

import { getAPIRoot } from '../envVars';

import { getLoginRedirectUrl } from '../authUtil'

export default class UserStore {
  @observable accessToken: string = "";

  @observable id: string = "";
  @observable name: string = "";
  @observable discriminator: number = 0;
  @observable avatarHash: string = "";

  @observable loginErrorMessage: string = "";

  @computed get loggedIn() {
    return this.accessToken === "" ? false : true;
  }

  @computed get avatarUrl() {
    if (this.avatarHash === "" && this.discriminator !== 0) {
      const modulated_discriminator = this.discriminator % 5;
      return `https://cdn.discordapp.com/embed/avatars/${modulated_discriminator}.png`
    } else if (this.avatarHash !== "") {
      return `https://cdn.discordapp.com/avatars/${this.id}/${this.avatarHash}`
    }
    return "https://cdn.discordapp.com/embed/avatars/1.png"
  }

  doAnotherThing() {
    console.log("Another Thing")
  }

  completeLogin(code: string) {
    let usr = this;
    axios.get(`${getAPIRoot()}/auth/discord/callback?code=${code}&redirect=${getLoginRedirectUrl()}`)
      .then((response) => {
        console.log(response);
        usr.loginErrorMessage = "";
        usr.accessToken = response.data.jwt.access_token;

        usr.id = response.data.user_info.id;
        usr.name = response.data.user_info.username;
        usr.discriminator = parseInt(response.data.user_info.discriminator);
        usr.avatarHash = response.data.user_info.avatar;
      })
      .catch((error) => {
        console.error("Unable to authenticate with Discord (via backend)");
        console.error(error.response.data);
        usr.loginErrorMessage = error.response.data.error_description;
      });
  }
}
