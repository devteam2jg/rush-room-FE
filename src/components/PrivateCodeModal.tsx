import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useCheckPrivateCode from '../hooks/useCheckPrivateCode';
import useShowToast from '../hooks/useShowToast';
import useAuctionStore from '../store/AuctionStore';
import SpringModal from './Modal/SpringModal';

interface AuctionData {
  isPrivate: boolean;
  isOwner: boolean;
  endorsed: boolean;
}

function PrivateCodeModal({ isPrivate, isOwner, endorsed }: AuctionData) {
  const nav = useNavigate();
  const showToast = useShowToast();
  const [inputPrivateCode, setInputPrivateCode] = useState(''); // 빈 문자열로 초기화
  const mutation = useCheckPrivateCode();
  const { updateField } = useAuctionStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    if (!isOpen && isPrivate && !isOwner && !endorsed) {
      setIsOpen(!isOpen);
    }
  };

  handleModalOpen();

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPrivateCode(e.target.value);
    updateField('privateCode', e.target.value);
  };

  const handleSubmit = () => {
    if (!inputPrivateCode) {
      showToast('Error', '비밀번호를 입력해 주세요!', 'error');
      return;
    }
    mutation.mutate();
  };

  return (
    <Box position="absolute">
      <SpringModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Heading>쉿! 비밀 방 입장하기</Heading>
        <Box pb={6}>
          <FormControl>
            <FormLabel>경매 방의 비밀번호를 입력해주세요</FormLabel>
            <Input
              type="text"
              value={inputPrivateCode}
              onChange={handlePasswordInput}
              placeholder="비밀번호를 입력하세요"
            />
          </FormControl>
        </Box>
        <Flex>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            입장하기
          </Button>
          <Button onClick={() => nav(-1)}>뒤로가기</Button>
        </Flex>
      </SpringModal>
    </Box>
  );
}
export default PrivateCodeModal;
