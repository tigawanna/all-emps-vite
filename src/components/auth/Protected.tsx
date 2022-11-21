import { Admin, Record } from 'pocketbase';
import React, { ReactNode } from 'react'
import { Navigate } from 'react-router-dom';

interface ProtectedProps {
user?: Record | Admin | null | undefined
testmode?:boolean
children:ReactNode
to?:string
}

export const Protected: React.FC<ProtectedProps> = ({ user, children, testmode, to}) => {

if(!user?.email && !testmode){
    return <Navigate to={'/login'} />
}

return (
 <div className='h-full w-full'>
  {children}
 </div>
);
}
