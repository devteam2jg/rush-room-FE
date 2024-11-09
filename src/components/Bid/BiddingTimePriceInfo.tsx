import { HStack, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useSocketStore from '../../store/useSocketStore';

export type PriceData = {
  bidPrice: number;
  bidderNickname: string;
  budget: number;
};

interface PriceProps {
  initialItemPrice: number | undefined;
}

function BiddingTimePriceInfo({ initialItemPrice }: PriceProps) {
  const socket = useSocketStore((state) => state.socket);
  const [recievedPrice, setRecievedPrice] = useState(0);
  const [bidder, setBidder] = useState('');

  useEffect(() => {
    if (!socket) return undefined;

    const hanldItemPriceRecieve = (response: any) => {
      const { type } = response;

      if (type === 'BID_START') {
        setRecievedPrice(response.bidPrice);
        setBidder('');
      }
    };

    const handleItemPriceBidderRecieve = (priceData: PriceData) => {
      setRecievedPrice(priceData.bidPrice);
      setBidder(priceData.bidderNickname);
      console.log('PRICE_UPDATE');
    };

    socket.on('NOTIFICATION', hanldItemPriceRecieve);

    socket?.on('PRICE_UPDATE', handleItemPriceBidderRecieve);

    return () => {
      socket.off('NOTIFICATION', hanldItemPriceRecieve);
      socket.off('PRICE_UPDATE', handleItemPriceBidderRecieve);
    };
  }, [socket]);

  return (
    <VStack gap={-1} justifyContent="center" alignItems="start">
      <Text
        fontWeight="700"
        fontSize={{ base: '20px', md: '22px' }}
        color="#F1D849"
      >
        {recievedPrice || initialItemPrice} 크레딧
      </Text>

      <HStack fontWeight="700" fontSize={{ base: '15px', md: '18px' }}>
        {bidder ? <Text color="#FCFCFD">최고 입찰자 : </Text> : null}
        <Text color="#886CB5">{bidder}</Text>
      </HStack>
    </VStack>
  );
}

export default BiddingTimePriceInfo;
