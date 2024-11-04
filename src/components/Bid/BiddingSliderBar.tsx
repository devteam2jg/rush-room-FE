import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';

interface SliderProps {
  bid: string;
  setBid: React.Dispatch<React.SetStateAction<string>>;
  currentPrice: number;
  originalPrice: number;
  currentBudget: number;
}

function BiddingSliderBar({
  bid,
  setBid,
  currentPrice,
  originalPrice,
  currentBudget,
}: SliderProps) {
  const [amount, setAmount] = useState<string>(bid);

  const handleDragBid = (value: number) => {
    setAmount(String(value));
  };

  const handleBidSet = () => {
    console.log('마우스떼곳 설정했음', amount);
    setBid(amount);
  };

  return (
    <>
      <Slider
        onChangeEnd={handleBidSet}
        onChange={handleDragBid}
        value={amount === '' ? currentPrice + 1000 : Number(amount)}
        min={currentPrice ? currentPrice + 1000 : originalPrice + 1000}
        max={currentBudget}
        step={1000}
      >
        <SliderTrack bg="#C2B4E2">
          <SliderFilledTrack bg="#996FD6" />
        </SliderTrack>
        <SliderThumb boxSize={6} />
      </Slider>
      <Text
        color="#FDFDFC"
        fontSize={{ base: 'ls', sm: '24px' }}
        textAlign="center"
      >
        현재 입찰가:{' '}
        {amount
          ? `${Number(amount).toLocaleString()}원`
          : '입찰가를 정해주세요'}
      </Text>
    </>
  );
}

export default BiddingSliderBar;
