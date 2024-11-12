import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SpringModal from './Modal/SpringModal';

export default function EditAuctionAlert() {
  const { auctionId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const nav = useNavigate();

  const handleEditAuction = () => {
    nav(`/auction/edit/${auctionId}`);
    console.log('경매 수정하기');
  };

  return (
    <>
      <Button onClick={() => setIsOpen(!isOpen)}>수정하기</Button>

      <SpringModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Box bgColor="#222222" p={6} display="flex" flexDirection="column">
          <Text color="white" textAlign="center" mb={4}>
            경매 내용을 수정하시겠습니까?
          </Text>
          <Flex gap={2} justifyContent="flex-end" width="100%">
            <Button onClick={() => setIsOpen(!isOpen)}>취소하기</Button>
            <Button colorScheme="red" ml={3} onClick={handleEditAuction}>
              수정하기
            </Button>
          </Flex>
        </Box>
      </SpringModal>
    </>
  );
}
