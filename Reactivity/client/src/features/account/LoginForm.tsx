import React from 'react'
import { useAccount } from '../../lib/Hooks/useAccount'
import { loginSchema, type LoginSchema } from '../../lib/schemas/loginSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Paper, Typography } from '@mui/material';
import { LockOpen } from '@mui/icons-material';
import TextInput from '../../app/shared/components/TextInput';
import { Link, useLocation, useNavigate } from 'react-router';

export default function LoginForm() {

    const { loginUser} = useAccount();
    const navigate = useNavigate();
    const location = useLocation();
    const {control, handleSubmit, formState: {isValid, isSubmitting}} = useForm<LoginSchema>({
        mode: 'onTouched',
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async(data: LoginSchema) =>{
        await loginUser.mutateAsync(data,{
            onSuccess: () =>{
                navigate(location.state?.from || '/activities')
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
            <Typography variant='h4'>Logowanie</Typography>
        </Box>
        <TextInput  label='Email' control={control} name='email'/>
        <TextInput  label='Hasło' type='password' control={control} name='password'/>
        <Button 
            type='submit'
            disabled={!isValid || isSubmitting}
            variant='contained'
            size='large'
        >
            Zaloguj się
        </Button>
        <Typography
            sx={{
                textAlign: 'center'
            }}
        >Nie masz jeszcze konta w serwisie Spotly?
            <Typography 
                sx={{
                    ml:1,
                    textDecoration: 'none',
                    fontWeight: 'bold'
                }} 
                component={Link} 
                to='/register' 
                color='primary'>
                Zarejestruj się
            </Typography>
        </Typography>
    </Paper>
  )
}
