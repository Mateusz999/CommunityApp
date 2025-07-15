import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useParams } from "react-router";
import TextInput from "../../../app/shared/components/TextInput";
import { useProfile } from "../../../lib/Hooks/useProfile";
import { EditProfileSchema } from "../../../lib/schemas/editProfileSchema";
type Props = {
 setEditMode: (editMode: boolean) => void;
}
export default function ProfileEdit({ setEditMode }: Props) {
 const { id } = useParams();
 const { updateProfile, profile } = useProfile(id);
 const { control, handleSubmit, reset, formState: { isDirty, isValid } }  = useForm<EditProfileSchema>({
 resolver: zodResolver(EditProfileSchema),
 mode: 'onTouched'
 });
 const onSubmit = (data: EditProfileSchema) => {
 updateProfile.mutate(data, {
 onSuccess: () => setEditMode(false)
 });
 }
 useEffect(() => {
 reset({
 displayName: profile?.displayName,
 bio: profile?.bio || ''
 });
 }, [profile, reset]);
 return (
 <Box component='form'
 onSubmit={handleSubmit(onSubmit)}
 display='flex'
 flexDirection='column'
 alignContent='center'
 gap={3}
 mt={3}
 >
 <TextInput label='Nazwa Użytkownika' name='displayName' control={control} />
 <TextInput
 label='Dodaj biogram'
 name='bio'
 control={control}
 multiline
 rows={4}
 />
 <Button
 type='submit'
 variant='contained'
 disabled={!isValid || !isDirty || updateProfile.isPending}
 >
Zatwierdź
 </Button>
 </Box>
 );
}