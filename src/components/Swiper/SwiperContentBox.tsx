import { Box, Input, Text, Textarea } from '@chakra-ui/react';
import useAuctionStore from '../../store/AuctionStore';
import useShowToast from '../../hooks/useShowToast';
import useAuctionItemStore from '../../store/AuntionItemStore';

type SwiperProps = 'title' | 'description' | 'date' | 'sellingLimitTime';
type SwiperItemProps = 'itemName' | 'description' | 'price';

interface SwiperContentBoxProps {
  labelText: string;
  typeValue: SwiperProps | SwiperItemProps;
  inputType: string;
  placeholderText: string;
  sourceType: 'auction' | 'auctionItem';
}

function SwiperContentBox({
  labelText,
  typeValue,
  inputType,
  placeholderText,
  sourceType,
}: SwiperContentBoxProps) {
  const { auctionInfo, updateField } = useAuctionStore();
  const { auctionItemInfo, updateItemField } = useAuctionItemStore();
  const showToast = useShowToast();

  // 공통된 업데이트 로직 함수
  const handleUpdate = (
    field: SwiperProps | SwiperItemProps,
    value: string
  ) => {
    if (sourceType === 'auction') {
      updateField(field as SwiperProps, value);
    } else {
      updateItemField(field as SwiperItemProps, value);
    }
  };

  // 입력값 변경 처리 함수
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;

    if (typeValue === 'date') {
      const minDate = new Date(
        Date.now() + 9 * 60 * 1000 - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .slice(0, 16);

      if (value > minDate) {
        handleUpdate('date', value);
      } else {
        showToast(
          'Error',
          '최소 10분 뒤 부터 경매 시작이 가능합니다.',
          'error'
        );
      }
    } else {
      handleUpdate(typeValue, value);
    }
  };

  const getValue = () => {
    const value =
      sourceType === 'auction'
        ? auctionInfo[typeValue as SwiperProps]
        : auctionItemInfo[typeValue as SwiperItemProps];

    return value !== undefined ? value : '';
  };

  return (
    <Box margin="0 auto" width="90vw" height="60vh">
      <Text fontSize="12px" mb="8px">
        {labelText}
      </Text>
      {inputType !== 'textarea' ? (
        <Input
          type={inputType}
          value={getValue()}
          onChange={handleOnChange}
          placeholder={placeholderText}
        />
      ) : (
        <Textarea
          h="200px"
          size="md"
          value={getValue()}
          onChange={handleOnChange}
          placeholder={placeholderText}
        />
      )}
    </Box>
  );
}

export default SwiperContentBox;
