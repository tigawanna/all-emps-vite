import React from 'react'
import { Outlet } from 'react-router-dom';
import { Record } from 'pocketbase';
import { Admin } from 'pocketbase';

interface TestLayoutProps {
    user: Record | Admin | null
}

export const TestLayout: React.FC<TestLayoutProps> = ({user}) => {
return (
 <div>
  <Outlet/>
 </div>
);
}
