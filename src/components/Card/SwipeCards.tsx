import { Flex } from '@chakra-ui/react';

import CardStack from './CardStack';
import { Bidder } from '../../utils/types';

export interface Recieved {
  title: string;
  bidPrice: number;
  bidder: Bidder;
}
type BidderData = {
  name: string;
  profileUrl: string;
};

type ResultIdData = {
  id: number;
  title: string;
  bidPrice: number;
  bidder: BidderData;
  picture: string;
};

interface ResultIdInfo {
  resultsWithIds: ResultIdData[];
}

function SwipeCards({ resultsWithIds }: ResultIdInfo) {
  return (
    <Flex h="100%" w="full" justify="center" align="center" bg="gray.100">
      <CardStack results={resultsWithIds} />
    </Flex>
  );
}

export default SwipeCards;
