// router.tsx
import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/HomePage/Home';
import Layout from '../pages/LayoutPage/Layout';
import Error from '../pages/ErrorPage/Error';
import Login from '../pages/LoginPage/Login';
import CreateItem from '../pages/CreateItemPage/CreateItem';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import auctions from './auction';
import TermsOfUse from '../pages/TermsOfUsePage/TermsOfUse';

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
        path: 'docs/termsuse',
        element: <TermsOfUse />,
      },
      {
        path: 'critem',
        element: (
          <ProtectedRoute>
            <CreateItem />
          </ProtectedRoute>
        ), // 보호된 경로
      },
      {
        path: 'auction',
        children: auctions,
      },
    ],
  },
]);

export default router;
