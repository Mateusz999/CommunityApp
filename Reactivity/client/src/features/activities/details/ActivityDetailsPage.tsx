import {  Grid2, Typography } from '@mui/material'
import {  useParams } from 'react-router';
import { useActivities } from '../../../lib/Hooks/useActivity';
import ActivitityDetailHeader from './ActivitityDetailHeader';
import ActivityDetailInfo from './ActivityDetailInfo';
import ActivityDetailChat from './ActivityDetailChat';
import ActivityDetailSidebar from './ActivityDetailSidebar';



export default function ActivityDetailsPage() {
    const {id} = useParams();
    const {activity,isLoadingActivity} = useActivities(id)



    if(isLoadingActivity) return <Typography>Loading...</Typography> 
    if(!activity) return <Typography>Nie znaleziono wydarzenia.</Typography> 
  return (
    <Grid2 container spacing={3}>
        <Grid2 size={8}>
            <ActivitityDetailHeader activity={activity}/>
            <ActivityDetailInfo  activity={activity}/>
            <ActivityDetailChat />
        </Grid2>
        <Grid2 size={4 }>
            <ActivityDetailSidebar />
        </Grid2>
    </Grid2>
  )
}
