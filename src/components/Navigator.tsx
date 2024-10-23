import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function Navigator() {
  const navigate = useNavigate();

  return (
    <Box
      position="fixed"
      bottom={2}
      left={2}
      right={2}
      bg="white"
      shadow="lg"
      borderTop="1px solid"
      borderColor="gray.200"
      borderRadius={15}
    >
      <Flex justify="space-around" align="center" p={2}>
        <Flex
          direction="column"
          align="center"
          onClick={() => navigate('/')}
          cursor="pointer"
        >
          <Image src="images/home_icon.png" alt="홈" boxSize="24px" />
          <Text fontSize="xs">홈</Text>
        </Flex>

        <Flex
          direction="column"
          align="center"
          onClick={() => navigate('/auction')}
          cursor="pointer"
        >
          <Image src="images/list_icon.png" alt="경매 리스트" boxSize="24px" />
          <Text fontSize="xs">경매 리스트</Text>
        </Flex>

        <Flex
          direction="column"
          align="center"
          onClick={() => navigate('/auction')}
          cursor="pointer"
        >
          <Image src="images/add_icon.png" alt="새로운 경매" boxSize="24px" />
          <Text fontSize="xs">새로운 경매</Text>
        </Flex>

        <Flex
          direction="column"
          align="center"
          onClick={() => navigate('/')}
          cursor="pointer"
        >
          <Image
            src="images/participant_icon.png"
            alt="참여중 경매"
            boxSize="24px"
          />
          <Text fontSize="xs">참여중 경매</Text>
        </Flex>

        <Flex
          direction="column"
          align="center"
          onClick={() => navigate('/')}
          cursor="pointer"
        >
          <Image src="images/mypage_icon.png" alt="마이페이지" boxSize="24px" />
          <Text fontSize="xs">마이페이지</Text>
        </Flex>
      </Flex>
    </Box>
  );
}
