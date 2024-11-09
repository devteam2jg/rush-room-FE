import { useEffect, useRef, useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import BiddingInput from './BiddingInput';
import useSocketStore from '../../store/useSocketStore';
import { PriceData } from './BiddingTimePriceInfo';

interface Message {
  auctionId: string;
  userId: string;
  message: string;
  nickname: string;
}

function BiddingChatting() {
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [bidder, setBidder] = useState('');
  const [currentBid, setCurrentBid] = useState(0);
  const socket = useSocketStore((state) => state.socket);

  const messageContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!socket) return undefined;

    const handleChatPriceBidderRecieve = (priceData: PriceData) => {
      setCurrentBid(priceData.bidPrice);
      setBidder(priceData.bidderNickname);
    };

    socket.on('USER_MESSAGE', (message: Message) => {
      setMessageList((list) => [...list, message]);
    });

    socket?.on('PRICE_UPDATE', handleChatPriceBidderRecieve);

    return () => {
      socket.off('USER_MESSAGE');
      socket.off('PRICE_UPDATE', handleChatPriceBidderRecieve);
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    if (bidder && currentBid) {
      const highestBidder: Message = {
        auctionId: '',
        userId: 'bidderid',
        message: `${currentBid.toLocaleString()} 크레딧`,
        nickname: bidder,
      };
      setMessageList((list) => [...list, highestBidder]);
    }
  }, [currentBid]);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messageList.length]);

  return (
    <>
      <Box
        width="100%"
        padding="12px 12px 0 12px"
        height={{ base: 'calc(100% - 50px)', sm: 'calc(100% - 60px)' }}
        overflowY="auto"
        ref={messageContainerRef}
      >
        <Flex flexDirection="column" justifyContent="end">
          {messageList.map((messageContent: Message) => {
            const lastThree = messageContent.userId.slice(-3);
            const userColor = `#${lastThree}${lastThree}`;
            return (
              <Box key={nanoid()}>
                {messageContent.auctionId ? (
                  <Flex alignItems="center" marginBottom="12px" gap="10%">
                    <Text
                      fontSize={{ base: '13px', sm: '18px' }}
                      fontWeight="700"
                      color={userColor}
                      flexShrink={0}
                      marginRight="12px"
                      whiteSpace="nowrap"
                    >
                      {messageContent.nickname}
                    </Text>
                    <Text
                      fontSize={{ base: '13px', sm: '18px' }}
                      fontWeight="600"
                      color="#FCFCFD"
                      wordBreak="break-word"
                    >
                      {messageContent.message}
                    </Text>
                  </Flex>
                ) : (
                  <Flex
                    borderLeft="2px solid #B9A5E2"
                    borderRadius="0 5px 5px 0"
                    padding="15px 10px"
                    backgroundColor="rgba(20, 20, 20, 0.4)"
                    fontSize={{ base: '13px', sm: '18px' }}
                    flexDirection="column"
                    color="#FCFCFD"
                    marginBottom="12px"
                  >
                    <Text>{messageContent.nickname} 님이</Text>
                    <Flex>
                      <Text flexShrink={0} fontWeight="700" color="#B9A5E2">
                        {messageContent.message}
                      </Text>
                      <Text flexShrink={0}>을 입찰하셨어요 👑</Text>
                    </Flex>
                  </Flex>
                )}
              </Box>
            );
          })}
        </Flex>
      </Box>
      <Box width="100%" position="absolute" bottom={0} left={0}>
        <BiddingInput socket={socket} />
      </Box>
    </>
  );
}

export default BiddingChatting;
