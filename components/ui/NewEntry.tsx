import { ChangeEvent, useState, useContext } from 'react';
import { Box, Button, TextField } from "@mui/material"
import SaveIcon from '@mui/icons-material/Save';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '../../context/ui';

export const NewEntry = () => {

    const [inputValue, setInputValue] = useState('');
    const [touched, setTouched] = useState(false);

    const { addNewEntry } = useContext(EntriesContext);
    const {isAdding,setIsAdding} = useContext(UIContext);

    const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const onSave = () => {
        if (inputValue.length === 0) return;
        addNewEntry(inputValue);
        setIsAdding(false);
        setTouched(false);
        setInputValue('');
    }

    return (
        <Box sx={{ marginBottom: 2, paddingX: 1 }}>

            {
                isAdding ? (
                    <>
                        <TextField
                            fullWidth sx={{ marginTop: 2, marginBottom: 1 }}
                            placeholder='Nueva entrada'
                            autoFocus
                            multiline
                            label='Nueva entrada'
                            helperText={inputValue.length <= 0 && touched && 'Ingrese un valor'}
                            error={inputValue.length <= 0 && touched}
                            value={inputValue}
                            onChange={onTextFieldChanged}
                            onBlur={() => setTouched(true)} />
                        <Box display='flex' justifyContent='space-between' >
                            <Button variant="text" onClick={() => setIsAdding(false)}>
                                Cancelar
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                endIcon={<SaveIcon />}
                                onClick={onSave}>
                                Guardar
                            </Button>


                        </Box>

                    </>
                ) :

                    <Button
                        startIcon={<AddCircleOutlineIcon />}
                        fullWidth
                        variant="outlined"
                        onClick={() => setIsAdding(true)}>
                        Agregar tarea
                    </Button>

            }


        </Box>
    )
}
