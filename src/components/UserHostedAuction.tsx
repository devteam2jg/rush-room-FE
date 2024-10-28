import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  createStandaloneToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useAuction from '../hooks/useAuction';

interface Auction {
  id: string;
  title: string;
  description: string;
  eventDate: string;
  sellingLimitTime: number;
  status: string;
  isPrivate: boolean;
}

function UserHostedAuction() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const nav = useNavigate();
  const { toast } = createStandaloneToast();
  const { data, error, isPending } = useAuction();
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
      <Button onClick={onOpen}>
        <Flex align="center" justify="space-between" p={4} borderRadius="md">
          <Flex align="center">
            <Text fontSize="md">주최 경매 리스트</Text>
          </Flex>
          <Text>&gt;</Text>
        </Flex>
      </Button>

      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>주최 경매 리스트</ModalHeader>
          <ModalCloseButton />
          {data.data.map((item: { auctionDto: Auction }) => (
            <ModalBody key={item.auctionDto.id}>
              {item.auctionDto.title}
            </ModalBody>
          ))}
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default UserHostedAuction;
