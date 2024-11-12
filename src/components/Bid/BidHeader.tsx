import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  createStandaloneToast,
  Flex,
  HStack,
  Spinner,
  Text,
} from '@chakra-ui/react';
import useSocketStore from '../../store/useSocketStore';
import useItemInfo from '../../hooks/Bid/useItemInfo';
import axiosInstance from '../../utils/AxiosInstance';
import useAuthStore from '../../store/UserAuthStore';

interface HeaderProps {
  initialItemId: string | undefined;
}

function BidHeader({ initialItemId }: HeaderProps) {
  const [reciecvedId, setRecievedId] = useState('');
  const [isOwner, setIsOwer] = useState(false);
  const { auctionId } = useParams();
  const socket = useSocketStore((state) => state.socket);
  const { data, error, isPending } = useItemInfo(
    reciecvedId ? { reciecvedId } : { reciecvedId: initialItemId }
  );
  const nav = useNavigate();
  const { toast } = createStandaloneToast();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!auctionId || !socket) return undefined;

    const hanldItemIdRecieveHeader = (response: any) => {
      const { type } = response;
      if (type === 'BID_START') {
        setRecievedId(response.itemId);
      }
    };

    const AuthInfo = {
      type: 'OWNER',
      auctionId,
      userId: user?.id,
    };

    const handleAuctionAuthentication = (response) => {
      setIsOwer(response.isOwner);
    };

    socket.on('NOTIFICATION', hanldItemIdRecieveHeader);
    socket.emit('CONTEXT', AuthInfo, handleAuctionAuthentication);

    return () => {
      setIsOwer(false);
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

  const biddingSkip = async () => {
    try {
      await axiosInstance.get(`/game/skip/${auctionId}`);
      return { success: true, message: '스킵 성공' };
    } catch (isError) {
      return { success: false, message: '스킵 중 오류가 발생했습니다.' };
    }
  };

  const handleSkip = async () => {
    const result = await biddingSkip();
    if (result.success) {
      toast({
        title: '시스템',
        description: '아이템이 스킵되었습니다.',
        status: 'success',
        variant: 'left-accent',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    } else {
      toast({
        title: '시스템',
        description: '아이템 스킵에 실패하였습니다.',
        status: 'error',
        variant: 'left-accent',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  return (
    <HStack width="100%" justifyContent="space-between">
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
      <Button
        display={isOwner ? 'block' : 'none'}
        color="#FCFCFD"
        colorScheme="mong"
        onClick={handleSkip}
      >
        스킵
      </Button>
    </HStack>
  );
}

export default BidHeader;
