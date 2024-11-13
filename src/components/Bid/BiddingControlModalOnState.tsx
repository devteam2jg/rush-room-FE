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
  const [rushAudio] = useState(new Audio('/sounds/rush.wav'));
  const [waitingAudio] = useState(new Audio('/sounds/waitingVer1.wav'));
  const [successAudio] = useState(new Audio('/sounds/congraturation.wav'));
  const [failAudio] = useState(new Audio('/sounds/none.wav'));

  // const confetti = new JSConfetti();

  console.log('confetti', confetti);

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

  const handleSuccessSound = () => {
    successAudio.play().catch((error) => {
      console.error('오디오 재생 실패:', error);
    });
  };

  const handleSadSound = () => {
    failAudio.play().catch((error) => {
      console.error('오디오 재생 실패:', error);
    });
  };

  useEffect(() => {
    if (!socket) return undefined;
    const handleNotiState = (response: any) => {
      const { type } = response;

      console.log(response);

      switch (type) {
        case 'BID_READY':
          setOpenResult(false);
          setOpenReady(true);
          waitingAudio.play().catch((error) => {
            console.error('오디오 재생 실패:', error);
          });
          break;
        case 'BID_START':
          setOpenReady(false);
          waitingAudio.pause();
          waitingAudio.currentTime = 0;
          break;
        case 'RUSH_TIME':
          rushAudio.play().catch((error) => {
            console.error('오디오 재생 실패:', error);
          });
          break;
        case 'BID_END':
          setOpen(false);
          setInfoOpen(false);
          setItemOpen(false);
          setWinnerInfo(response);
          setOpenResult(true);
          if (response.name) {
            console.log('샀다');
            handleConffeti();
            handleSuccessSound();
          } else {
            handleSadConffeti();
            handleSadSound();
          }
          break;
        case 'AUCTION_END':
          nav('/');
          break;
        default:
          console.log('UNKHOWN STATUS ERROR');
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
      waitingAudio.pause();
      rushAudio.pause();
      successAudio.pause();
      failAudio.pause();
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
      {/* <SpringModal p="" isOpen={openReady} setIsOpen={setOpenReady}>
        <BiddingFinalResult />
      </SpringModal> */}
    </>
  );
}

export default BiddingControlModalOnState;
