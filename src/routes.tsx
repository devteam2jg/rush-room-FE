// router.tsx
import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/HomePage/Home';
import Layout from './pages/LayoutPage/Layout';
import Error from './pages/ErrorPage/Error';
import Login from './pages/LoginPage/Login';
import CreateAuction from './pages/CreateAuctionPage/CreateAuction';
import CreateItem from './pages/CreateItemPage/CreateItem';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ), // 보호된 경로
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'crauction',
        element: (
          <ProtectedRoute>
            <CreateAuction />
          </ProtectedRoute>
        ), // 보호된 경로
      },
      {
        path: 'critem',
        element: (
          <ProtectedRoute>
            <CreateItem />
          </ProtectedRoute>
        ), // 보호된 경로
      },
    ],
  },
]);

export default router;
