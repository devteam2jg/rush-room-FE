import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import AuctionDetail from '../pages/AuctionDetailPage/AuctionDetail';
import AuctionItemDetail from '../pages/AuctionItemDetailPage/AuctionItemDetail';
import UpdateItem from '../pages/AuctionItemDetailPage/AuctionItemUpdate';
import Bidding from '../pages/biddingPage/Bidding';
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
    path: ':auctionId',
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <AuctionDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: 'create',
        element: (
          <ProtectedRoute>
            <CreateItem />
          </ProtectedRoute>
        ),
      },
      {
        path: 'update/:itemId',
        element: (
          <ProtectedRoute>
            <UpdateItem />
          </ProtectedRoute>
        ),
      },
      {
        path: 'bid/:itemId',
        element: (
          <ProtectedRoute>
            <Bidding />
          </ProtectedRoute>
        ),
      },
      {
        path: 'details/:itemId',
        element: (
          <ProtectedRoute>
            <AuctionItemDetail />
          </ProtectedRoute>
        ),
      },
    ],
  },
];

export default auctions;
