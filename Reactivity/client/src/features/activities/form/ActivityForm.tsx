import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import type { FormEvent } from 'react'
import { useActivities } from '../../../lib/Hooks/useActivity'
import { useNavigate, useParams } from 'react-router';



export default function ActivityForm() {
  const {id} = useParams();
  const {updateActivity,createActivity,activity,isLoadingActivity} = useActivities(id);
  const navigate = useNavigate();
  const handleSubmit = async ( event: FormEvent<HTMLFormElement>) => {

    event.preventDefault();
    const formDate = new FormData(event.currentTarget);

    const data: {[key: string]: FormDataEntryValue} = {};
    formDate.forEach((value,key)=> {
      data[key] = value;
    });

    if(activity) {
      data.id = activity.id
       await updateActivity.mutateAsync(data as unknown as Activity);
       navigate(`/activities/${activity.id}`)
    } else {
        
      createActivity.mutate(data as unknown as Activity, {
        onSuccess: (id) => {
          navigate(`/activities/${id}`)
        }
      });
    }

  }

  if(isLoadingActivity) return <Typography>Ładowanie wydarzenia...</Typography>
  return (
    <Paper sx={{ borderRadius:3, padding: 3}}>
        <Typography variant='h5' gutterBottom color='primary'>
          {activity? 'Edytuj Wydarzenie':' Utwórz Wydarzenie'}
          
         </Typography>
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
              name='date'
              label='Date' 
              defaultValue={activity?.date 
                ? new Date(activity.date).toISOString().split('T')[0] 
                : new Date().toISOString().split("T")[0]
              } 
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
                <Button color='inherit'>Anuluj</Button>
                <Button 
                  type='submit' 
                  color='success' 
                  variant='contained'
                  disabled={updateActivity.isPending || createActivity.isPending}
                >Zapisz</Button>
            </Box>
        </Box>
    </Paper>
  )
}
