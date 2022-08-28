import { FC, useContext, useMemo, DragEvent } from 'react';
import { List, Paper } from "@mui/material"
import { EntryStatus } from "../../interfaces"
import { EntryCard } from "./"
import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '../../context/ui';

import styles from './EntryList.module.css';

interface Props {
    status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {

    const { entries, updateEntry } = useContext(EntriesContext);
    const { isDragging,endDragging } = useContext(UIContext);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries])
    
    const allowDrop = (event: DragEvent) => {
        event.preventDefault();
    }

    const onDrop = (event: DragEvent<HTMLDivElement>) => {
        const id = event.dataTransfer.getData('text');
        const entry = entries.find(e=>e._id === id)!;
        entry.status = status;
        updateEntry(entry);
        endDragging();
    }


    return (
        <div
            onDrop={onDrop}
            onDragOver={allowDrop}
            className={ isDragging ? styles.dragging : '' }
            >
            <Paper sx={{ height: 'calc(100vh - 250px)', overflowY: 'scroll', backgroundColor: 'transparent', padding: 1 }}>
                <List sx={{ 
                    opacity: isDragging ? 0.2 : 1,
                    transition : 'all 0.3s ease'
                    }}>
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
