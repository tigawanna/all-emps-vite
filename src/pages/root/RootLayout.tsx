import React from 'react'
import { Outlet } from 'react-router-dom';
import { Toolbar } from '../../components/navigation/Toolbar/Toolbar';


interface RootLayoutProps {

}

export const RootLayout: React.FC<RootLayoutProps> = ({}) => {
  // const load_data = useLoaderData()
  // console.log("loader data ====== > ",load_data)
  return (
    <div className='h-full w-full '>
      <div className='h-16 w-full  bg-slate-700 dark:bg-slate-800  
      bg-opacity-50 dark:bg-opacity-50
       sticky top-0 z-40'>
      <Toolbar/>
      </div>
      <main className=' h-full w-full'>
        <Outlet />
      </main>
    </div>
  );
};


// export const userLoader = (queryClient:QueryClient) =>{
//   queryClient.prefetchQuery({
//     queryKey: ['user'],
//     queryFn: getUser,
//   })
//   return getUser
// }

    
