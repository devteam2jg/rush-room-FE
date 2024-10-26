import { Flex } from '@chakra-ui/react';
import { Socket } from 'socket.io-client';
import Chat from './BidChat/Chat';
import ChatInput from './BidChat/ChatInput';

interface BiddingChatProps {
  socket: Socket;
}

function BiddingChat({ socket }: BiddingChatProps) {
  return (
    <Flex height="100%" flexDirection="column">
      <Chat socket={socket} />
      <ChatInput socket={socket} />
    </Flex>
  );
}

export default BiddingChat;
