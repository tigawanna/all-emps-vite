import React from 'react'
import { Hero } from '../../components/index/Hero';

interface WelcomePageProps {

}

export const WelcomePage: React.FC<WelcomePageProps> = ({}) => {
return (
    <div className='w-full h-full flex flex-col justify-start items center dark:bg-slate-900'>

        <Hero />

    </div>
);
}
