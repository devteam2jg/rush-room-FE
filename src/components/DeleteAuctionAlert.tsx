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
import { useNavigate } from 'react-router-dom';
import useDeleteAuction from '../hooks/useDeleteAuction';

export default function DeleteAuction() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const nav = useNavigate();
  const { deleteAuction } = useDeleteAuction();

  const handleDeleteAuction = () => {
    deleteAuction();
    nav(`/overview`);
    console.log('경매 삭제 완료');
  };

  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        삭제하기
      </Button>

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>경매 삭제하기</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>경매를 삭제하시겠습니까?</AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={onClose}>No</Button>
            <Button colorScheme="red" ml={3} onClick={handleDeleteAuction}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}