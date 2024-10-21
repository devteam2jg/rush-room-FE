import AuctionInfo from '../../components/AuctionInfo';
import AddAuction from '../../components/AddAuction';
import AuctionList from '../../components/AuctionList';

function AuctionDetail() {
  return (
    <div>
      <AuctionInfo />
      <AddAuction />
      <AuctionList />
    </div>
  );
}

export default AuctionDetail;
