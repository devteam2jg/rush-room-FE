import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  createStandaloneToast,
  Box,
  Image,
  Badge,
  Text,
} from '@chakra-ui/react';
import useAuction from '../../hooks/useAuction';
import { AuctionItem } from '../../utils/types';

interface CardProps {
  auctionDto: {
    firstItem: {
      imageUrl: string[];
    };
  };
}

function Background({ auctionDto }: CardProps) {
  const defaultImage = 'images/biditem.png';
  const imageUrl = auctionDto.firstItem?.imageUrl?.[0] || defaultImage;

  return (
    <Box position="absolute" inset="0" zIndex="0">
      <Image
        src={imageUrl || '/default-image.jpg'}
        alt="Background Image"
        objectFit="cover"
        width="100%"
        height="100%"
      />
    </Box>
  );
}

interface ItemProps {
  auctionDto: {
    status: string;
    title: string;
    eventDate: string;
    firstItem: {
      imageUrl: string[];
    };
  };
  ownerProfile: {
    nickname: string;
    thumbnailUrl: string;
  };
}

function Card({ auctionDto, ownerProfile }: ItemProps) {
  const date = new Date(auctionDto.eventDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');

  return (
    <Box position="relative" w="40" p="3" h="72" rounded="lg" overflow="hidden">
      {auctionDto.status === 'PROGRESS' ? (
        <Badge
          position="absolute"
          top="2"
          left="2"
          bg="red.500"
          color="white"
          fontSize="sm"
          fontWeight="extrabold"
          px="3"
          py="0.5"
          rounded="full"
          zIndex="10"
        >
          {auctionDto.status}
        </Badge>
      ) : (
        <Badge
          position="absolute"
          top="2"
          left="2"
          bg="gray.600"
          color="white"
          fontSize="sm"
          fontWeight="extrabold"
          px="3"
          py="0.5"
          rounded="full"
          zIndex="10"
        >
          {auctionDto.status}
        </Badge>
      )}

      <Box
        position="absolute"
        bottom="68px"
        display="flex"
        alignItems="center"
        fontSize="xs"
        fontWeight="extrabold"
        color="whiteAlpha.900"
        zIndex="20"
        rounded="full"
        bg="rgba(128, 128, 128, 0.8)"
        px={2}
        py={1}
      >
        <Image
          boxSize="6"
          mr="2"
          borderRadius="full"
          src={ownerProfile.thumbnailUrl}
          alt="유저 프로필 이미지"
        />
        {ownerProfile.nickname}
      </Box>

      <Box
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        h="60px"
        bg="white"
        color="black"
        roundedBottom="xl"
        fontFamily="mono"
        textAlign="left"
        transition="all 0.3s"
        backdropFilter="blur(10px)"
        _hover={{ bg: 'whiteAlpha.700', color: 'white' }}
        zIndex="20"
      >
        <Box position="relative" zIndex="10" p="2">
          <Text fontSize="md" fontWeight="extrabold" mb="1">
            {auctionDto.title}
          </Text>
          <Text fontSize="xs" color="gray.500" fontWeight="semibold">
            {`${year}년 ${month}월 ${day}일 ${hours}시`}
          </Text>
        </Box>
      </Box>

      <Background auctionDto={auctionDto} />
    </Box>
  );
}

function ShowingItem() {
  const { data, error, isPending } = useAuction();
  const nav = useNavigate();
  const { toast } = createStandaloneToast();
  if (isPending) {
    return <div>Loading...!!</div>;
  }

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
    <Box height="70vh" overflowY="auto">
      <div className="grid grid-cols-2 gap-5">
        {data?.data?.map((item: AuctionItem) => (
          <Link key={item.auctionDto.id} to={`/auction/${item.auctionDto.id}`}>
            <Card
              auctionDto={item.auctionDto}
              ownerProfile={item.ownerProfile}
            />
          </Link>
        ))}
      </div>
    </Box>
  );
}

export default ShowingItem;
