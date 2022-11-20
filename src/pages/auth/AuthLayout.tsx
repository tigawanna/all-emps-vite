import React from 'react'
import { Outlet, Navigate, unstable_HistoryRouter } from 'react-router-dom';
import { Admin, Record } from 'pocketbase';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface AuthLayoutProps {
    user: Record | Admin | null
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({user}) => {
const navigate = useNavigate()
useEffect(()=>{
if (user?.email) {
 navigate('/')
}
},[user])


return (
<div className='w-full h-full'>
   <Outlet />
</div>
);
}
