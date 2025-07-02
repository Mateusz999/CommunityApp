import { Group } from '@mui/icons-material'
import { AppBar, Box, Button, Container, MenuItem, Toolbar, Typography } from '@mui/material'
import React from 'react'

type Props = {
  openForm: () => void;
}

export default function NavBar({openForm}: Props) {
  return (
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
       <Container maxWidth='xl'>
        <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Box>
                <MenuItem sx={{display: 'flex', gap: 2}}>
                    <Group fontSize='large'/>
                    <Typography variant='h4' fontWeight='bold'>Spotly</Typography>
                </MenuItem>
            </Box>
            <Box sx={{ display: 'flex'}}>
                <MenuItem sx={{ 
                    fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 'bold'
                    }}>
                        Wydarzenia
                </MenuItem>
                  <MenuItem sx={{ 
                    fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 'bold'
                    }}>
                        Informacje
                </MenuItem>
                  <MenuItem sx={{ 
                    fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 'bold'
                    }}>
                        Kontakt
                </MenuItem>
            </Box>
            <Button 
              size='large' 
              variant='contained' 
              color='warning'
              onClick={openForm}
              >Utwórz wydarzenie</Button>
        </Toolbar>
       </Container>
      </AppBar>
    </Box>
  )
}
