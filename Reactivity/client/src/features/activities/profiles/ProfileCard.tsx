import { Person } from '@mui/icons-material';
import { Box, Card, CardContent, CardMedia, Chip, Divider, Typography } from '@mui/material';
import React from 'react'
import { Link } from 'react-router';

type Props ={
    profile: Profile
}
export default function ProfileCard({profile}: Props) {


  return (
    <Link to={`profiles/${profile.id}`} style={{textDecoration: 'none'}}>
        <Card
        sx={{
            borderRadius: 3,
            p:3,
            maxWidth: 250,
            textDecoration: 'none',
        }}
        elevation={4}
        >
            <CardMedia  
            component={'img'} 
            src={profile?.imageUrl || '/images/user.png' } 
            
            sx={{width:'100%', zIndex: 50}}
            />
            <CardContent>
                <Box display='flex' flexDirection={'column'}  gap={2}>
                    <Typography variant='h5'>{profile.displayName}</Typography>
                    {profile.bio && (
                        <Typography variant='body2' sx={{ textOverflow: 'ellipsis', overflow:'hidden', whiteSpace:'nowrap'}}>{profile.bio}</Typography>
                    )}
                    {profile.following && <Chip size='small' label='following' color='secondary' variant='outlined'/>}
                </Box>
            </CardContent>
            <Divider sx={{mb: 2}}/>
            <Box sx={{display: 'flex', alignItems:'center', justifyContent:'center'}}>
                <Person />
                <Typography sx={{ ml: 1}}>{profile.followersCount} Obserwujących</Typography>
            </Box>
        </Card>
    </Link>
  )
}
