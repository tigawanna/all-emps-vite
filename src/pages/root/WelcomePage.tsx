import React from 'react'
import { Hero } from '../../components/index/Hero';
import { Navigate, useNavigate } from 'react-router-dom';
import { Admin } from 'pocketbase';
import { Record } from 'pocketbase';

interface WelcomePageProps {
user:Record|Admin|null|undefined
}

export const WelcomePage: React.FC<WelcomePageProps> = ({user}) => {
    const navigate = useNavigate()
    React.useEffect(() => {
        if (user?.email) {
            navigate('/profile')
        }
    }, [user])
//   if(user?.email){
//       return <Navigate to='profile'/>
//   }  
return (
    <div className='w-full h-full flex flex-col justify-start items center dark:bg-slate-900'>

        <Hero />

    </div>
);
}
