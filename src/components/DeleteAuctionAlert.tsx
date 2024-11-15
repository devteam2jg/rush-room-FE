import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDeleteAuction from '../hooks/useDeleteAuction';
import SpringModal from './Modal/SpringModal';

export default function DeleteAuction() {
  const [isOpen, setIsOpen] = useState(false);
  const nav = useNavigate();
  const { deleteAuction } = useDeleteAuction();

  const handleDeleteAuction = () => {
    deleteAuction();
    nav(`/overview`);
  };

  return (
    <>
      <Button colorScheme="red" onClick={() => setIsOpen(!isOpen)}>
        삭제하기
      </Button>

      <SpringModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Box bgColor="#222222" p={6} display="flex" flexDirection="column">
          <Text color="white" textAlign="center" mb={4}>
            경매를 삭제하시겠습니까?
          </Text>
          <Flex gap={2} justifyContent="flex-end" width="100%">
            <Button onClick={() => setIsOpen(!isOpen)}>취소하기</Button>
            <Button colorScheme="red" ml={3} onClick={handleDeleteAuction}>
              삭제하기
            </Button>
          </Flex>
        </Box>
      </SpringModal>
    </>
  );
}
