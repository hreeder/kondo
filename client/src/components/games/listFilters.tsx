import React from 'react';
import { Menu, Form, Checkbox } from 'semantic-ui-react';
import { observer } from 'mobx-react';

import { useStore } from '../../stores';
import { SORT_DEFAULT, SORT_ALTERNATIVE } from '../../stores/games';

export const ListFilters = observer(
  (): JSX.Element => {
    const { games } = useStore();

    const handleSortByClick = (
      e: React.SyntheticEvent,
      { target }: any
    ): void => (games.listSortMethod = target);

    return (
      <div>
        <h5>Sort By</h5>
        <Menu pointing secondary vertical>
          <Menu.Item
            target={SORT_DEFAULT}
            active={games.listSortMethod === SORT_DEFAULT}
            onClick={handleSortByClick}
          >
            Default
          </Menu.Item>
          <Menu.Item
            target={SORT_ALTERNATIVE}
            active={games.listSortMethod === SORT_ALTERNATIVE}
            onClick={handleSortByClick}
          >
            Alternative
          </Menu.Item>
        </Menu>

        <Form>
          <Form.Field
            control={Checkbox}
            label={{ children: 'Sid Meier’s Civilization® VI' }}
          />
        </Form>
      </div>
    );
  }
);
