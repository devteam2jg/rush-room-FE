import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import AuctionDetail from '../pages/AuctionDetailPage/AuctionDetail';
import Bidding from '../pages/bidPage/bidding';
import CreateAuction from '../pages/CreateAuctionPage/CreateAuction';
import CreateItem from '../pages/CreateItemPage/CreateItem';

const auctions = [
  {
    index: true,
    element: (
      <ProtectedRoute>
        <CreateAuction />
      </ProtectedRoute>
    ),
  },
  {
    path: ':id',
    children: [
      {
        index: true,
        element: <AuctionDetail />,
      },
      {
        path: 'create',
        element: <CreateItem />,
      },
      {
        path: 'bid',
        element: <Bidding />,
      },
    ],
  },
];

export default auctions;
