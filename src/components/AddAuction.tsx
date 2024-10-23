import { Box, Button, Heading, VStack } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

export default function AddAuction() {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <Box p={4} textAlign="center" bg="white">
      <VStack spacing={4} align="flex-start">
        <Heading as="h1" size="ms" textAlign="left">
          등록된 물품이 없어요. <br />
          버튼을 눌러 등록해 보세요.
        </Heading>
        <Heading as="h3" size="xs" color="GrayText" textAlign="left">
          누구든지 경매에 참여할 수 있어요.
        </Heading>

        <Box flex="1" />
      </VStack>

      <Box flex="1" h={1} />

      <Button
        fontSize="md"
        fontWeight="700"
        bg="#AA8EBF"
        color="white"
        width="240px"
        height="40px"
        onClick={() => {
          navigate(`/auction/${id}/create`);
        }}
      >
        등록하기
      </Button>
    </Box>
  );
}
