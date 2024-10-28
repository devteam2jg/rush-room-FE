import { useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
import {
  Button,
  Flex,
  Input,
  createStandaloneToast,
  Text,
  Box,
} from '@chakra-ui/react';
import useAuthStore from '../../../store/UserAuthStore';

interface ChatInputProps {
  socket: Socket | null;
}

interface Message {
  auctionId: string | null;
  userId: string;
  message: string;
  nickname: string;
}

function ChatInput({ socket }: ChatInputProps) {
  const user = useAuthStore((state) => state.user);
  const { toast } = createStandaloneToast();
  const [messageSent, setMessageSent] = useState('');
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [highBidder, setHighBidder] = useState<string[]>([]);
  const { auctionId } = useParams();
  const userId = user?.id;
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  const generateColorFrom = (): string => {
    const lastThree = userId?.slice(-3);
    return `#${lastThree}${lastThree}`;
  };

  useEffect(() => {
    if (!socket) return undefined; // socket이 없을 때 early return

    socket.on('message', (message: Message) => {
      console.log('received-message', message);
      setMessageList((list) => [...list, message]);
    });

    socket.on('bid_updated', (newBid) => {
      const highestBidder = {
        auctionId: null,
        userId: 'sdaf12',
        message: `${newBid.toLocaleString()} 크레딧`,
        nickname: '정글 정소연',
      };
      setMessageList((list) => [...list, highestBidder]);
      endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
      console.log('bid_updated');
    });

    return () => {
      socket.off('message');
      socket.off('bid_updated');
      console.log('socket off');
    };
  }, [socket]);

  const handleSendMessage = () => {
    // socket이 null이 아닌지 체크
    if (!socket) {
      toast({
        title: '실패',
        description: '채팅 서버에 연결되지 않았습니다',
        status: 'error',
        variant: 'left-accent',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!messageSent) {
      toast({
        title: '실패',
        description: '문자를 입력해 주세요',
        status: 'error',
        variant: 'left-accent',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const messageData = {
      auctionId,
      userId,
      nickname: user?.name,
      message: messageSent,
    };

    socket.emit('message', messageData);
    setMessageSent('');
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleMessageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageSent(e.target.value);
  };

  const userColor = generateColorFrom();

  return (
    <Flex flexDirection="column" height="100%">
      <Flex
        flex="1"
        overflowY="auto"
        flexDirection="column"
        paddingBottom="62px"
      >
        <Box color="white">{highBidder}</Box>
        {messageList.map((messageContent: Message) => {
          return (
            <Box key={Date.now()}>
              {messageContent.auctionId ? (
                <Flex alignItems="center" marginBottom="12px" gap="10%">
                  <Text
                    fontSize="xs"
                    fontWeight="700"
                    color={userColor}
                    flexShrink={0}
                    marginRight="12px"
                    whiteSpace="nowrap"
                  >
                    {messageContent.nickname}
                  </Text>
                  <Text fontSize="xs" color="white" wordBreak="break-word">
                    {messageContent.message}
                  </Text>
                </Flex>
              ) : (
                <Flex
                  borderLeft="2px solid #B9A5E2"
                  borderRadius="0 5px 5px 0"
                  padding="15px 10px"
                  backgroundColor="#303238"
                  fontSize="xm"
                  flexDirection="column"
                  color="white"
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
        <Box ref={endOfMessagesRef} />
      </Flex>
      <Flex
        alignItems="center"
        height="50px"
        backgroundColor="#212326"
        gap="12px"
        padding="0 12px"
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        width="100%"
      >
        <Input
          backgroundColor="#2F3034"
          border="none"
          height="30px"
          color="#ACACAC"
          value={messageSent}
          onChange={handleMessageInput}
          placeholder="채팅을 입력해주세요."
        />
        <Button
          backgroundColor="#B9A5E2"
          color="white"
          height="30px"
          onClick={handleSendMessage}
        >
          전송
        </Button>
      </Flex>
    </Flex>
  );
}

export default ChatInput;
