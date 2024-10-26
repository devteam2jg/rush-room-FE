import { Grid, GridItem, Text, Button, Image } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuctionItem } from '../../utils/types';

type ItemsProps = {
  item: AuctionItem;
};

function AuctionItemList({ item }: ItemsProps) {
  const { auctionId } = useParams();
  const nav = useNavigate();
  const handleEnterAuction = () => {
    nav(`/auction/${auctionId}/bid/${item.id}`);
  };

  return (
    <Grid
      width="100%"
      templateColumns="10% 20% 15% 25% 20%"
      alignItems="center"
      gap={2}
    >
      <GridItem>
        <Image
          boxSize="40px"
          src={item.imageUrls[0]}
          objectFit="contain"
          alt="item cover image"
        />
      </GridItem>
      <GridItem>
        <Text whiteSpace="nowrap" fontSize="15px" fontWeight={700}>
          {item.title}
        </Text>
        <Text fontSize="13px" mt="-10px">
          {item.postedUser.nickname}
        </Text>
      </GridItem>
      <GridItem>
        <Text
          whiteSpace="nowrap"
          fontSize="xs"
          fontWeight={700}
          textAlign="center"
        >
          시작가
        </Text>
      </GridItem>
      <GridItem>
        <Text
          whiteSpace="nowrap"
          fontWeight={700}
          fontSize="22px"
          textAlign="start"
        >
          {item.startPrice}
        </Text>
      </GridItem>
      <GridItem>
        <Button
          backgroundColor="#AA8EBF"
          color="white"
          width="full"
          textAlign="center"
          onClick={handleEnterAuction}
        >
          <Text fontSize="xs">경매참여</Text>
        </Button>
      </GridItem>
    </Grid>
  );
}

export default AuctionItemList;
