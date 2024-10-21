import {
  Box,
  Heading,
  Image,
  Text,
  Stack,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';

export default function BidItem() {
  return (
    <Box
      maxW={'445px'}
      w={'full'}
      bg={useColorModeValue('#2F2F2F', 'gray.900')}
      boxShadow={'2xl'}
      rounded={'md'}
      p={6}
      overflow={'hidden'}
      display={'flex'}
      flexDirection={'column'}
    >
      <Box h={'251px'} bg={'gray.100'} mt={-6} mx={-6} mb={0} pos={'relative'}>
        <Image
          src={'images/biditem.png'}
          alt="경매 물품"
          objectFit={'cover'}
          width={'100%'}
          height={'100%'}
        />
      </Box>
      <Box p={4} />
      <Text
        color={'white'}
        fontWeight={1000}
        fontSize={'xl'}
        letterSpacing={1.1}
        textAlign="right"
      >
        현재가{' '}
        <Box as="span" color={'#EFDA19'}>
          43,000
        </Box>
      </Text>
      <Stack>
        <Text
          color={'white'}
          fontWeight={800}
          fontSize={'sm'}
          letterSpacing={1.1}
        >
          물품 제목
        </Text>
        <Heading color={'white'} fontSize={'2xl'} fontFamily={'body'}>
          혼종
        </Heading>
        <Text
          color={'white'}
          fontWeight={800}
          fontSize={'sm'}
          letterSpacing={1.1}
        >
          물품 상세 설명
        </Text>
        <Text color={'whiteAlpha.800'}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum.
        </Text>
        <Stack mt={'1rem'} width={'100%'} direction={'row'} spacing={4}>
          <Button flex={1}>5%</Button>
          <Button flex={1}>10%</Button>
          <Button flex={1}>20%</Button>
        </Stack>
        <Button
          mt={4}
          bg={'#AA8EBF'}
          color={'white'}
          height={'55.31px'}
          fontSize={'xl'}
          letterSpacing={1.1}
          onClick={() => {}}
        >
          입찰하기
        </Button>
      </Stack>
    </Box>
  );
}
