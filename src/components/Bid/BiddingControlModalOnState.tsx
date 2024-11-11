import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BiddingItemResult, { WinnerProps } from './BiddingItemResult';
import SpringModal from '../Modal/SpringModal';
import BiddingWaiting from './BiddingWaiting';
import useSocketStore from '../../store/useSocketStore';
import useConfetti from '../../hooks/useConfetti';

interface ModalProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setInfoOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setItemOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function BiddingControlModalOnState({
  setOpen,
  setInfoOpen,
  setItemOpen,
}: ModalProps) {
  const { auctionId } = useParams();
  const [openResult, setOpenResult] = useState(false);
  const [openReady, setOpenReady] = useState(false);
  const [winnerInfo, setWinnerInfo] = useState<WinnerProps | null>(null);
  const socket = useSocketStore((state) => state.socket);
  const nav = useNavigate();
  const { confetti } = useConfetti();

  const handleConffeti = () => {
    confetti?.addConfetti({
      confettiColors: [
        '#ff0a54',
        '#ff477e',
        '#ff7096',
        '#ff85a1',
        '#fbb1bd',
        '#f9bec7',
      ],
      confettiRadius: 5,
      confettiNumber: 500,
    });
  };

  const handleSadConffeti = () => {
    confetti?.addConfetti({
      emojis: ['😢', '🥲', '😭', '🥺'],
      emojiSize: 80,
      confettiNumber: 30,
    });
  };

  useEffect(() => {
    if (!socket) return undefined;
    const handleNotiState = (response: any) => {
      const { type } = response;

      switch (type) {
        case 'BID_READY':
          setOpenResult(false);
          setOpenReady(true);
          break;
        case 'BID_START':
          setOpenReady(false);
          break;
        case 'BID_END':
          setOpen(false);
          setInfoOpen(false);
          setItemOpen(false);
          setWinnerInfo(response);
          setOpenResult(true);
          if (response.name) {
            handleConffeti();
          } else {
            handleSadConffeti();
          }
          break;
        case 'AUCTION_END':
          nav('/');
          break;
        default:
        // 213
      }
    };

    socket.on('NOTIFICATION', handleNotiState);

    const sendModalRequest = {
      auctionId,
      type: 'MODAL',
    };

    socket.emit('CONTEXT', sendModalRequest);

    return () => {
      socket.off('NOTIFICATION', handleNotiState);
    };
  }, [socket]);

  return (
    <>
      <SpringModal p="" isOpen={openResult} setIsOpen={setOpenResult}>
        <BiddingItemResult winnerInfo={winnerInfo} />
      </SpringModal>
      <SpringModal p="" isOpen={openReady} setIsOpen={setOpenReady}>
        <BiddingWaiting />
      </SpringModal>
    </>
  );
}

export default BiddingControlModalOnState;
