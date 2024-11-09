import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Avatar,
  createStandaloneToast,
  Flex,
  Spinner,
  Text,
} from '@chakra-ui/react';
import useSocketStore from '../../store/useSocketStore';
import useItemInfo from '../../hooks/Bid/useItemInfo';

interface HeaderProps {
  initialItemId: string | undefined;
}

function BidHeader({ initialItemId }: HeaderProps) {
  const [reciecvedId, setRecievedId] = useState('');
  const { auctionId } = useParams();
  const socket = useSocketStore((state) => state.socket);
  const { data, error, isPending } = useItemInfo(
    reciecvedId ? { reciecvedId } : { reciecvedId: initialItemId }
  );
  const nav = useNavigate();
  const { toast } = createStandaloneToast();

  useEffect(() => {
    if (!auctionId || !socket) return undefined;

    const hanldItemIdRecieveHeader = (response: any) => {
      const { type } = response;
      if (type === 'BID_START') {
        setRecievedId(response.itemId);
      }
    };

    socket.on('NOTIFICATION', hanldItemIdRecieveHeader);

    return () => {
      socket.off('NOTIFICATION', hanldItemIdRecieveHeader);
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
    <Flex
      justifyContent="flex-start"
      alignItems="center"
      gap={{ base: '10px', sm: '22px' }}
    >
      <Avatar src={data.postedUser.profileUrl} />
      <Text
        color="#FCFCFD"
        fontWeight="700"
        fontSize={{ base: '18px', sm: '20px' }}
      >
        {data.postedUser.nickname}
      </Text>
    </Flex>
  );
}

export default BidHeader;
