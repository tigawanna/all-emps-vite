import React from 'react'
import { Outlet } from 'react-router-dom';
import { Toolbar } from '../../components/navigation/Toolbar/Toolbar';

interface RootLayoutProps {

}

export const RootLayout: React.FC<RootLayoutProps> = ({}) => {
  return (
    <>
      <Toolbar/>
      <main>
        <Outlet />
      </main>
    </>
  );
};
