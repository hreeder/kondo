import React from 'react';
import { Button } from 'semantic-ui-react';

import { useStore } from '../stores';

export const Main = () => {
    const { user } = useStore();

    return (
        <Button
            onClick={() => user.doAnotherThing()}>
            Do the thing!
        </Button>
    )
}
