import { useAccount } from '../../lib/Hooks/useAccount'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Paper, Typography } from '@mui/material';
import { LockOpen } from '@mui/icons-material';
import TextInput from '../../app/shared/components/TextInput';
import { Link } from 'react-router';
import { registerSchema, type RegisterSchema } from '../../lib/schemas/registerSchema';

export default function RegisterForm() {

    const { registerUser } = useAccount();
    const {control, handleSubmit, setError, formState: {isValid, isSubmitting}} = useForm<RegisterSchema>({
        mode: 'onTouched',
        resolver: zodResolver(registerSchema)
    });

    const onSubmit = async(data: RegisterSchema) =>{
        await registerUser.mutateAsync(data,{
            onError: (error) => {
                if(Array.isArray(error)){
                    error.forEach(err => {
                        if(err.includes('Email')) setError('email',{message:'Ten adres email jest już zajęty.'});
                        else if (err.includes('Password')) setError('password',{message:'Wprowadzono niepoprawne hasło.'});
                    })
                }
            }
        });
    }
  return (
    <Paper 
        component={'form'}
        onSubmit={handleSubmit(onSubmit)}
        sx={{
            display: 'flex',
            flexDirection: 'column',
            p:3,
            gap:3,
            maxWidth: 'md',
            mx: 'auto',
            borderRadius: 3
        }}
    >
        <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            gap={3}
            color={'secondary.main'}
        >
            <LockOpen fontSize='large'/>
            <Typography variant='h4'>Rejestracja</Typography>
        </Box>
        <TextInput  label='Email' control={control} name='email'/>
        <TextInput  label='Nazwa' control={control} name='displayName'/>
        <TextInput  label='Password' type='password' control={control} name='password'/>
        <Button 
            type='submit'
            disabled={!isValid || isSubmitting}
            variant='contained'
            size='large'
        >
            Zarejestruj się
        </Button>
        <Typography
            sx={{
                textAlign: 'center'
            }}
        >Masz juz konto w serwisie Spotly ?
            <Typography 
                sx={{
                    ml:1,
                    textDecoration: 'none',
                    fontWeight: 'bold'
                }} 
                component={Link} 
                to='/login' 
                color='primary'>
                Zaloguj się
            </Typography>
        </Typography>
    </Paper>
  )
}
