
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import { RootLayout} from './pages/root/RootLayout';
import { WelcomePage } from './pages/root/WelcomePage';
import { PostsLayout } from './pages/posts/PostsLayout';
import { PostDetails } from './pages/posts/PostDetails';
import { NewPost } from './pages/posts/NewPost';
import { Posts } from './pages/posts/Posts';
import { useQuery } from '@tanstack/react-query';
import { AuthLayout } from './pages/auth/AuthLayout';
import { Signup } from './pages/auth/Signup';
import { getUser } from './pb/config';
import { Profile } from './pages/emp/Profile';
import { Test } from './components/test/Test';
import { EmpsLayout } from './pages/emp/EmpsLayout';
import { TestLayout } from './components/test/TestLayout';
import { Login } from './pages/auth/Login';
import { QueryStateWrapper } from './shared/QueryState';

function App() {
const userQuery = useQuery(['user'], getUser)
const testmode= false


// if (userQuery.isLoading ) {
//     return (
//       <div className="w-full h-screen flex-center scroll-bar">
//         <div className="w-[670%] h-[70%] flex-center ">loading....</div>
//       </div>
//     );
//   }
//   if (userQuery.isError) {
//     return (
//       <div className="w-full h-screen flex-center scroll-bar">
//         <div className="w-[670%] h-[70%] flex-center ">
//           {/* @ts-expect-error */}
//          {userQuery?.error?.response?.message}
//         </div>
//         </div>
//     ); 
//   }
  const user = userQuery?.data;


  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      // loader:userLoader(queryClient),
      // errorElement: <ErrorPage />,
      children: [
        { index: true, element: <WelcomePage user={user}/> },
        {
          path: '/post',
          element: <PostsLayout user={user} />,
          children: [
            {
              index: true,
              element: <Posts/>,
              // loader: deferredBlogPostsLoader,
            },
            {
              path: ':id',
              element: <PostDetails />,
              // loader: blogPostLoader,
            },
            {
              path: '/post/new',
              element: <NewPost user={user}/>,
              // action: newPostAction,
            },
          ],
        },
        {
          path: '/auth',
          element: <AuthLayout user={user}/>,
          children: [
            {
              index: true,
              element: <Login />,
              // loader: deferredBlogPostsLoader,
            },
            {
              path: '/auth/signup',
              element: <Signup/>,
              // loader: blogPostLoader,
            },
          ],
        },
        {
          path: '/profile',
          element: <EmpsLayout user={user} />,
          children: [
            {
              index: true,
              element: <Profile user={user}/>,
              // loader: deferredBlogPostsLoader,
            },
            // {
            //   path: '/auth/signup',
            //   element: <Signup />,
            //   // loader: blogPostLoader,
            // },
          ],
        },

        {
          path: '/test',
          element: <TestLayout user={user} />,
          children: [
            {
              index: true,
              element: <Test user={user}/>,
              // loader: deferredBlogPostsLoader,
            },

          ],
        },

      ],
    },
    // {
    //   path: '/newsletter',
    //   action: newsletterAction,
    // },
  ]);
  

  return (
    <QueryStateWrapper
      error={userQuery.error}
      isError={userQuery.isError}
      isLoading={userQuery.isLoading}

    >
    <div className="w-full h-screen scroll-bar dark:bg-slate-900 dark:text-white dark:shadow-white">
      <RouterProvider router={router} />;
    </div>
  </QueryStateWrapper>
  )
}

export default App
