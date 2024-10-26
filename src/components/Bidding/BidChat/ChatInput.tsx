import { useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
import { Button, Input, createStandaloneToast } from '@chakra-ui/react';
import useAuthStore from '../../../store/UserAuthStore';

interface ChatInputProps {
  socket: Socket;
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
  const [messageList, setMessageList] = useState([]);
  const { auctionId } = useParams();
  const userId = user?.id;
  const isRef = useRef(0);

  socket.on('connect', () => {
    console.log('Connected to the server');
    socket.emit('join_auction', auctionId);
  });

  useEffect(() => {
    socket.on('message', (message: Message) => {
      console.log('received-message', message);
      setMessageList((list) => [...list, message]);
    });

    return () => {
      socket.disconnect();
      console.log('End Connection');
    };
  }, [socket]);

  // socket.on('message', (message) => {
  //   console.log('message', message);
  //   // setMessageList((list) => [...list, message]);
  // });

  const generateColorFrom = (): string => {
    const lastThree = userId?.slice(-3);

    return `#${lastThree}${lastThree}`;
  };

  const handleSendMessage = async () => {
    if (messageSent) {
      const messageData = {
        auctionId,
        userId,
        nickname: user?.name,
        message: messageSent,
      };
      await socket.emit('message', messageData);
      // console.log(messageData);
      // setMessageList((list) => [
      //   ...list,
      //   `${messageData.userId} : ${messageData.message}`,
      // ]);
      console.log(messageList);
    } else {
      toast({
        title: '실패',
        description: '문자를 입력해 주세요',
        status: 'error',
        variant: 'left-accent',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // const handleSendMessage = () => {
  //   socket.emit('message', { auctionId, userId, message1 });
  // };

  const handleMessageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageSent(e.target.value);
  };

  const userColor = generateColorFrom();
  return (
    <div>
      {messageList.map((messageContent: Message) => {
        return (
          <div key={isRef.current++}>
            <div color={userColor}>{messageContent.nickname} </div>
            <div>{messageContent.message}</div>
          </div>
        );
      })}
      <Input onChange={handleMessageInput} />
      <Button onClick={handleSendMessage}>전송</Button>
    </div>
  );
}

export default ChatInput;
