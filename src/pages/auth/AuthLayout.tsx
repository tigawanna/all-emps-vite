import React from 'react'
import { Outlet } from 'react-router-dom';

interface AuthLayoutProps {

}

export const AuthLayout: React.FC<AuthLayoutProps> = ({}) => {
return (
<div className='w-full h-full'>
    <Outlet />
</div>
);
}
