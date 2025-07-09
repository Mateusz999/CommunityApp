import { Group } from '@mui/icons-material'
import { AppBar, Box, Container, LinearProgress, MenuItem, Toolbar, Typography } from '@mui/material'
import MenuItemList from '../shared/components/MenuItemList'
import { useStore } from '../../lib/Hooks/useStore'
import { Observer } from 'mobx-react-lite'
import { useAccount } from '../../lib/Hooks/useAccount'
import { Link } from 'react-router';
import UserMenu from './UserMenu'




export default function NavBar() {
 const {uiStore} = useStore();
 const {currentUser} = useAccount();

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
                <MenuItemList  to='/counter'>
                        Licznik
                </MenuItemList>
                <MenuItemList  to='/errors'>
                        Błedy
                </MenuItemList>
                

            </Box>
            <Box display={'flex'} alignItems={'center'}>
              {currentUser? (
                <UserMenu />
              ):
              (
                <>
                  <MenuItem component={Link} to="/login">Zaloguj się</MenuItem>
                  <MenuItem component={Link} to="/register">Zarejestruj się</MenuItem>
                </>
              )}
            </Box>
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
