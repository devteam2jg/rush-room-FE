import { useNavigate } from 'react-router-dom';
import { Box, createStandaloneToast, Flex } from '@chakra-ui/react';
import useBidItemInfo from '../../hooks/useBidItemInfo';
import BiddingImage from '../../components/Bidding/BiddingImage';
import AuctionItemInfo from '../../components/AuctionItem/AuctionItemInfo';

function AuctionItemDetail() {
  const { data, error, isPending } = useBidItemInfo();
  const nav = useNavigate();
  const { toast } = createStandaloneToast();

  if (isPending) {
    return <div>Loading ...</div>;
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
    <Flex height="100vh" flexDirection="column">
      <BiddingImage images={data?.imageUrls} />
      <Box flex={1}>
        <AuctionItemInfo />
      </Box>
    </Flex>
  );
}

export default AuctionItemDetail;
