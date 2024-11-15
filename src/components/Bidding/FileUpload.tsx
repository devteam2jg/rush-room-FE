import {
  Button,
  Input,
  Text,
  HStack,
  VStack,
  IconButton,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';

function FileUpload({ handleFilesChange, placeholderText }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
    handleFilesChange(e); // 기존의 onChange 핸들러 호출
  };

  const removeFile = (indexToRemove: number) => {
    const newFiles = selectedFiles.filter(
      (_, index) => index !== indexToRemove
    );
    setSelectedFiles(newFiles);

    // FileList를 직접 수정할 수 없으므로 새로운 DataTransfer 객체 생성
    const dataTransfer = new DataTransfer();
    newFiles.forEach((file) => {
      dataTransfer.items.add(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.files = dataTransfer.files;
      // 변경 이벤트 발생시키기
      const event = new Event('change', { bubbles: true });
      fileInputRef.current.dispatchEvent(event);
    }
  };

  return (
    <VStack align="stretch" spacing={4}>
      <Button onClick={handleButtonClick} colorScheme="mongCancle">
        {placeholderText}
      </Button>

      <Input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        multiple
        display="none"
        accept=".jpg,.jpeg,.png,.gif,.mov,.mp4"
      />

      {selectedFiles.length > 0 && (
        <VStack align="stretch" spacing={2} mt={2}>
          {selectedFiles.map((file, index) => (
            <HStack
              key={index}
              p={2}
              bg="gray.100"
              borderRadius="md"
              justify="space-between"
            >
              <Text noOfLines={1}>{file.name}</Text>
              <IconButton
                icon={<IoIosCloseCircle />}
                size="sm"
                aria-label="Remove file"
                onClick={() => removeFile(index)}
                variant="ghost"
              />
            </HStack>
          ))}
        </VStack>
      )}
    </VStack>
  );
}

export default FileUpload;
