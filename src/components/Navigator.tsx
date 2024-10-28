import { Box, Flex, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { IoIosList, IoIosAddCircleOutline } from 'react-icons/io';
import { MdInput } from 'react-icons/md';
import { FaRegUserCircle } from 'react-icons/fa';
import { FiHome } from 'react-icons/fi';

import useAuthStore from '../store/UserAuthStore';

export default function Navigator() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  return (
    <Box
      position="fixed"
      bottom={2}
      left={2}
      right={2}
      bg="white"
      boxShadow="2xl"
      border="2px solid"
      borderColor="gray.100"
      borderRadius={15}
    >
      <Flex justify="space-around" align="center" p={2}>
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
          onClick={() => navigate('/')}
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
