import {
  Button,
  createStandaloneToast,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useAuctionDetail from '../hooks/useAuctionDetail';
import useCheckPrivateCode from '../hooks/useCheckPrivateCode';
import useShowToast from '../hooks/useShowToast';
import useAuctionStore from '../store/AuctionStore';

function PrivateCodeModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const nav = useNavigate();
  const showToast = useShowToast();
  const { toast } = createStandaloneToast();
  const { data, error, isPending } = useAuctionDetail();
  const [inputPrivateCode, setInputPrivateCode] = useState(''); // 빈 문자열로 초기화
  const mutation = useCheckPrivateCode();
  const { updateField } = useAuctionStore();

  if (isPending) {
    return <div>Loading...!!</div>;
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
  const handleModalOpen = () => {
    if (
      !isOpen &&
      data.auctionDto.isPrivate &&
      !data.readUser.isOwner &&
      !data.readUser.endorsed
    ) {
      onOpen();
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
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>쉿! 비밀 방 입장하기</ModalHeader>
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>경매 방의 비밀번호를 입력해주세요</FormLabel>
            <Input
              type="text"
              value={inputPrivateCode}
              onChange={handlePasswordInput}
              placeholder="비밀번호를 입력하세요"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            입장하기
          </Button>
          <Button onClick={() => nav(-1)}>뒤로가기</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
export default PrivateCodeModal;
