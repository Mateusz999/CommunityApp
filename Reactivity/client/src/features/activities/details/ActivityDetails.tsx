import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router';
import { useActivities } from '../../../lib/Hooks/useActivity';



export default function ActivityDetails() {
    const navigate = useNavigate();
    const {id} = useParams();
    const {activity,isLoadingActivity} = useActivities(id)



    if(isLoadingActivity) return <Typography>Loading...</Typography> 
    if(!activity) return <Typography>Nie znaleziono wydarzenia.</Typography> 
  return (
    <Card sx={{borderRadius: 3}}>
        <CardMedia 
            component='img'
            src={`/images/categoryImages/${activity.category}.jpg`}
        />
        <CardContent>
            <Typography variant='h5'>{activity.title}</Typography>
            <Typography variant='subtitle1' fontWeight='light'>{activity.date}</Typography>
            <Typography variant='body1'>{activity.description}</Typography>
        </CardContent>
        <CardActions>
            <Button component={Link} to={`/manage/${activity.id}`} color='primary'>Edytuj</Button>
            <Button onClick={() => navigate('/activities')} color='inherit'>Anuluj</Button>
        </CardActions>
    </Card>
  )
}
