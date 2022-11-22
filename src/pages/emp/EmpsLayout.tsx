import React from 'react'
import { Outlet } from 'react-router-dom';
import { Admin } from 'pocketbase';
import { Record } from 'pocketbase';
import { useNavigate } from 'react-router-dom';


interface EmpsLayoutProps {
    user: Record | Admin | null |undefined
}

export const EmpsLayout: React.FC<EmpsLayoutProps> = ({user}) => {
    const navigate = useNavigate()
    React.useEffect(() => {
        if (!user?.email) {
            navigate('/auth')
        }
    }, [user])
return (
 <div className='w-full h-full'>
  <Outlet/>
 </div>
);
}
