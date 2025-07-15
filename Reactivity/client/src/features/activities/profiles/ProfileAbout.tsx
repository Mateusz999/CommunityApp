import { useParams } from "react-router"
import { Box, Button, Divider, Typography } from "@mui/material";
import { useState } from "react";
import ProfileEdit from "./ProfileEditForm";
import { useProfile } from "../../../lib/Hooks/useProfile";
export default function ProfileAbout() {
 const { id } = useParams();
 const { profile, isCurrentUser } = useProfile(id);
 const [editMode, setEditMode] = useState(false); return (
 <Box>
 <Box display='flex' justifyContent='space-between'>
 <Typography variant="h5"> {profile?.displayName}</Typography>
 {isCurrentUser &&
 <Button onClick={() => setEditMode(!editMode)}>
Edytuj
 </Button>}
 </Box>
 <Divider sx={{my: 2}} />
 <Box sx={{overflow: 'auto', maxHeight: 350}}>
 <Typography variant="body1" sx={{whiteSpace: 'pre-wrap'}}>
 {profile?.bio || 'Nie dodano jeszcze opisu.'}
 </Typography>
 {editMode && (
 <ProfileEdit setEditMode={setEditMode} />
 )}
 </Box>
 </Box>
 )
}