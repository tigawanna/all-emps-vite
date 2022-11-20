import React from 'react'
import { Outlet } from 'react-router-dom';
import { Admin } from 'pocketbase';
import { Record } from 'pocketbase';


interface EmpsLayoutProps {
    user: Record | Admin | null
}

export const EmpsLayout: React.FC<EmpsLayoutProps> = ({user}) => {
return (
 <div className='w-full h-full'>
  <Outlet/>
 </div>
);
}
