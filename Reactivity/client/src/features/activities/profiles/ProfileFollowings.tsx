import React from 'react'
import { useParams } from 'react-router'
import { useProfile } from '../../../lib/Hooks/useProfile';
import { Box, Divider, Typography } from '@mui/material';
import ProfileCard from './ProfileCard';


type Props = {
    activeTab: number
}

export default function ProfileFollowings({activeTab}: Props) {

    const {id} = useParams();
    const predicate = activeTab === 3 ? 'followers' : 'followings';
    const { profile, followings, loadingFollowings  } = useProfile(id,predicate);


  return (
    
    <Box>
        <Box display='flex' >
            <Typography variant='h5'>
                {activeTab === 3 ? `Obserwujący użytkownika ${profile?.displayName}` : `Obserwowani użytkownika ${profile?.displayName}`}
            </Typography>
        </Box>
        <Divider sx={{my :2 }} />
        {loadingFollowings ? <Typography>Ładowanie ...</Typography> : (
            <Box display={'flex'} marginTop={3} gap={3}>
                {followings?.map( profile => (
                    <ProfileCard key={profile.id}  profile={profile}/>
                ))}
            </Box>
        )}
    </Box>
  )
}
