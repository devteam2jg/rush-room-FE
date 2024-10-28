import {
  Button,
  createStandaloneToast,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useUserAuctionStats from '../hooks/useUserAuctionStats';

interface AuctionItem {
  id: string;
  title: string;
  startPrice: number;
}

function UserGetItem() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const nav = useNavigate();
  const { toast } = createStandaloneToast();
  const { data, error, isPending } = useUserAuctionStats();
  console.log(data);
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
  return (
    <>
      <Button>
        <Flex
          align="center"
          justify="space-between"
          p={4}
          borderRadius="md"
          onClick={onOpen}
          cursor="pointer"
        >
          <Flex align="center">
            <Text fontSize="md">낙찰 물품 리스트</Text>
          </Flex>
          <Text>&gt;</Text>
        </Flex>
      </Button>
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>낙찰 물품 리스트</ModalHeader>
          <ModalCloseButton />
          {data.data.map((item: AuctionItem) => (
            <ModalBody key={item.id}>{item.title}</ModalBody>
          ))}
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default UserGetItem;
