import { FC, useReducer, useEffect } from 'react';
import { entriesApi } from '../../apis';
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';

interface Props {
    children: JSX.Element
}

export interface EntriesState {
    entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [],
}

export const EntriesProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

    const addNewEntry = async (description: string) => {
        const { data } = await entriesApi.post<Entry>('/entries', {
            description
        })

        dispatch({
            type: '[Entry] - Add-Entry',
            payload: data
        })
    }

    const updateEntry = async ({ _id, description, status }: Entry) => {

        try {

            const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
                description: description,
                status: status
            })

            dispatch({ type: '[Entry] - Entry-Updated', payload: data });

        } catch (error) {
            console.log({ error });
        }

    }

    const refreshEntries = async () => {
        const { data } = await entriesApi.get<Entry[]>('/entries')
        dispatch({ type: '[Entry] - Load-Initial-Data', payload: data })
    }

    useEffect(() => {
        refreshEntries()
    }, [])

    return (
        <EntriesContext.Provider value={{
            ...state,

            //methods
            addNewEntry,
            updateEntry
        }}>
            {children}
        </EntriesContext.Provider>
    )
}