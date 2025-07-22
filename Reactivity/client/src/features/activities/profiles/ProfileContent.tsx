import { Box, Paper, Tab, Tabs } from '@mui/material'
import React, { useState, type SyntheticEvent } from 'react'
import ProfilesPhotos from './ProfilesPhotos';
import ProfileAbout from './ProfileAbout';
import ProfileFollowings from './ProfileFollowings';
import ProfileActivities from './ProfileActivities';

export default function ProfilesContent() {

  const [value, setValue] = useState(0)

  const handleChange = (_ : SyntheticEvent, newValue:number) =>{
    setValue(newValue);
  }

  const tabContent = [
    {label: 'O Mnie', content: <ProfileAbout />},
    {label: 'Zdjęcia', content:<ProfilesPhotos />},
    {label: 'Wydarzenia', content: <ProfileActivities />},
    {label: 'Obserwujący', content:<ProfileFollowings  activeTab={value}/>},
    {label: 'Obserwowani', content:<ProfileFollowings  activeTab={value}/>},
  ]
  return (
    <Box
      component={Paper}
      mt={2}
      p={3}
      elevation={3}
      height={500}
      sx={{
        display:'flex',
        alignItems:'flex-start',
        borderRadius: 3
      }}
    >
        <Tabs
          orientation='vertical'
          value={value}
          onChange={handleChange}
          sx={{
            borderRight: 1,
            height: 450,
            minWidth: 200
          }}
        >
          {tabContent.map((tab,index)=> (
            <Tab  key={index} label={tab?.label}  sx={{mr: 3}}/>
          ))}
        </Tabs>
        <Box 
        sx={{
          flexGrow: 1,
          p: 3,
          pt: 0
        }}>
          {tabContent[value].content}
        </Box>
    </Box>
  )
}
