import {
  Box,
  Heading,
  Image,
  Text,
  Stack,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function BidItem() {
  const navigate = useNavigate();
  return (
    <Box
      maxW={{ base: '100%', md: '445px' }}
      w={'full'}
      h={'100vh'}
      bg={useColorModeValue('#2F2F2F', 'gray.900')}
      boxShadow={'2xl'}
      rounded={'md'}
      fontFamily="SpoqaHanSansNeo"
      p={6}
      overflow={'hidden'}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'space-between'}
    >
      <Box
        flex={1}
        h={{ base: '200px', md: '251px' }}
        bg={'gray.100'}
        mt={-6}
        mx={-6}
        pos={'relative'}
      >
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
        fontWeight={'bold'}
        fontSize={{ base: 'lg', md: 'xl' }}
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
          fontWeight={'bold'}
          fontSize={{ base: 'sm', md: 'md' }}
          letterSpacing={1.1}
        >
          물품 제목
        </Text>
        <Heading
          color={'white'}
          fontSize={{ base: 'xl', md: '2xl' }}
          fontFamily={'body'}
        >
          혼종
        </Heading>
        <Text
          color={'white'}
          fontWeight={'bold'}
          fontSize={{ base: 'sm', md: 'md' }}
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
          <Button flex={1} onClick={() => {}}>
            5%
          </Button>
          <Button flex={1} onClick={() => {}}>
            10%
          </Button>
          <Button flex={1} onClick={() => {}}>
            20%
          </Button>
        </Stack>
        <Button
          mt={4}
          bg={'#AA8EBF'}
          color={'white'}
          height={'55.31px'}
          fontSize={'xl'}
          fontWeight={'bold'}
          letterSpacing={1.1}
          onClick={() => {
            navigate('');
          }}
        >
          입찰하기
        </Button>
      </Stack>
    </Box>
  );
}
