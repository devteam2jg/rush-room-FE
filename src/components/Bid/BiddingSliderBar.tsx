import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface SliderProps {
  receievedItemId: string;
  bid: string;
  setBid: React.Dispatch<React.SetStateAction<string>>;
  priceOfItem: number;
  currentBudget: number;
}

function BiddingSliderBar({
  receievedItemId,
  bid,
  setBid,
  priceOfItem,
  currentBudget,
}: SliderProps) {
  const [amount, setAmount] = useState<string>(bid);

  useEffect(() => {
    // 새로운 bid가 현재 amount보다 작으면 업데이트
    if (Number(bid) > Number(amount)) {
      setAmount(String(bid));
    }
    setBid(amount);
  }, [bid]);

  useEffect(() => {
    setAmount(String(priceOfItem + 1000));
  }, [receievedItemId]);

  const handleDragBid = (value: number) => {
    setAmount(String(value));
  };

  const handleBidSet = () => {
    setBid(amount);
  };

  return (
    <>
      <Slider
        onChangeEnd={handleBidSet}
        onChange={handleDragBid}
        value={Number(amount)}
        min={priceOfItem + 1000}
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
        fontSize={{ base: 'ls', sm: '22px' }}
        textAlign="center"
      >
        현재 입찰가:
        {Number(bid) > Number(amount) ? bid : amount}
      </Text>
    </>
  );
}

export default BiddingSliderBar;
