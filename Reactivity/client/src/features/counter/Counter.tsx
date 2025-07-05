import React from 'react'
import { useStore } from '../../lib/Hooks/useStore'
import {observer} from 'mobx-react-lite'
import { Box, Button, ButtonGroup, List, ListItemText, Paper, Typography } from '@mui/material';

const Counter =  observer(function Counter() {

    const {counterStore} = useStore();

  return (

    <Box display={'flex'} justifyContent={'space-between'}>
        <Box sx={{width:'60%'}}>

      

        <Typography variant='h4' gutterBottom>{counterStore.title}</Typography>
        <Typography variant='h6' >Licznik wynosi: {counterStore.counter}</Typography>

        <ButtonGroup sx={{ mt: 3 }}>
            <Button onClick={()=>counterStore.decrement()} variant='contained' color='error'>Zmniejsz</Button>
            <Button onClick={()=>counterStore.increment()} variant='contained' color='success'>Zwiększ</Button>
            <Button onClick={()=>counterStore.increment(5)} variant='contained' color='primary'>Zwiększ o 5</Button>
        </ButtonGroup>
        </Box>
        <Paper sx={{width:'40%', p:4}}>
            <Typography variant='h4'>Licznik zdarzeń ({counterStore.eventCount})</Typography>
            <List>
                {counterStore.events.map((event,index)=> (
                    <ListItemText key={index}>{event}</ListItemText>
            ))}
            </List>
        </Paper>
    </Box>

  )
})
export default Counter;