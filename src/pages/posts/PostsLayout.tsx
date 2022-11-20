import React from 'react'
import { Outlet } from 'react-router-dom';

interface PostsLayoutProps {

}

export const PostsLayout: React.FC<PostsLayoutProps> = ({}) => {
return (
 <div className='w-full h-full'>
    <Outlet />
 </div>
);
}
