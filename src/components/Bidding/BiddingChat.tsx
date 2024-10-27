import { Socket } from 'socket.io-client';
import { Box } from '@chakra-ui/react';
import ChatInput from './BidChat/ChatInput';

interface BiddingChatProps {
  socket: Socket | null;
}

function BiddingChat({ socket }: BiddingChatProps) {
  return (
    <Box>
      <ChatInput socket={socket} />;
    </Box>
  );
}

export default BiddingChat;
