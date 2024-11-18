import {
  Box,
  createStandaloneToast,
  Heading,
  VStack,
  Skeleton,
  HStack,
  SkeletonCircle,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAuctionDetail from '../hooks/useAuctionDetail';
import AuctionItemList from './AuctionItem/AuctionItemList';

interface AuctionListProps {
  fontColor: string;
  headerShow: string;
  bgColor: string;
}

function AuctionItemSkeleton() {
  return (
    <Grid
      marginBottom="12px"
      width="100%"
      templateColumns="1fr 1fr 1fr 1fr"
      alignItems="center"
      gap={2}
    >
      <GridItem>
        <SkeletonCircle
          size={{ base: '48px', sm: '64px' }} // Avatar의 md, lg 사이즈에 맞춤
          startColor="gray.700"
          endColor="gray.600"
        />
      </GridItem>

      <GridItem>
        <Skeleton
          width={{ base: '60px', sm: '80px' }}
          height="14px"
          marginBottom="10px"
          startColor="gray.700"
          endColor="gray.600"
        />
        <Skeleton
          width={{ base: '50px', sm: '70px' }}
          height="13px"
          mt="10px"
          startColor="gray.700"
          endColor="gray.600"
        />
      </GridItem>

      <GridItem>
        <Skeleton
          width={{ base: '90px', sm: '120px' }}
          height="18px"
          startColor="gray.700"
          endColor="gray.600"
        />
      </GridItem>

      <GridItem>
        <Skeleton
          width="100%"
          height="32px" // Button 높이에 맞춤
          borderRadius="md"
          startColor="gray.700"
          endColor="gray.600"
        />
      </GridItem>
    </Grid>
  );
}

export default function AuctionList({
  fontColor,
  headerShow,
  bgColor,
}: AuctionListProps) {
  const nav = useNavigate();
  const { toast } = createStandaloneToast();
  const { data, error, isPending } = useAuctionDetail();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (error) {
    nav('/');
    toast({
      title: '실패',
      description: `${error.message}`,
      status: 'error',
      variant: 'left-accent',
      duration: 3000,
      isClosable: true,
    });
  }

  return (
    <Box
      width="100%"
      marginBottom="20vh"
      p={4}
      height="calc(100vh - 20vh)"
      textAlign="center"
      color={fontColor}
      bg={bgColor}
      overflow="hidden"
    >
      <Heading
        display={headerShow === 'show' ? 'block' : 'none'}
        as="h5"
        size="xm"
        textAlign="left"
        color="white"
        w="100%"
        marginBottom="12px"
      >
        경매 물품 리스트
      </Heading>
      <VStack
        display={isPending || isLoading ? 'block' : 'none'}
        width="100%"
        justifyContent="flex-start"
        spacing={4}
        alignItems="center"
        height="100%"
        overflowY="auto"
      >
        {[...Array(data.items?.length)].map((_, index) => (
          <AuctionItemSkeleton key={index} />
        ))}
      </VStack>
      <VStack
        width="100%"
        justifyContent="flex-start"
        spacing={4}
        alignItems="center"
        height="100%"
        overflowY="auto"
      >
        {data.items?.map((item) => (
          <AuctionItemList key={item.id} item={item} />
        ))}
      </VStack>
    </Box>
  );
}
