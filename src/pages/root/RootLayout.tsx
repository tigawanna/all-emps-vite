import React from 'react'
import { Outlet } from 'react-router-dom';
import { Toolbar } from '../../components/navigation/Toolbar/Toolbar';

interface RootLayoutProps {

}

export const RootLayout: React.FC<RootLayoutProps> = ({}) => {
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
