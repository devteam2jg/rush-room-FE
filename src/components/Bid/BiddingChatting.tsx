import { memo, useEffect, useRef, useState, useCallback } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import BiddingInput from './BiddingInput';
import useSocketStore from '../../store/useSocketStore';
import { PriceData, Message } from '../../utils/types';
import BiddingChatMessage from './BiddingChatMessage';

declare global {
  interface Window {
    addTestMessage: (message: string, nickname?: string) => void;
    addMultipleTestMessages: (count: number) => void;
    getMessageList: () => Message[];
    clearMessages: () => void;
  }
}

const MESSAGE_LIMIT = 1000;

interface MessageWithUuid extends Message {
  uuid: string;
}

function BiddingChatting() {
  const [messageList, setMessageList] = useState<MessageWithUuid[]>([]);
  const [bidder, setBidder] = useState('');
  const [currentBid, setCurrentBid] = useState(0);
  const socket = useSocketStore((state) => state.socket);
  const messageContainerRef = useRef<HTMLDivElement | null>(null);

  const addMessage = useCallback((newMessage: Message) => {
    const newMessageWithUuid = { ...newMessage, uuid: nanoid() };
    setMessageList((prev) => {
      const updatedList = [...prev, newMessageWithUuid];

      if (updatedList.length > MESSAGE_LIMIT) {
        console.log(
          `메시지 정리: ${updatedList.length - MESSAGE_LIMIT}개 제거`
        );
        return updatedList.slice(-MESSAGE_LIMIT);
      }

      return updatedList;
    });
  }, []);

  const handleChatPriceBidderRecieve = useCallback((priceData: PriceData) => {
    setCurrentBid(priceData.bidPrice);
    setBidder(priceData.bidderNickname);
  }, []);

  const scrollToBottom = useCallback(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    if (!socket) return undefined;

    socket.on('USER_MESSAGE', addMessage);
    socket.on('PRICE_UPDATE', handleChatPriceBidderRecieve);

    return () => {
      socket.off('USER_MESSAGE');
      socket.off('PRICE_UPDATE', handleChatPriceBidderRecieve);
    };
  }, [socket, addMessage, handleChatPriceBidderRecieve]);

  useEffect(() => {
    if (!socket) return;

    if (bidder && currentBid) {
      const highestBidder: Message = {
        auctionId: '',
        userId: 'bidderid',
        message: `${currentBid.toLocaleString()} 원`,
        nickname: bidder,
      };
      addMessage(highestBidder);
    }
  }, [currentBid, bidder, socket, addMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [messageList.length, scrollToBottom]);

  return (
    <>
      <Box
        ref={messageContainerRef}
        width="100%"
        padding="12px 12px 0 12px"
        height={{ base: 'calc(100% - 50px)', sm: 'calc(100% - 60px)' }}
        overflowY="auto"
      >
        <Flex flexDirection="column" justifyContent="end">
          {messageList.map((messageContent) => (
            <BiddingChatMessage
              key={messageContent.uuid}
              messageContent={messageContent}
            />
          ))}
        </Flex>
      </Box>
      <Box width="100%" position="absolute" bottom={0} left={0}>
        <BiddingInput socket={socket} />
      </Box>
    </>
  );
}

export default memo(BiddingChatting);
