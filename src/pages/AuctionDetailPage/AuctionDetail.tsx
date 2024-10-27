import { Box } from '@chakra-ui/react';
import AuctionInfo from '../../components/AuctionInfo';
import AddAuction from '../../components/AddAuction';
import AuctionList from '../../components/AuctionList';
import PrivateCodeModal from '../../components/PrivateCodeModal';

function AuctionDetail() {
  return (
    <div>
      <PrivateCodeModal />
      <AuctionInfo />
      <AddAuction />
      <Box h={4} />
      <AuctionList headerShow="show" fontColor="black" bgColor="white" />
    </div>
  );
}

export default AuctionDetail;
