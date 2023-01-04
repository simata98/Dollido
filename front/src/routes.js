import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Lost112Page from './pages/Lost112Page';
import DollidoPage from './pages/DollidoPage';
import DashboardAppPage from './pages/DashboardAppPage';
import Agreement from './pages/Agreement';
import SignUp from './pages/SignupPage';
import About from './pages/About';
import Lost112Detail from './pages/Lost112DetailPage'
import DollidoDetail from './pages/DollidoDetailPage'
import DollidoAddPostPage from './pages/DollidoAddPostPage'
import DollidoEditPostPage from './pages/DollidoEditPostPage'
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'lost112', element: <Lost112Page /> },
        { path: 'lost112/*', element: <Lost112Detail/>},
        { path: 'dollido', element: <DollidoPage /> },
        { path: 'dollido/addPost', element: <DollidoAddPostPage /> },
        { path: 'dollido/*', element: <DollidoDetail /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'about', element: <About /> },
        { path: 'dollido/editPost', element: <DollidoEditPostPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'agreement',
      element: <Agreement />,
    },
    {
      path: 'signup',
      element: <SignUp />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'about', element: <About /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
