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
      templateColumns="20% 25% 25% 25%"
      alignItems="center"
      gap={2}
    >
      <GridItem>
        {item.imageUrls[0].split('.').pop() === 'm3u8' ? (
          <video muted autoPlay width="100%" controls>
            <source src={item.imageUrls[0]} type="video/mp4" />
            <track kind="captions" />
          </video>
        ) : (
          <Image
            boxSize="fit"
            src={item.imageUrls[0]}
            objectFit="contain"
            alt="item cover image"
          />
        )}
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
          marginRight="12px"
          backgroundColor="#AA8EBF"
          color="white"
          width="80%"
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
