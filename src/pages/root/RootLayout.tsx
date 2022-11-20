import React from 'react'
import { Outlet, useLoaderData } from 'react-router-dom';
import { Toolbar } from '../../components/navigation/Toolbar/Toolbar';
import { getUser } from '../../pb/config';
import { QueryClient } from '@tanstack/react-query';

interface RootLayoutProps {

}

export const RootLayout: React.FC<RootLayoutProps> = ({}) => {
  const load_data = useLoaderData()
  console.log("loader data ====== > ",load_data)
  return (
    <div className='h-full w-full '>
      <div className='h-fit w-full bg-slate-900 bg-opacity-50 
      
      sticky top-0 z-40'>
      <Toolbar/>
      </div>
      <main className=' h-full w-full'>
        <Outlet />
      </main>
    </div>
  );
};


const userQueryFn = () => ({ queryKey: ['user'] , queryFn: async () => getUser()})

export const userLoader=async()=>{
  return getUser()

}

