import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import BiddingItemResult, { WinnerProps } from './BiddingItemResult';
import SpringModal from '../Modal/SpringModal';
import BiddingWaiting from './BiddingWaiting';
import useSocketStore from '../../store/useSocketStore';
import useConfetti from '../../hooks/useConfetti';
import BiddingResult from './BiddingResult';

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
  const [openEnd, setOpenEnd] = useState(false);
  const [resultInfo, setResultInfo] = useState([]);
  const [winnerInfo, setWinnerInfo] = useState<WinnerProps | null>(null);
  const socket = useSocketStore((state) => state.socket);
  const { confetti } = useConfetti();

  const rushAudioRef = useRef(new Audio('/sounds/rushTimeBgm.wav'));
  const waitingAudioRef = useRef(new Audio('/sounds/waitingVer1.wav'));
  const successAudioRef = useRef(new Audio('/sounds/congraturation.wav'));
  const failAudioRef = useRef(new Audio('/sounds/none.wav'));
  const resultAudioRef = useRef(new Audio('/sounds/result.mp3'));

  // Set fixed volume and loop for audio elements
  useEffect(() => {
    rushAudioRef.current.loop = true;

    // rush 오디오만 다른 볼륨으로 설정
    rushAudioRef.current.volume = 0.05; // rushtime 볼륨 0.3으로 설정
    resultAudioRef.current.volume = 0.1;

    const otherAudioRefs = [waitingAudioRef, successAudioRef, failAudioRef];
    otherAudioRefs.forEach((ref) => {
      ref.current.volume = 0.3;
    });
  }, []);

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
    successAudioRef.current.play().catch((error) => {
      console.error('오디오 재생 실패:', error);
    });
  };

  const handleSadSound = () => {
    failAudioRef.current.play().catch((error) => {
      console.error('오디오 재생 실패:', error);
    });
  };

  const handleResultSound = () => {
    resultAudioRef.current.play().catch((error) => {
      console.error('오디오 재생 실패:', error);
    });
  };

  const handleRushSound = () => {
    rushAudioRef.current.play().catch((error) => {
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
          waitingAudioRef.current.play().catch((error) => {
            console.error('오디오 재생 실패:', error);
          });
          break;
        case 'BID_START':
          setOpenReady(false);
          waitingAudioRef.current.pause();
          waitingAudioRef.current.currentTime = 0;
          break;
        case 'RUSH_TIME':
          handleRushSound();
          break;
        case 'BID_END':
          rushAudioRef.current.pause();
          rushAudioRef.current.currentTime = 0;

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
          console.log(response);
          setResultInfo(response.data);
          setOpenEnd(true);
          handleResultSound();
          handleConffeti();
          break;
        default:
          console.log('UNKNOWN STATUS ERROR');
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
      const audioRefs = [
        waitingAudioRef,
        rushAudioRef,
        successAudioRef,
        failAudioRef,
        resultAudioRef,
      ];
      audioRefs.forEach((ref) => {
        ref.current.pause();
        ref.current.currentTime = 0;
      });
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
      <SpringModal p="" isOpen={openEnd} setIsOpen={setOpenEnd}>
        <BiddingResult resultInfo={resultInfo} />
      </SpringModal>
    </>
  );
}

export default BiddingControlModalOnState;
