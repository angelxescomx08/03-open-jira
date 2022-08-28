import { List, Paper } from "@mui/material"
import { FC, useContext, useMemo } from 'react';
import { EntryStatus } from "../../interfaces"
import { EntryCard } from "./"
import { EntriesContext } from '../../context/entries/EntriesContext';

interface Props {
    status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {

    const { entries } = useContext(EntriesContext);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status) , [entries])
     

    return (
        <div>
            <Paper sx={{ height: 'calc(100vh - 250px)', overflowY: 'scroll', backgroundColor: 'transparent', padding: 1 }}>
                <List sx={{ opacity: 1 }}>
                    {
                        entriesByStatus.map(entry => (
                            <EntryCard key={entry._id} entry={entry} />
                        ))
                    }
                </List>
            </Paper>
        </div>
    )
}