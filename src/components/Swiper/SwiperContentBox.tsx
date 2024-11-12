import { Box, Checkbox, Input, Text, Textarea } from '@chakra-ui/react';
import useAuctionStore from '../../store/AuctionStore';
import useShowToast from '../../hooks/useShowToast';
import useAuctionItemStore from '../../store/AuntionItemStore';

type SwiperProps =
  | 'title'
  | 'description'
  | 'eventDate'
  | 'sellingLimitTime'
  | 'budget'
  | 'isPrivate'
  | 'privateCode';
type SwiperItemProps = 'itemName' | 'description' | 'price' | 'itemPicture';

interface SwiperContentBoxProps {
  labelText: string;
  typeValue: SwiperProps | SwiperItemProps;
  inputType: string;
  placeholderText: string;
  sourceType: 'auction' | 'auctionItem' | 'editAuction';
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
    value: string | boolean | File[] | null
  ) => {
    if (sourceType === 'auction') {
      updateField(field as SwiperProps, value);
    } else if (sourceType === 'editAuction') {
      updateField(field as SwiperProps, value);
    } else {
      updateItemField(field as SwiperItemProps, value);
    }
  };

  // checkbox 전용 핸들러
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleUpdate(typeValue, e.target.checked);
  };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      const fileArray = Array.from(files);
      handleUpdate(typeValue, fileArray);
    }
  };

  // 일반 입력값 변경 처리 함수
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;

    if (typeValue === 'eventDate') {
      const minDate = new Date(
        Date.now() + 9 * 60 * 1000 - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .slice(0, 16);

      if (value > minDate) {
        handleUpdate('eventDate', value);
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
      <Text fontSize="12px" mb="8px" color="white">
        {labelText}
      </Text>
      {inputType === 'checkbox' ? (
        <>
          <Checkbox
            onChange={handleCheckboxChange}
            isChecked={getValue() as boolean}
          />
          {getValue() && (
            <Input
              color="white"
              placeholder={placeholderText}
              value={auctionInfo.privateCode}
              onChange={(e) => {
                handleUpdate('privateCode', e.target.value);
              }}
            />
          )}
        </>
      ) : (
        <>
          {inputType === 'textarea' && (
            <Textarea
              h="200px"
              size="md"
              color="white"
              value={getValue() as string}
              onChange={handleOnChange}
              placeholder={placeholderText}
            />
          )}
          {inputType === 'text' && (
            <Input
              color="white"
              type={inputType}
              value={getValue() as string}
              onChange={handleOnChange}
              placeholder={placeholderText}
            />
          )}
          {inputType === 'datetime-local' && (
            <Input
              color="white"
              type={inputType}
              value={getValue() as string}
              onChange={handleOnChange}
              placeholder={placeholderText}
            />
          )}
          {inputType === 'file' && (
            <Input
              color="white"
              type={inputType}
              onChange={handleFilesChange}
              placeholder={placeholderText}
              multiple
            />
          )}
        </>
      )}
    </Box>
  );
}

export default SwiperContentBox;
