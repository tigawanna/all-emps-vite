import React from 'react'
import { Outlet, Navigate, unstable_HistoryRouter } from 'react-router-dom';
import { Admin, Record } from 'pocketbase';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface AuthLayoutProps {
    user: Record | Admin | null |undefined
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({user}) => {
const navigate = useNavigate()
console.log("user ===",user)
useEffect(()=>{
if(user){
    if (user?.email && (user?.bio === "" || user?.avatar === "")) {
        navigate('/profile')
    }
    else{
        navigate('/')
    }
}    

},[user])


return (
<div className='w-full h-full'>
   <Outlet />
</div>
);
}
