import axios from 'axios';
import { observable, computed } from 'mobx';

import { getAPIRoot } from '../envVars';

export const SORT_DEFAULT = 0;
export const SORT_ALTERNATIVE = 1;

export interface SteamGame {
  name: string;
  appId: number;
}

interface GameSessionProps {
  store: GamesStore;
  id: number;
  name: string;
  slots: number;
  steamId?: number | undefined;
  customName?: string | undefined;
}

export class GameSession {
  private store: GamesStore;
  private steam?: SteamGame;

  id: number;
  name: string;

  slots: number;
  signedUp: Array<string>;

  constructor({
    store,
    id,
    name,
    slots,
    steamId,
    customName,
  }: GameSessionProps) {
    this.store = store;
    this.id = id;
    this.name = name;
    this.slots = slots;

    this.signedUp = [];
    this.signedUp.push('Dave');

    if (steamId !== undefined) {
      this.steam = store.getSteamGame(steamId);
    }
  }

  get capsuleImage(): string {
    if (this.steam !== undefined) {
      // steamcdn-a.akamaihd.net/steam/apps/{APPID}/capsule_sm_120.jpg?t={TIME}
      // steamcdn-a.akamaihd.net/steam/apps/{APPID}/capsule_184x69.jpg?t={TIME}
      // steamcdn-a.akamaihd.net/steam/apps/{APPID}/capsule_231x87.jpg?t={TIME}
      return `https://steamcdn-a.akamaihd.net/steam/apps/${this.steam.appId}/capsule_sm_120.jpg?t=1584033558`;
    }

    return 'https://placekitten.com/120/45';
  }

  get gameName(): string {
    if (this.steam !== undefined) {
      return this.steam.name;
    }

    return this.name;
  }
}

export default class GamesStore {
  steamGames: Array<SteamGame> = [
    {
      name: 'Sid Meier’s Civilization® VI',
      appId: 289070,
    },
    {
      name: 'The Jackbox Party Pack 6',
      appId: 1005300,
    },
  ];

  sessionList: Array<GameSession> = [
    new GameSession({
      store: this,
      id: 1,
      name: 'Civ 6 DEATHMATCH',
      slots: 12,
      steamId: 289070,
    }),
    new GameSession({
      store: this,
      id: 2,
      name: 'Covid19 Shitshow',
      slots: 10,
      steamId: 1005300,
    }),
    new GameSession({
      store: this,
      id: 3,
      name: 'Dungeons & Dragons',
      slots: 6,
    }),
  ];

  @observable sessionsFetched = true;

  @observable listSortMethod: number = SORT_DEFAULT;

  @computed get presentableSessionList(): Array<GameSession> {
    return this.sessionList;
  }

  fetchGames(): void {
    axios
      .get(`${getAPIRoot()}/games`, {
        headers: {
          Authorization: `Bearer ${this.}`
        }
      })
      .then((response) => {
        console.log(response)
      })
  }

  getSteamGame(appId: number): SteamGame | undefined {
    const cachedGameResult = this.steamGames.filter(
      (game) => game.appId === appId
    );

    if (cachedGameResult.length === 1) {
      return cachedGameResult[0];
    } else {
      return undefined;
    }
  }
}
