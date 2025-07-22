import { Box, Typography } from '@mui/material'
import React, {  useEffect } from 'react'
import ActivityCard from './ActivityCard'
import { useActivities } from '../../../lib/Hooks/useActivity'
import { useInView } from "react-intersection-observer";
import { observer } from 'mobx-react-lite';


const ActivityList = observer( function ActivityList() {

  
  const {activitiesGroup, isLoading, hasNextPage,fetchNextPage} = useActivities();
  const { ref, inView } = useInView({
    threshold: 0.5
  });

  useEffect(()=>{
    if(inView &&  hasNextPage){
      fetchNextPage();
    }
  }, [inView, hasNextPage,fetchNextPage])
  if( isLoading) return <Typography>Loading...</Typography>
  if( !activitiesGroup) return <Typography>Nie znaleziono wydarzeń</Typography>

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
      {activitiesGroup.pages.map((activities, index) => (
        <Box  
          ref={index === activitiesGroup.pages.length - 1? ref : null}
          key={index}
          display='flex'
          flexDirection={'column'}
          gap={ 3}
          >
            
          {activities.items.map( activity => (
            <ActivityCard 
              key={activity.id} 
              activity={activity} 
              />
        ))}
        </Box>
      ))}

    </Box>
  )
});


export default ActivityList
