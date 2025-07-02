import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import React from 'react'

type Props = {
    activity?: Activity
    closeForm: () => void
}

export default function ActivityForm({activity,closeForm}: Props) {
  return (
    <Paper sx={{ borderRadius:3, padding: 3}}>
        <Typography variant='h5' gutterBottom color='primary'>Utwórz Wydarzenie</Typography>
        <Box component='form' display='flex' flexDirection='column' gap={3} >
            <TextField label='Tytuł' value={activity?.title} />
            <TextField label='Opis' multiline rows={3}/>
            <TextField label='Kategoria'/>
            <TextField label='Data' type="date"/>
            <TextField label='Miasto'/>
            <TextField label='Miejsce'/>
            <Box display={'flex'} justifyContent={'end'} gap={4}>
                <Button onClick={closeForm} color='inherit'>Anuluj</Button>
                <Button color='success' variant='contained'>Zapisz</Button>
            </Box>
        </Box>
    </Paper>
  )
}
