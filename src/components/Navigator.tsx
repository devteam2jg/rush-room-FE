import { Box, createStandaloneToast, Flex, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { IoIosList, IoIosAddCircleOutline } from 'react-icons/io';
import { MdInput } from 'react-icons/md';
import { FaRegUserCircle } from 'react-icons/fa';
import { FiHome } from 'react-icons/fi';

import useAuthStore from '../store/UserAuthStore';
import AuctionHistoryStore from '../store/AuctionHistoryStore';

export default function Navigator() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const history = AuctionHistoryStore((state) => state.lastAuction);
  const { toast } = createStandaloneToast();
  const nav = useNavigate();

  const handleHistoryAuction = () => {
    if (history) {
      navigate(`/auction/${history}/bid`);
    } else {
      nav('/');
      toast({
        title: '실패',
        description: '참여한 경매가 없습니다.',
        status: 'error',
        variant: 'left-accent',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      position="absolute"
      bottom={2}
      left={2}
      right={2}
      bg="#282828"
      boxShadow="2xl"
      border="2px solid"
      borderColor="gray.100"
      borderRadius={15}
      zIndex={1000}
    >
      <Flex justify="space-around" align="center" p={2} color="white">
        <Flex
          direction="column"
          align="center"
          onClick={() => navigate('/')}
          cursor="pointer"
        >
          <FiHome />
          <Text fontSize="xs">홈</Text>
        </Flex>

        <Flex
          direction="column"
          align="center"
          onClick={() => navigate('/overview')}
          cursor="pointer"
        >
          <IoIosList />
          <Text fontSize="xs">경매 리스트</Text>
        </Flex>

        <Flex
          direction="column"
          align="center"
          onClick={() => navigate('/auction')}
          cursor="pointer"
        >
          <IoIosAddCircleOutline />
          <Text fontSize="xs">새로운 경매</Text>
        </Flex>

        <Flex
          direction="column"
          align="center"
          onClick={handleHistoryAuction}
          cursor="pointer"
        >
          <MdInput />

          <Text fontSize="xs">참여중 경매</Text>
        </Flex>

        <Flex
          direction="column"
          align="center"
          onClick={() => navigate(`/myPage/${user?.id}`)}
          cursor="pointer"
        >
          <FaRegUserCircle />
          <Text fontSize="xs">마이페이지</Text>
        </Flex>
      </Flex>
    </Box>
  );
}
