import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditAuctionAlert() {
  const { auctionId } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const nav = useNavigate();

  const handleEditAuction = () => {
    nav(`/auction/edit/${auctionId}`);
    console.log('경매 수정하기');
  };

  return (
    <>
      <Button onClick={onOpen}>수정하기</Button>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>경매 수정하기</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>경매 내용을 수정하시겠습니까?</AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={onClose}>No</Button>
            <Button colorScheme="red" ml={3} onClick={handleEditAuction}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
