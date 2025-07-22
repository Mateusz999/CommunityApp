import { Group } from '@mui/icons-material'
import { AppBar, Box, CircularProgress, Container, MenuItem, Toolbar, Typography } from '@mui/material'
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
      <AppBar position="fixed" sx={{ }}>
       <Container maxWidth='xl'>
        <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Box>
                <MenuItemList  to='/' >
                    <Group fontSize='large'/>
                    <Typography sx={{position: 'relative'}} variant='h4' fontWeight='bold'>Spotly
                    </Typography>
                          <Observer>
                              { () => uiStore.isLoading ? (
                                <CircularProgress
                                size={20}
                                thickness={7}
                                  sx={{
                                    color: 'white',
                                    position: 'absolute',
                                    top: '30%',
                                    left: '105%'
                                  }}
                                />
                                ) : null }
                          </Observer>
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
      </AppBar>
    </Box>
  )
}
