import { Grid, GridItem, Text, Button, Image } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuctionItem } from '../../utils/types';
import useFormatPrice from '../../hooks/Bid/useFormatPrice';

type ItemsProps = {
  item: AuctionItem;
};

function AuctionItemList({ item }: ItemsProps) {
  const { auctionId } = useParams();
  const nav = useNavigate();

  return (
    <Grid
      width="100%"
      templateColumns="1fr 1fr 1fr 1fr"
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
          {item.postedUser?.nickname ? item.postedUser.nickname : ''}
        </Text>
      </GridItem>
      <GridItem>
        <Text
          whiteSpace="nowrap"
          fontWeight={700}
          fontSize="18px"
          textAlign="center"
        >
          {useFormatPrice(item.startPrice)}
        </Text>
      </GridItem>
      <GridItem>
        <Button
          backgroundColor="#AA8EBF"
          color="white"
          width="100%"
          textAlign="center"
          onClick={() => {
            nav(`/auction/${auctionId}/details/${item.id}`);
          }}
        >
          <Text fontSize="sm">상세보기</Text>
        </Button>
      </GridItem>
    </Grid>
  );
}

export default AuctionItemList;
