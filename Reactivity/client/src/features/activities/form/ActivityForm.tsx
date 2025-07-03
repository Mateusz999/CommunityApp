import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import type { FormEvent } from 'react'

type Props = {
    activity?: Activity
    closeForm: () => void
    submitForm: (activity: Activity) => void;
}

export default function ActivityForm({activity,closeForm,submitForm}: Props) {

  const handleSubmit = ( event: FormEvent<HTMLFormElement>) => {

    event.preventDefault();
    const formDate = new FormData(event.currentTarget);

    const data: {[key: string]: FormDataEntryValue} = {};
    formDate.forEach((value,key)=> {
      data[key] = value;
    });
    if(activity) data.id = activity.id
    submitForm(data as unknown as  Activity);

    console.log(data);
    event.preventDefault();
  }
  return (
    <Paper sx={{ borderRadius:3, padding: 3}}>
        <Typography variant='h5' gutterBottom color='primary'>Utwórz Wydarzenie</Typography>
        <Box component='form' onSubmit={handleSubmit} display='flex' flexDirection='column' gap={3} >
            <TextField 
              name='title'
              label='Title' 
              defaultValue={activity?.title} />
            <TextField 
              name='description'
              label='Opis' 
              defaultValue={activity?.description} 
              multiline rows={3}/>
            <TextField 
              name='category'
              label='Kategoria'
              defaultValue={activity?.category} />
            <TextField 
              name='data'
              label='Data' 
              defaultValue={activity?.date} 
              type="date"/>
            <TextField 
              name='city'
              label='Miasto'
              defaultValue={activity?.city} />
            <TextField 
              name='venue'
              label='Miejsce'
              defaultValue={activity?.venue} />

            <Box display={'flex'} justifyContent={'end'} gap={3}>
                <Button onClick={closeForm} color='inherit'>Anuluj</Button>
                <Button type='submit' color='success' variant='contained'>Zapisz</Button>
            </Box>
        </Box>
    </Paper>
  )
}
