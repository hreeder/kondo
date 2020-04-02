import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Table, Header, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react';

import { ListFilters } from './listFilters';

import { useStore } from '../../stores';
import { GameSession } from '../../stores/games';

type EntryProps = {
  game: GameSession;
};

export const GamesList = observer(
  ({ match }: any): JSX.Element => {
    const { games } = useStore();
    return (
      <Grid>
        <Grid.Column width={4}>
          <Button
            fluid
            color="green"
            style={{ marginBottom: '2rem' }}
            as={Link}
            to={`${match.path}/new`}
          >
            Organise Game
          </Button>
          <ListFilters />
        </Grid.Column>
        <Grid.Column width={12}>
          <Table basic="very" padded selectable>
            <Table.Header>
              <Table.Row textAlign="center">
                <Table.HeaderCell collapsing>Playing</Table.HeaderCell>
                <Table.HeaderCell>Game</Table.HeaderCell>
                <Table.HeaderCell>When</Table.HeaderCell>
                <Table.HeaderCell>Slots</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {games.presentableSessionList.map((game) => (
                <GameEntry key={game.id} game={game} />
              ))}
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid>
    );
  }
);

const GameEntry = ({ game }: EntryProps): JSX.Element => {
  return (
    <Table.Row textAlign="center">
      <Table.Cell>
        <img src={game.capsuleImage} alt={game.gameName} />
        <br />
        {game.gameName}
      </Table.Cell>
      <Table.Cell>
        <Header as="h3">{game.name}</Header>
        Host: Sklullus#2495
      </Table.Cell>
      <Table.Cell>SoonTM</Table.Cell>
      <Table.Cell>8/10</Table.Cell>
    </Table.Row>
  );
};
