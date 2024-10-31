import { Box, createStandaloneToast } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import AuctionInfo from '../../components/AuctionInfo';
import AddAuction from '../../components/AddAuction';
import AuctionList from '../../components/AuctionList';
import AuctionHistoryStore from '../../store/AuctionHistoryStore';
import useAuctionDetail from '../../hooks/useAuctionDetail';
import PrivateCodeModal from '../../components/PrivateCodeModal';


function AuctionDetail() {
  const { auctionId } = useParams();
  const setLastAuction = AuctionHistoryStore((state) => state.setlastAuction);
  const { data, error, isPending } = useAuctionDetail();
  const nav = useNavigate();
  const { toast } = createStandaloneToast();

  useEffect(() => {
    setLastAuction(auctionId);
  }, []);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    nav('/');
    toast({
      title: '실패',
      description: `${error.message}`,
      status: 'error',
      variant: 'left-accent',
      duration: 3000,
      isClosable: true,
    });
  }

  return (
    <Box height="calc(var(--vh, 1vh) * 100)">
      <PrivateCodeModal />
      <AuctionInfo />
      <AddAuction data={data} isOwner={data.readUser.isOwner} />
      <Box h={4} />
      <AuctionList headerShow="show" fontColor="black" bgColor="white" />
    </Box>
  );
}

export default AuctionDetail;
