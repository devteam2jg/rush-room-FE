import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Text,
  Flex,
  Heading,
  Image,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';

export default function AuctionInfo() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg={useColorModeValue('white', 'gray.900')} px={4} py={2} shadow="md">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Button bg="white">
          <Image src="images/leftarrow.png" alt="뒤로가기" boxSize="24px" />
        </Button>

        <Box flex="1" />

        <Button
          fontSize="md"
          fontWeight="bold"
          variant="ghost"
          textAlign="right"
          onClick={onOpen}
        >
          경매 정보
        </Button>
        <Box />
      </Flex>
      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent borderRadius="2xl" p="4">
          <DrawerHeader borderBottomWidth="1px" fontSize="lg">
            경매 정보
          </DrawerHeader>
          <DrawerBody>
            <Heading as="h5" size="sm" textAlign="left" mb={2}>
              경매 이벤트 명
            </Heading>
            <Text fontSize="sm" mb={2}>
              정글 수료 기념 애장품 경매
            </Text>
            <Heading as="h5" size="sm" textAlign="left" mb={2}>
              경매 상세 설명
            </Heading>
            <Text fontSize="sm" mb={4} color="gray.600">
              정글 수료 기념 애장품 경매 정글 수료 기념 애장품 경매 정글 수료
              기념 애장품 경매 정글 수료 기념 애장품 경매 정글 수료 기념 애장품
              경매 정글 수료 기념 애장품 경매 정글 수료 기념 애장품 경매 정글
              수료 기념 애장품 경매
            </Text>
            <Heading as="h5" size="sm" textAlign="left" mb={2}>
              경매 시작 일시
            </Heading>
            <Text fontSize="2xl" fontWeight={1000} textAlign="center">
              08 : 23 : 40
            </Text>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
