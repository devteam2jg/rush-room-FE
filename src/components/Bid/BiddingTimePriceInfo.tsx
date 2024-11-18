import { HStack, Image, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState, useRef, memo } from 'react';
import { useParams } from 'react-router-dom';
import { motion, animate } from 'framer-motion';
import useSocketStore from '../../store/useSocketStore';
import useAuthStore from '../../store/UserAuthStore';
import Coin from '../../assets/images/coin.gif';
import coinSound from '../../assets/audio/coinEffect.wav';
import AudioVolumeController from './AudioVolumeController';

export type PriceData = {
  bidPrice: number;
  bidderNickname: string;
  budget: number;
};

interface PriceProps {
  initialItemPrice: number | undefined;
}

function BiddingTimePriceInfo({ initialItemPrice }: PriceProps) {
  const { auctionId } = useParams();
  const socket = useSocketStore((state) => state.socket);
  const [recievedPrice, setRecievedPrice] = useState(0);
  const [showGif, setShowGif] = useState(false);
  const [displayPrice, setDisplayPrice] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const previousPrice = useRef(0);
  const [bidder, setBidder] = useState('');
  const user = useAuthStore((state) => state.user);

  const audioPool = useRef<HTMLAudioElement[]>([]);
  const currentAudioIndex = useRef(0);

  const initAudioPool = () => {
    if (audioPool.current.length === 0) {
      const AUDIO_POOL_SIZE = 3;
      audioPool.current = Array(AUDIO_POOL_SIZE)
        .fill(null)
        .map(() => {
          const audio = new Audio(coinSound);
          audio.volume = 0.1;
          return audio;
        });
    }
  };

  useEffect(() => {
    return () => {
      audioPool.current.forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
        audio.src = '';
        audio.load();
      });
      audioPool.current = [];
    };
  }, []);

  const playNextAudio = () => {
    if (audioPool.current.length === 0) {
      initAudioPool();
    }

    const currentAudio = audioPool.current[currentAudioIndex.current];
    currentAudio.currentTime = 0;

    currentAudio.play().catch((error) => {
      console.error('오디오 재생 실패:', error);
    });

    currentAudioIndex.current =
      (currentAudioIndex.current + 1) % audioPool.current.length;
  };

  const animatePrice = (fromPrice: number, toPrice: number) => {
    setAnimationKey((prev) => prev + 1);
    previousPrice.current = fromPrice;
    setRecievedPrice(toPrice);

    animate(fromPrice, toPrice, {
      duration: 0.8,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplayPrice(Math.round(latest)),
      onComplete: () => setShowGif(false),
    });
  };

  useEffect(() => {
    if (!socket) return undefined;

    const hanldItemPriceRecieve = (response: any) => {
      const { type } = response;

      if (type === 'BID_START') {
        const startPrice = response.bidPrice;
        animatePrice(startPrice * 0.98, startPrice);
        setBidder('');
      }
    };

    const handleItemPriceBidderRecieve = (priceData: PriceData) => {
      const newPrice = priceData.bidPrice;
      animatePrice(newPrice * 0.98, newPrice);
      setBidder(priceData.bidderNickname);
      playNextAudio();
      setShowGif(true);
    };

    socket.on('NOTIFICATION', hanldItemPriceRecieve);
    socket.on('PRICE_UPDATE', handleItemPriceBidderRecieve);

    const sendBiddingRequest = {
      auctionId,
      type: 'INFO',
      userId: user?.id,
    };

    const handleCurrentBid = (response: any) => {
      const currentPrice = response.bidPrice;
      animatePrice(currentPrice * 0.98, currentPrice);
    };

    socket.emit('CONTEXT', sendBiddingRequest, handleCurrentBid);

    return () => {
      socket.off('NOTIFICATION', hanldItemPriceRecieve);
      socket.off('PRICE_UPDATE', handleItemPriceBidderRecieve);
    };
  }, [socket]);

  useEffect(() => {
    if (initialItemPrice) {
      animatePrice(initialItemPrice * 0.98, initialItemPrice);
    }
  }, [initialItemPrice]);

  return (
    <>
      <AudioVolumeController audioPool={audioPool.current} />
      <VStack
        gap={{ base: '1.5', sm: '0.5' }}
        justifyContent="center"
        alignItems="start"
      >
        <HStack fontWeight="700" fontSize={{ base: '15px', sm: '20px' }}>
          {bidder ? <Text color="#FCFCFD">최고 입찰자 : </Text> : null}
          <Text isTruncated color="#886CB5">
            {bidder}
          </Text>
        </HStack>

        <motion.div
          key={animationKey}
          initial={{ opacity: 0, scale: 3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <HStack>
            <Text
              fontWeight="700"
              fontSize={{ base: '20px', sm: '25px' }}
              color="#F1D849"
            >
              {(displayPrice || initialItemPrice)?.toLocaleString()} 원
            </Text>
            <Image
              display={showGif ? 'block' : 'none'}
              width={{ base: '30px', sm: '40px' }}
              src={Coin}
            />
          </HStack>
        </motion.div>
      </VStack>
    </>
  );
}

export default memo(BiddingTimePriceInfo);
