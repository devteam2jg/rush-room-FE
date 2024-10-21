import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from './pages/HomePage/Home';
import Layout from './pages/LayoutPage/Layout';
import Error from './pages/ErrorPage/Error';
import Login from './pages/LoginPage/Login';
import AuctionDetail from './pages/AuctionDetailPage/AuctionDetail';

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
      {
        path: 'auction',
        element: <AuctionDetail />,
      },
    ],
  },
]);

export default router;
