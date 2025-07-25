import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { LoginSchema } from "../schemas/loginSchema"
import agent from "../api/agent"
import {  useNavigate } from "react-router";
import type { RegisterSchema } from "../schemas/registerSchema";
import { toast } from "react-toastify";

export const useAccount = () => {

    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const loginUser = useMutation({ // useMutation używamy do mutujących operacji, czyli te ktore zmieniaja dane put, post, delete 
        mutationFn: async( creds: LoginSchema) =>{
            await agent.post('/login?useCookies=true',creds)
        }, // mutationFn ta funkcja jest wykonywana
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['user']
            });

        }
    });

    const logoutUser = useMutation({
        mutationFn: async () =>{
            await agent.post('/account/logout')
        },
        onSuccess: () => {
            queryClient.removeQueries({queryKey: ['user']});
            queryClient.removeQueries({queryKey: ['activities']});
            navigate('/')
        }

    })

    const {data: currentUser, isLoading: loadingUserInfo} = useQuery({
        queryKey: ['user'],
        queryFn: async ()=> {
            const response = await agent.get<User>('account/user-info');
            return response.data;
        },
        enabled: !queryClient.getQueryData(['user']) 


    })

    const registerUser = useMutation({
        mutationFn: async (creds:RegisterSchema) =>{
            await agent.post('/account/register',creds)
        },

        onSuccess: () => {
            toast.success('Rejestracja przebiegła pomyślnie.');
            navigate('/login');
        }
    })

    return {
        loginUser,
        currentUser,
        logoutUser,
        loadingUserInfo,
        registerUser
    }
}