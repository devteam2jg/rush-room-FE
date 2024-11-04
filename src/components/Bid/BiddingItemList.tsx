import { Box, createStandaloneToast, Text } from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';
import { Dispatch, SetStateAction } from 'react';
import useAuctionDetail from '../../hooks/useAuctionDetail';

import { AuctionItem } from '../../utils/types';
import BiddingItemInfo from './BiddingItemInfo';
import DragCloseDrawer from '../Drawer/DragCloseDrawer';

interface ItemProps {
  itemOpen: boolean;
  setItemOpen: Dispatch<SetStateAction<boolean>>;
}

function BiddingItemList({ itemOpen, setItemOpen }: ItemProps) {
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
    <DragCloseDrawer
      h=""
      open={itemOpen}
      setOpen={setItemOpen}
      heightValue="50vh"
    >
      <Box width="100%" padding="12px">
        <Text
          fontSize={{ base: '18px', sm: '20px' }}
          fontWeight="700"
          color="#FCFCFD"
        >
          경매 리스트
        </Text>
      </Box>
      <Box overflow="auto" height="40vh">
        {data.items?.map((item: AuctionItem) => (
          <BiddingItemInfo key={item.id} item={item} />
        ))}
      </Box>
    </DragCloseDrawer>
  );
}

export default BiddingItemList;
