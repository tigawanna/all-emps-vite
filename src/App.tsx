
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import { RootLayout, userLoader } from './pages/root/RootLayout';
import { WelcomePage } from './pages/root/WelcomePage';
import { PostsLayout } from './pages/posts/PostsLayout';
import { PostDetails } from './pages/posts/PostDetails';
import { NewPost } from './pages/posts/NewPost';
import { Posts } from './pages/posts/Posts';
import { QueryClient } from '@tanstack/react-query';
import { AuthLayout } from './pages/auth/AuthLayout';
import { Login } from './pb/auth/Login';
import { Signup } from './pages/auth/Signup';

function App() {
  const queryClient = new QueryClient()
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      loader:userLoader,
      // errorElement: <ErrorPage />,
      children: [
        { index: true, element: <WelcomePage /> },
        {
          path: '/post',
          element: <PostsLayout />,
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
          ],
        },
        {
          path: '/auth',
          element: <AuthLayout />,
          children: [
            {
              index: true,
              element: <Login />,
              // loader: deferredBlogPostsLoader,
            },
            {
              path: 'signup',
              element: <Signup/>,
              // loader: blogPostLoader,
            },
          ],
        },
        {
          path: '/post/new',
          element: <NewPost/>,
          // action: newPostAction,
        },
      ],
    },
    // {
    //   path: '/newsletter',
    //   action: newsletterAction,
    // },
  ]);

  return (
    <div className="w-full h-full">
      <RouterProvider router={router} />;
    </div>
  )
}

export default App
