
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import { RootLayout } from './pages/root/RootLayout';
import { WelcomePage } from './pages/root/WelcomePage';
import { PostsLayout } from './pages/posts/PostsLayout';
import { PostDetails } from './pages/posts/PostDetails';
import { NewPost } from './pages/posts/NewPost';
import { Posts } from './pages/posts/Posts';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
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
    <div className="w-full min-h-screen">
      return <RouterProvider router={router} />;
    </div>
  )
}

export default App
