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

interface BiddingTabProps {
  SetCurrentBid: (value: number) => void;
  socket: Socket;
}

function BiddingTab({ socket, SetCurrentBid }: BiddingTabProps) {
  return (
    <Tabs isFitted position="relative" variant="unstyled">
      <TabList>
        <Tab>One</Tab>
        <Tab>Two</Tab>
        <Tab>Three</Tab>
        <Tab>Four</Tab>
      </TabList>
      <TabIndicator mt="-1.5px" height="2px" bg="blue.500" borderRadius="1px" />
      <TabPanels>
        <TabPanel>
          <p>one!</p>
        </TabPanel>
        <TabPanel>
          <BiddingChat socket={socket} />
        </TabPanel>
        <TabPanel>
          <BiddingInTab SetCurrentBid={SetCurrentBid} socket={socket} />
        </TabPanel>
        <TabPanel>
          <p>four!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default BiddingTab;
