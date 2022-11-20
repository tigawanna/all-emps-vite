import React from 'react'
import { Hero } from './Hero';
interface HomeProps {

}

export const Home: React.FC<HomeProps> = ({}) => {
return (
 <div className='w-full h-full flex flex-col justify-start items center dark:bg-slate-900'>

  <Hero/>
 
 </div>
);
}

