import { Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface PriceProps {
  originalPrice: number;
  currentPrice: number;
}

function BiddingPrice({ currentPrice, originalPrice }: PriceProps) {
  const [priceShown, setPriceShown] = useState(0);

  useEffect(() => {
    setPriceShown(currentPrice);
  }, [currentPrice]);

  return (
    <Flex fontSize={{ base: '13px', md: '20px' }} fontWeight="700">
      <Text
        borderRadius="15px 0  0 15px"
        p={2}
        backgroundColor="#F1D849"
        color="#FCFCFD"
      >
        현재가
      </Text>
      <Text
        borderRadius=" 0 15px 15px 0 "
        p={2}
        backgroundColor="rgba(21, 21, 21, 0.6)"
        color="#FCFCFD"
      >
        {priceShown ? priceShown.toLocaleString() : originalPrice}
      </Text>
    </Flex>
  );
}

export default BiddingPrice;
