import { Box } from '@chakra-ui/react';
import AuctionInfo from '../../components/AuctionInfo';
import AddAuction from '../../components/AddAuction';
import AuctionList from '../../components/AuctionList';

function AuctionDetail() {
  return (
    <div>
      <AuctionInfo />
      <AddAuction />
      <Box h={4} />
      <AuctionList headerShow="show" bgColor="white" />
    </div>
  );
}

export default AuctionDetail;
