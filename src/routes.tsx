import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/HomePage/Home';
import Layout from './pages/LayoutPage/Layout';
import Error from './pages/ErrorPage/Error';
import Login from './pages/LoginPage/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: 'login', element: <Login /> },
      { path: 'example', element: '' },
    ],
  },
]);

export default router;
