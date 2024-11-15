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
    handleFilesChange(e);
  };

  const removeFile = (indexToRemove: number) => {
    const newFiles = selectedFiles.filter(
      (_, index) => index !== indexToRemove
    );
    setSelectedFiles(newFiles);

    const dataTransfer = new DataTransfer();
    newFiles.forEach((file) => {
      dataTransfer.items.add(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.files = dataTransfer.files;
      const event = new Event('change', { bubbles: true });
      fileInputRef.current.dispatchEvent(event);
    }
  };

  return (
    <VStack fontWeight="700" color="#FCFCFD" align="stretch" spacing={4}>
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
              borderRadius="md"
              justify="space-between"
              bg="#5D5D5D"
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
