import { Grid2, Typography } from '@mui/material'
import ProfileHeader from './ProfileHeader'
import ProfileContent from './ProfileContent'
import { useParams } from 'react-router'
import { useProfile } from '../../../lib/Hooks/useProfile';

export default function ProfilesPage() {
const {id} = useParams();

const {profile, loadingProfile} = useProfile(id);

if(loadingProfile) return <Typography>Ładowanie profilu ...</Typography>

if(!profile) return <Typography>Nie znaleziono profilu</Typography>

  return (
    
    <Grid2 container>
        <Grid2 size={12}>
            <ProfileHeader profile={profile}/>
            <ProfileContent />
        </Grid2>

    </Grid2>

  )
}
