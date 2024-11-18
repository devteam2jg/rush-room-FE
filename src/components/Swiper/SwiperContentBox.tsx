import { Box, Checkbox, Input, Text, Textarea } from '@chakra-ui/react';
import useAuctionStore from '../../store/AuctionStore';
import useShowToast from '../../hooks/useShowToast';
import useAuctionItemStore from '../../store/AuntionItemStore';
import FileUpload from '../Bidding/FileUpload';

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

const validationPatterns = {
  title: /^[\p{L}\p{N}\s]{2,15}$/u,
  itemName: /^[\p{L}\p{N}\s]{2,15}$/u,
  description: /^[\s\S]{10,500}$/,
  budget: /^\d{1,8}$/,
  price: /^\d{1,8}$/,
  privateCode: /^[a-zA-Z0-9]{4,12}$/,
  sellingLimitTime: /^\d{1,2}$/,
};

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

  const validateInput = (field: string, value: string): boolean => {
    const pattern =
      validationPatterns[field as keyof typeof validationPatterns];
    if (!pattern) return true;

    if (field === 'sellingLimitTime') {
      const minutes = parseInt(value, 10);
      if (!Number.isInteger(minutes) || minutes < 1 || minutes > 60) {
        showToast(
          'Error',
          '경매 제한 시간은 1분에서 60분 사이로 설정해주세요.',
          'error'
        );
        return false;
      }
      return true;
    }

    if (!pattern.test(value)) {
      let errorMessage = '입력값이 올바르지 않습니다.';

      switch (field) {
        case 'title':
          errorMessage = '제목은 2-10자 사이로 입력해주세요.';
          break;
        case 'itemName':
          errorMessage = '상품명은 2-10자 사이로 입력해주세요.';
          break;
        case 'description':
          errorMessage = '설명은 10-500자 사이로 입력해주세요.';
          break;
        case 'budget':
        case 'price':
          errorMessage = '올바른 금액을 입력해주세요.';
          break;
        case 'privateCode':
          errorMessage = '비공개 코드는 4-12자의 영문, 숫자만 가능합니다.';
          break;
        default:
          console.log('누구징');
          break;
      }

      showToast('Error', errorMessage, 'error');
      return false;
    }
    return true;
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    validateInput(typeValue, value);
  };

  const handleUpdate = (
    field: SwiperProps | SwiperItemProps,
    value: string | boolean | File[] | null
  ) => {
    if (sourceType === 'auction' || sourceType === 'editAuction') {
      updateField(field as SwiperProps, value);
    } else {
      updateItemField(field as SwiperItemProps, value);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleUpdate(typeValue, e.target.checked);
  };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      const fileArray = Array.from(files);

      const validTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'video/quicktime',
        'video/mp4',
      ];

      const isValid = fileArray.every((file) => {
        if (!validTypes.includes(file.type)) {
          showToast(
            'Error',
            'JPG, PNG, GIF, MOV, MP4 형식의 파일만 업로드 가능합니다.',
            'error'
          );
          return false;
        }
        return true;
      });

      if (isValid) {
        handleUpdate(typeValue, fileArray);
      } else {
        e.target.value = '';
      }
    }
  };

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
    <Box margin="0 auto" padding="4" width="100%" height="60vh">
      <Text fontSize={{ base: '12px', sm: '18px' }} mb="8px" color="white">
        {labelText}
      </Text>
      {inputType === 'checkbox' ? (
        <>
          <Checkbox
            size={{ base: 'sm', sm: 'lg' }}
            colorScheme="mong"
            onChange={handleCheckboxChange}
            isChecked={getValue() as boolean}
            marginBottom="12px"
          />
          {getValue() && (
            <Input
              color="white"
              placeholder={placeholderText}
              value={auctionInfo.privateCode}
              onChange={(e) => {
                handleUpdate('privateCode', e.target.value);
              }}
              onBlur={handleBlur}
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
              onBlur={handleBlur}
              placeholder={placeholderText}
            />
          )}
          {inputType === 'text' && (
            <Input
              color="white"
              type={inputType}
              value={getValue() as string}
              onChange={handleOnChange}
              onBlur={handleBlur}
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
            <FileUpload
              handleFilesChange={handleFilesChange}
              placeholderText="파일 선택하기"
            />
          )}
        </>
      )}
    </Box>
  );
}

export default SwiperContentBox;
