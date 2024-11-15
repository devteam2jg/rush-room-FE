import { Box, createStandaloneToast, Spinner, VStack } from '@chakra-ui/react';
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
    return <Spinner />;
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
    <VStack
      width="100%"
      // overflowY="auto"
      height="calc(var(--vh, 1vh) * 100)"
      position="relative"
      overflow="hidden"
      bg="#282828"
      alignItems="center"
      justifyContent="space-between"
    >
      {/* <PrivateCodeModal
        isPrivate={data.auctionDto.isPrivate}
        isOwner={data.readUser.isOwner}
        endorsed={data.readUser.endorsed}
      /> */}
      <AuctionInfo />
      <AddAuction data={data} isOwner={data?.readUser.isOwner} />
      <Box h={4} bgColor="#161617" />
      <Box height="100vh">
        <AuctionList headerShow="show" fontColor="white" bgColor="#282828" />
      </Box>
    </VStack>
  );
}

export default AuctionDetail;
