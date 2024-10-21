import { Box, Input, Text, Textarea } from '@chakra-ui/react';
import useAuctionStore from '../../store/AuctionStore';
import useShowToast from '../../hooks/useShowToast';

type SwiperProps = 'title' | 'content' | 'date' | 'duration';

interface SwiperContentBoxProps {
  labelText: string;
  typeValue: SwiperProps;
  inputType: string;
  placeholderText: string;
}

function SwiperContentBox({
  labelText,
  typeValue,
  inputType,
  placeholderText,
}: SwiperContentBoxProps) {
  const { auctionInfo, updateField } = useAuctionStore();
  const showToast = useShowToast();
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (typeValue !== 'date') {
      updateField(typeValue, e.target.value);
    } else {
      const minDate = new Date(
        Date.now() + 10 * 60 * 1000 - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .slice(0, 16);

      if (e.target.value > minDate) {
        updateField('date', e.target.value);
      } else {
        showToast(
          'Error',
          '최소 10분 뒤 부터 경매 시작이 가능합니다.',
          'error'
        );
      }
    }
  };
  return (
    <Box margin="0 auto" width="90vw" height="60vh">
      <Text fontSize="12px" mb="8px">
        {labelText}
      </Text>
      {inputType !== 'textarea' ? (
        <Input
          type={inputType}
          value={auctionInfo[typeValue]}
          onChange={handleOnChange}
          placeholder={placeholderText}
        />
      ) : (
        <Textarea
          value={auctionInfo[typeValue]}
          onChange={(e) => updateField(typeValue, e.target.value)}
          placeholder={placeholderText}
        />
      )}
    </Box>
  );
}

export default SwiperContentBox;
