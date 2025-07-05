import { Group } from '@mui/icons-material'
import { AppBar, Box, Container, LinearProgress, MenuItem, Toolbar, Typography } from '@mui/material'
import MenuItemList from '../shared/components/MenuItemList'
import { useStore } from '../../lib/Hooks/useStore'
import { Observer } from 'mobx-react-lite'


export default function NavBar() {
 const {uiStore} = useStore();

  return (
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ position: 'relative'}}>
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
                <MenuItemList  to='/counter'>
                        Counter
                </MenuItemList>
                

            </Box>
            <MenuItem>
                  UserMenu
            </MenuItem>
        </Toolbar>
       </Container>

      <Observer>
        { () => uiStore.isLoading ? (
<LinearProgress
  sx={{
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#eeeeee',
    '& .MuiLinearProgress-bar': {
      backgroundColor: '#00BCD4',
    },
  }}
/>


        ) : null }
      </Observer>
      </AppBar>
    </Box>
  )
}
