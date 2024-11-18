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
import AuctionOverview from '../pages/AuctionOverviewPage/AuctionOverview';
import MyPage from '../pages/myPage/myPage';
// import TestingPage from '../pages/TestingPage';
import NewHome from '../pages/NewHomePage/NewHome';
// import SwipeCards from '../components/Card/SwipeCards';

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
            <NewHome />
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
      {
        path: 'overview',
        element: <AuctionOverview />,
      },
      {
        path: 'myPage/:userId',
        element: <MyPage />,
      },
      // {
      //   path: 'test',
      //   element: (
      //     <SwipeCards
      //       results={[
      //         {
      //           id: 1,
      //           title: 'snsjso',
      //           bidPrice: 1100,
      //           bidder: {
      //             name: '정재욱',
      //             profileUrl:
      //               'http://k.kakaocdn.net/dn/7GsfZ/btr7gPEMRtX/CCv56Azv41eO4jNxZDFrwK/img_640x640.jpg',
      //           },
      //         },
      //         {
      //           id: 2,
      //           title: 'ㅛ',
      //           bidPrice: 46,
      //           bidder: {
      //             name: '정재욱',
      //             profileUrl:
      //               'http://k.kakaocdn.net/dn/7GsfZ/btr7gPEMRtX/CCv56Azv41eO4jNxZDFrwK/img_640x640.jpg',
      //           },
      //         },
      //       ]}
      //     />
      //   ),
      // },
      {
        path: 'newhome',
        element: <NewHome />,
      },
    ],
  },
]);

export default router;
