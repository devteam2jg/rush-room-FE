import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  createStandaloneToast,
  Divider,
  Flex,
  HStack,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import DragCloseDrawer from '../Drawer/DragCloseDrawer';
import useItemInfo from '../../hooks/Bid/useItemInfo';
import useSocketStore from '../../store/useSocketStore';
import BiddingImage from '../Bidding/BiddingImage';

interface InfoProps {
  initialItemId: string | undefined;
  setInfoOpen: Dispatch<SetStateAction<boolean>>;
  infoOpen: boolean;
}

function BiddingInfo({ initialItemId, infoOpen, setInfoOpen }: InfoProps) {
  const [reciecvedId, setRecievedId] = useState('');
  const { auctionId } = useParams();
  const socket = useSocketStore((state) => state.socket);
  const { data, error, isPending } = useItemInfo(
    reciecvedId ? { reciecvedId } : { reciecvedId: initialItemId }
  );
  const nav = useNavigate();
  const { toast } = createStandaloneToast();

  console.log(data);

  useEffect(() => {
    if (!auctionId || !socket) return undefined;

    const hanldItemIdRecieve = (response: any) => {
      const { type } = response;
      if (type === 'BID_START') {
        setRecievedId(response.itemId);
      }
    };

    socket.on('NOTIFICATION', hanldItemIdRecieve);

    return () => {
      socket.off('NOTIFICATION', hanldItemIdRecieve);
    };
  }, [socket]);

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
    <DragCloseDrawer
      h=""
      open={infoOpen}
      setOpen={setInfoOpen}
      heightValue="60vh"
    >
      <Box height="100%">
        <Box borderRadius="15px 15px 0 0" color="#E3E3E3" bg="#282828">
          <Flex>
            <HStack
              justifyContent="space-between"
              padding={{ base: '12px' }}
              alignItems="center"
              width="100%"
              top={0}
              position="sticky"
            >
              <Flex
                justifyContent="center"
                alignItems="center"
                gap={{ base: '10px', sm: '22px' }}
              >
                <Avatar src={data.postedUser.profileUrl} />
                <Text fontWeight="700" fontSize={{ base: '18px', sm: '20px' }}>
                  {data.postedUser.nickname}
                </Text>
              </Flex>
              <Button
                fontWeight="700"
                color="white"
                backgroundColor="#B9A5E2"
                size="md"
              >
                프로필
              </Button>
            </HStack>
          </Flex>
          <Divider borderColor="#494949" />
        </Box>
        <Box
          color="#E5E5E5"
          bg="#222222"
          overflow="auto"
          height="calc(60vh - 48px)"
        >
          <Box height="12px" bg="#161617" />
          <BiddingImage images={data.imageUrls} />
          <Box height="12px" bg="#161617" />
          <Box padding="12px">
            <Text fontSize={{ base: '16px', sm: '18px' }} fontWeight="700">
              물품 제목
            </Text>
            <Text fontSize={{ base: '14px', sm: '16px' }} fontWeight="500">
              {data.title}
            </Text>
          </Box>
          <Box height="12px" bg="#161617" />
          <Box padding="12px">
            <Text fontSize={{ base: '16px', sm: '18px' }} fontWeight="700">
              물품 상세
            </Text>
            <Text fontSize={{ base: '14px', sm: '16px' }} fontWeight="500">
              {data.description}
            </Text>
          </Box>
        </Box>
      </Box>
    </DragCloseDrawer>
  );
}

export default BiddingInfo;
