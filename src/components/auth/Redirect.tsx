import { Record, Admin } from 'pocketbase';
import React, { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';


import { login_url, redirect_url } from '../../utils/env';
import { Loading } from './../../shared/Loading';
import { client } from './../../pb/config';



interface RedirectProps {
user?: Record | Admin | null | undefined
}

export const Redirect: React.FC<RedirectProps> = ({user}) => {
const [loading, setLoading] = React.useState(true)
const queryClient = useQueryClient()
const navigate = useNavigate()



const [searchParams] = useSearchParams();
const code = searchParams.get('code') as string

// console.log("redirect code ==== ",code)
const local_prov = JSON.parse(localStorage.getItem('provider') as string)
let redirectUrl = redirect_url
useEffect(()=>{

    if (local_prov.state !== searchParams.get("state")) {
        const url =login_url
        navigate('/login')
    }
    else {
 
    //   client.collection('emps').authViaOAuth2(
    //         local_prov.name,
    //         code,
    //         local_prov.codeVerifier,
    //         redirectUrl
    //         )
    //         .then((response) => {
    //             client.records.update('profiles', response.user.profile?.id as string, {
    //                 name: response.meta.name,
    //                 avatarUrl: response.meta.avatarUrl,
                    
    //             }).then((res) => {
    //             // console.log(" successfully updated profi;e", res)

    //             }).catch((e) => {
    //                 // console.log("error updating profile  == ", e)
    //             })
    //             setLoading(false)
    //             // console.log("client modal after logg   == ", client.authStore.model)
    //             queryClient.setQueryData(['user'], client.authStore.model)
    //             navigate('/')
    //             //  if (typeof window !== 'undefined') {
    //             //         window.location.href = main_url;
    //             //   }

    //         }).catch((e) => {
    //             // console.log("error logging in with provider  == ", e)
    //         })
    }

},[])
if (user) {
    return <Navigate to={'/'}/>
    // if (typeof window !== 'undefined') {
    //     window.location.href = main_url;
    // }
}
return (
 <div className='w-full h-full '>
        {loading ? <div className='h-full w-full flex justify-center items-center text-xl 
        font-bold'>
        <Loading size={50}/>
        </div>:null}
 </div>
);
}


