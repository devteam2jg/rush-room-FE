import { Box, createStandaloneToast, Heading, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useAuctionDetail from '../hooks/useAuctionDetail';
import AuctionItemList from './AuctionItem/AuctionItemList';

interface AuctionListProps {
  fontColor: string;
  headerShow: string;
  bgColor: string;
}

export default function AuctionList({
  fontColor,
  headerShow,
  bgColor,
}: AuctionListProps) {
  const nav = useNavigate();
  const { toast } = createStandaloneToast();
  const { data, error, isPending } = useAuctionDetail();

  if (isPending) {
    return <div>Loading...!!</div>;
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
    <Box
      width="100%"
      marginBottom="20vh"
      p={4}
      height="calc(100vh - 20vh)"
      textAlign="center"
      color={fontColor}
      bg={bgColor}
      overflow="hidden"
    >
      <VStack
        width="100%"
        justifyContent="flex-start"
        spacing={4}
        alignItems="center"
        height="100%"
        overflowY="auto"
      >
        <Heading
          display={headerShow === 'show' ? 'block' : 'none'}
          as="h5"
          size="xm"
          textAlign="left"
          color="white"
          w="100%"
        >
          경매 물품 리스트
        </Heading>

        {data.items?.map((item) => (
          <AuctionItemList key={item.id} item={item} />
        ))}
      </VStack>
    </Box>
  );
}
