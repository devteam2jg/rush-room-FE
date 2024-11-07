import { useEffect, useRef, useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import { SocketProps } from '../../utils/types';
import BiddingInput from './BiddingInput';

interface Message {
  auctionId: string;
  userId: string;
  message: string;
  nickname: string;
}

interface ChatProps extends SocketProps {
  bidder: string;
  currentPrice: number;
}

function BiddingChatting({ socket, currentPrice, bidder }: ChatProps) {
  const [messageList, setMessageList] = useState<Message[]>([]);

  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!socket) return undefined;

    socket.on('USER_MESSAGE', (message: Message) => {
      console.log('receieved-message', message);
      setMessageList((list) => [...list, message]);
    });

    return () => {
      socket.off('USER_MESSAGE');
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    if (bidder && currentPrice) {
      const highestBidder: Message = {
        auctionId: '',
        userId: 'bidderid',
        message: `${currentPrice.toLocaleString()} 크레딧`,
        nickname: bidder,
      };
      setMessageList((list) => [...list, highestBidder]);
      endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
      console.log('bid_updated without socket');
    }
  }, [currentPrice]);

  return (
    <>
      <Box
        width="100%"
        padding="12px 12px 0 12px"
        height={{ base: 'calc(100% - 50px)', md: 'calc(100% - 70px)' }}
        overflowY="auto"
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
        <Box
          ref={endOfMessagesRef}
          backgroundColor="transparent"
          height={{ base: '20px', sm: '40px' }}
        />
      </Box>
      <Box width="100%" position="absolute" bottom={0} left={0}>
        <BiddingInput endOfMessagesRef={endOfMessagesRef} socket={socket} />
      </Box>
    </>
  );
}

export default BiddingChatting;
