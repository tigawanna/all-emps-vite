import React from 'react'
import { Profile } from '../../pages/emp/Profile';
import { Admin } from 'pocketbase';
import { Record } from 'pocketbase';

interface TestProps {
    user: Record | Admin | null
}

export const Test: React.FC<TestProps> = ({}) => {
return (
 <div>
<Profile/>
 </div>
);
}
