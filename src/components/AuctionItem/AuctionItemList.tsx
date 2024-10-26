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
  let formattedPrice = '';

  if (item.startPrice / 1000 > 1) {
    formattedPrice = `${(item.startPrice / 1000).toLocaleString()} 만원`;
  } else {
    formattedPrice = `${item.startPrice.toLocaleString()} 원`;
  }
  return (
    <Grid
      width="100%"
      templateColumns="15% 25% 30% 20%"
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
        <Text
          marginBottom="10px"
          whiteSpace="nowrap"
          fontSize="14px"
          fontWeight={700}
          isTruncated
        >
          {item.title}
        </Text>
        <Text fontSize="13px" mt="-10px">
          {item.postedUser.nickname}
        </Text>
      </GridItem>
      <GridItem>
        <Text
          whiteSpace="nowrap"
          fontWeight={700}
          fontSize="18px"
          textAlign="center"
        >
          {formattedPrice}
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
