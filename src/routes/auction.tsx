import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import AuctionDetail from '../pages/AuctionDetailPage/AuctionDetail';
import AuctionItemDetail from '../pages/AuctionItemDetailPage/AuctionItemDetail';
import UpdateItem from '../pages/AuctionItemDetailPage/AuctionItemUpdate';
import Bidding from '../pages/biddingPage/Bidding';
import Bid from '../pages/BidPage/Bid';
import CreateAuction from '../pages/CreateAuctionPage/CreateAuction';
import CreateItem from '../pages/CreateItemPage/CreateItem';
import EditAuction from '../pages/EditAuctionPage/EditAuction';

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
    path: 'edit/:auctionId',
    element: (
      <ProtectedRoute>
        <EditAuction />
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
            <Bid />
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
