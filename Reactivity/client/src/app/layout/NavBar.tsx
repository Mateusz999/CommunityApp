import { Group } from '@mui/icons-material'
import { AppBar, Box, Container, MenuItem, Toolbar, Typography } from '@mui/material'
import React from 'react'
import MenuItemList from '../shared/components/MenuItemList'


export default function NavBar() {
  return (
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
       <Container maxWidth='xl'>
        <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Box>
                <MenuItemList  to='/' >
                    <Group fontSize='large'/>
                    <Typography variant='h4' fontWeight='bold'>Spotly</Typography>
                </MenuItemList>
            </Box>
            <Box sx={{ display: 'flex'}}>
                <MenuItemList  to='/activities'>
                        Wydarzenia
                </MenuItemList>
                  <MenuItemList  to='/createActivity'>
                        Utwórz Wydarzenie
                </MenuItemList>

            </Box>
            <MenuItem>
                  UserMenu
            </MenuItem>
        </Toolbar>
       </Container>
      </AppBar>
    </Box>
  )
}
