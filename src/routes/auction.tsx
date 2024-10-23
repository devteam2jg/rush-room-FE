import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import AuctionDetail from '../pages/AuctionDetailPage/AuctionDetail';
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
    element: <AuctionDetail />,
  },
  {
    path: 'create',
    element: <CreateItem />,
  },
];

export default auctions;
