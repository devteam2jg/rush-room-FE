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
  auctionId: string;
  userId: string;
  message: string;
  nickname: string;
}

function ChatInput({ socket }: ChatInputProps) {
  const user = useAuthStore((state) => state.user);
  const { toast } = createStandaloneToast();
  const [messageSent, setMessageSent] = useState('');
  const [messageList, setMessageList] = useState<Message[]>([]);
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

    return () => {
      socket.off('message');
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
      {/* 채팅 메시지 영역 */}
      <Flex
        flex="1"
        overflowY="auto"
        flexDirection="column"
        paddingBottom="62px" // 입력창 높이 + 여유 공간
      >
        {messageList.map((messageContent: Message, index) => {
          return (
            <Flex
              textAlign="center"
              gap="12px"
              marginBottom="12px"
              key={`${messageContent.userId}-${index}`}
            >
              <Text color={userColor}>{messageContent.nickname}</Text>
              <Text color="white">{messageContent.message}</Text>
            </Flex>
          );
        })}
        <Box ref={endOfMessagesRef} />
      </Flex>
      <Flex
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
          color="#ACACAC"
          value={messageSent}
          onChange={handleMessageInput}
        />
        <Button onClick={handleSendMessage}>전송</Button>
      </Flex>
    </Flex>
  );
}

export default ChatInput;
