import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from './pages/HomePage/Home';
import Layout from './pages/LayoutPage/Layout';
import Error from './pages/ErrorPage/Error';
import Login from './pages/LoginPage/Login';

const authenticated = true;

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: authenticated ? <Home /> : <Navigate to="/login" />,
      },
      {
        path: 'login',
        element: !authenticated ? <Login /> : <Navigate to="/" />,
      },
    ],
  },
]);

export default router;
