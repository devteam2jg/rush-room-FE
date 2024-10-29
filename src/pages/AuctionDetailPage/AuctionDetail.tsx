import { Box } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import AuctionInfo from '../../components/AuctionInfo';
import AddAuction from '../../components/AddAuction';
import AuctionList from '../../components/AuctionList';
import AuctionHistoryStore from '../../store/AuctionHistoryStore';

function AuctionDetail() {
  const { auctionId } = useParams();
  const setLastAuction = AuctionHistoryStore((state) => state.setlastAuction);

  useEffect(() => {
    setLastAuction(auctionId);
  }, []);

  return (
    <Box height="calc(var(--vh, 1vh) * 100)">
      <AuctionInfo />
      <AddAuction />
      <Box h={4} />
      <AuctionList headerShow="show" fontColor="black" bgColor="white" />
    </Box>
  );
}

export default AuctionDetail;
