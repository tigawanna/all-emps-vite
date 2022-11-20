import { Admin, Record } from 'pocketbase';
import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

interface PostsLayoutProps {
   user: Record| Admin | null
}

export const PostsLayout: React.FC<PostsLayoutProps> = ({user}) => {
   const navigate = useNavigate()
   React.useEffect(() => {
      if (!user?.email) {
         navigate('/auth')
      }
   }, [user])

return (
 <div className='w-full h-full'>
    <Outlet />
 </div>
);
}
