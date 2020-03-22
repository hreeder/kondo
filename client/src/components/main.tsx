import React from 'react';

import { useStore } from '../stores';

export const Main = () => {
    const { user } = useStore();

    return (
        <button
            onClick={() => user.doAnotherThing()}>
            Do the thing!
        </button>
    )
}
