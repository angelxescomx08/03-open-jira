import { FC, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';

interface Props {
    children: JSX.Element
}

export interface EntriesState {
    entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description: 'Pendiente: Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed blanditiis facilis quidem nobis quasi totam ullam suscipit asperiores nisi pariatur aspernatur illo voluptates, quis commodi architecto? Qui, magnam consequuntur. Aliquam.',
            status: 'pending',
            createdAt: Date.now()
        },
        {
            _id: uuidv4(),
            description: 'In-Progress: Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed blanditiis facilis quidem nobis quasi totam ullam suscipit asperiores nisi pariatur aspernatur illo voluptates, quis commodi architecto? Qui, magnam consequuntur. Aliquam.',
            status: 'in-progress',
            createdAt: Date.now() - 50004
        },
        {
            _id: uuidv4(),
            description: 'Completadas: Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed blanditiis facilis quidem nobis quasi totam ullam suscipit asperiores nisi pariatur aspernatur illo voluptates, quis commodi architecto? Qui, magnam consequuntur. Aliquam.',
            status: 'finished',
            createdAt: Date.now() - 88888
        }
    ],
}

export const EntriesProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

    return (
        <EntriesContext.Provider value={{
            ...state
        }}>
           {children}
        </EntriesContext.Provider>
    )
}