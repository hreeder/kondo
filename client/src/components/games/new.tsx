import React from 'react';
import { Container, Form, Image, Search } from 'semantic-ui-react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import _ from 'lodash';

import { SteamGame } from '../../stores/games';

@observer
export class NewGame extends React.Component {
  @observable searchLoading: boolean = false;
  @observable searchResults: Array<any> = [];

  @observable gameName: string = "";

  resolvedSteamGame?: SteamGame;

  constructor(props: any) {
    super(props);

    this.resolvedSteamGame = {
      name: 'Half-Life: Alyx',
      appId: 546560,
    };
  }

  getHeaderImage(): JSX.Element {
    if (!this.resolvedSteamGame) return <div />;
    return (
      <Image
        centered
        src={`https://steamcdn-a.akamaihd.net/steam/apps/${this.resolvedSteamGame.appId}/header.jpg`}
        style={{ marginBottom: '2rem' }}
      />
    );
  }

  handleGameNameChange = (e: any, { value }: any) => {
    this.gameName = value;
  }

  handleGameSearchSelect = (event: any, { result }: any) => {
    console.log(result);
  }
  handleGameSearchChange = (event: any, { value }: any) => {
    if (value < 1) {
      this.searchResults = [];
      this.searchLoading = false;
      return
    }

    this.searchLoading = true;
    
    console.log(value);
  }

  render() {
    return (
      <div>
        <h2>
          Organise Game
        </h2>
        <Container text>
          <Form>
            <Search
              loading={this.searchLoading}
              onResultSelect={this.handleGameSearchSelect}
              onSearchChange={_.debounce(this.handleGameSearchChange, 500, {
                leading: true
              })}
            />
            <Form.Input fluid label="Game" placeholder="Game Name" name="gameName" onChange={this.handleGameNameChange} />
            {this.gameName === "Half-Life: Alyx" ? this.getHeaderImage() : ''}
            <Form.Group widths='equal'>
              <Form.Input fluid label="Slots" />
              <Form.Input fluid label="When" />
            </Form.Group>
            <Form.Button fluid color='green'>Confirm</Form.Button>
          </Form>
        </Container>
      </div>
    );
  }
}
