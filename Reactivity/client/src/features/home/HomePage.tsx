import { Group } from '@mui/icons-material'
import { Box, Button, Paper, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router'

export default function HomePage() {
  return (
   <Paper 
    sx={{
      color: 'white',
      display: 'flex',
      flexDirection:'column',
      gap: 6 ,
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#1976d2'
    }}
   >
    <Box
      sx={{
        display:' flex',
        alignItems: 'center',
        alignContent: 'center',
        color:'white',
        gao:4
      }}
    >
      <Group sx={{ height: 110, width: 110}}/>
      <Typography variant='h1'>Spotly</Typography>
    </Box>
    <Typography variant='h2'>Witam w Spotly</Typography>
    <Button
      component={Link}
      to={'/activities'}
      size='large'
      variant='contained'
      sx={{heigth:80, borderRadius: 4, fontSize: '1.2rem'}}
    >Wejdż do Spotly</Button>
   </Paper>
  )
}
