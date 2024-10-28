import {
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { Socket } from 'socket.io-client';
import BiddingChat from './BiddingChat';
import BiddingInTab from './BiddingInTab';
import BiddingItemDetail from './BiddingItemDetail';
import AuctionList from '../AuctionList';

interface BiddingTabProps {
  currentPrice: number;
  socket: Socket | null;
}

function BiddingTab({ currentPrice, socket }: BiddingTabProps) {
  return (
    <Tabs
      isFitted
      variant="unstyled"
      display="flex"
      flexDirection="column"
      flex="1"
    >
      <TabList backgroundColor="#141517" height="30px" color="#ACACAC">
        <Tab
          _selected={{ color: 'white' }}
          fontSize="13px"
          fontWeight={700}
          padding="0"
        >
          상품 상세
        </Tab>
        <Tab
          _selected={{ color: 'white' }}
          fontSize="13px"
          fontWeight={700}
          padding="2px 0"
        >
          경매 채팅
        </Tab>
        <Tab
          _selected={{ color: 'white' }}
          fontSize="13px"
          fontWeight={700}
          padding="2px 0"
        >
          경매 응찰
        </Tab>
        <Tab
          _selected={{ color: 'white' }}
          fontSize="13px"
          fontWeight={700}
          padding="2px 0"
        >
          상품 리스트
        </Tab>
      </TabList>
      <TabIndicator mt="-1.5px" height="2px" bg="#B9A5E2" borderRadius="1px" />
      <TabPanels flex="1" overflow="hidden">
        <TabPanel height="100%" overflow="auto" color="white">
          <BiddingItemDetail />
        </TabPanel>
        <TabPanel height="100%" overflow="auto">
          <BiddingChat socket={socket} />
        </TabPanel>
        <TabPanel height="100%" overflow="auto">
          <BiddingInTab currentPrice={currentPrice} socket={socket} />
        </TabPanel>
        <TabPanel padding="0" width="100vw" height="100%" overflow="auto">
          <AuctionList
            headerShow="hidden"
            fontColor="white"
            bgColor="#212326"
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default BiddingTab;
