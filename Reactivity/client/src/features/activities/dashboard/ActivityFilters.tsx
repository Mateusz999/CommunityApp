import { FilterList, Event } from '@mui/icons-material'
import { Box, ListItemText, MenuItem, MenuList, Paper, Typography } from '@mui/material'
import 'react-calendar/dist/Calendar.css'
import Calendar from 'react-calendar'
import { useStore } from '../../../lib/Hooks/useStore'
import { observer } from 'mobx-react-lite'
const ActivityFilters = observer( function ActivityFilters() {

    const { activityStore: {setFilter,setStartDate,filter,startDate}} = useStore();

  return (
    <Box sx={{ display:'flex', flexDirection: 'column', gap: 3, borderRadius: 3}}>
        <Paper sx={{ p: 3, borderRad:3}}>
            <Box sx={{ width: '100%'}}>
                <Typography variant='h6' sx={{ display:'flex', alignItems:'center', mb:1, color:'primary.main'}}>
                    <FilterList  sx={{mr: 1}}/>
                    Filtry
                </Typography>
                    <MenuList>
                    
                        <MenuItem
                            selected={filter === 'Wszystkie'}
                            onClick={ () => setFilter("Wszystkie")}
                        >
                            <ListItemText primary='Wszystkie' />
                        </MenuItem>
                           <MenuItem
                            selected={filter === 'Uczestnicze'}
                            onClick={ () => setFilter("Uczestnicze")}
                           >
                            <ListItemText primary='Uczestnicze' />
                        </MenuItem>
                           <MenuItem
                            selected={filter === 'Organizuje'}
                            onClick={ () => setFilter("Organizuje")}
                           >
                            <ListItemText primary='Organizuje' />
                        </MenuItem>
                    </MenuList>
                
            </Box>
        </Paper>
        <Box component={Paper} sx={{ width: '100%', p:3, borderRadius:3}}>
            <Typography variant='h6' sx={{ display:'flex', alignItems: 'center', mb:1, color:'primary.main'}}>
                <Event sx={{mr:1}} />
                Wybierz datę
            </Typography>
            <Calendar
                value={startDate}
                onChange={date => setStartDate(date as Date)}
            />
        </Box>
    </Box>
  )
})

export default ActivityFilters