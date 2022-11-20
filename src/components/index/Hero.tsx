import React from 'react'
import HeroImg from '../../assets/emps-hero.svg'
import { Link } from 'react-router-dom';
interface HeroProps {

}

export const Hero: React.FC<HeroProps> = ({}) => {
return (
<div className='min-h-screen w-full 
   flex flex-col   items-center justify-center
   bg-gradient-to-br from-purple-900 to-red-900 text-white relative
 '>
        <div className='h-fit flex justify-center items-center w-[95%] absolute top-0 '>
            <div className='flex justify-center items-center w-[20%] text-2xl font-bold'>
                All Emps
            </div>
            <div className='flex justify-end items-center w-full'>
                <Link to="/auth/signup" >
                <div className='px-2 py-1 m-2 md:text-lg w-20 
                 flex justify-center items-center rounded-full
                 border-2 md:border-2 hover:bg-slate-900
                 '>
                    Join
                </div>
                </Link>
                    <Link to="/auth" >
                <div className='px-2 py-1 m-2 md:text-lg w-20 
            flex justify-center items-center rounded-full
            border-2 md:border-2 hover:bg-slate-900
            '>
                    Sign in
                </div>
                </Link>
            </div>

        </div> 
        
 
        <div className=' flex flex-col md:flex-row justify-center items-center'>
            <div className=' w-full md:selection:h-full flex justify-center items-center m-2 p-2'>
                <div className='font-serif text-4xl w-[70%]'>
                    Join us in this new phase in your career
                </div>
            </div>
            <div className='w-full m-2 p-2
                  flex justify-center items-center'>
                <img className='w-full h-full' src={HeroImg} />
            </div>
        </div>
        </div>

);
}
