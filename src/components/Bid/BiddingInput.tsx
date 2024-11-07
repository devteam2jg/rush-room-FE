import { RefObject, useState } from 'react';
import { Button, createStandaloneToast, Flex, Input } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import useAuthStore from '../../store/UserAuthStore';
import { SocketProps } from '../../utils/types';

interface InputProps extends SocketProps {
  endOfMessagesRef: RefObject<HTMLElement>;
}

function BiddingInput({ socket, endOfMessagesRef }: InputProps) {
  const user = useAuthStore((state) => state.user);
  const [messageSent, setMessageSent] = useState('');
  const { toast } = createStandaloneToast();
  const { auctionId } = useParams();
  const userId = user?.id;
  const handleSendMessage = () => {
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

    socket.emit('USER_MESSAGE', messageData);
    console.log('보낸다');
    setMessageSent('');
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      console.log('엔터를 누르셨군요?');
      handleSendMessage();
    }
  };

  const handleMessageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageSent(e.target.value);
  };

  return (
    <Flex
      padding="0 12px 0 12px"
      alignItems="center"
      height={{ base: '50px', sm: '60px' }}
      backgroundColor="transparent"
      width="100%"
    >
      <Input
        focusBorderColor="#886CB5"
        fontSize={{ base: '13px', sm: '16px' }}
        marginRight="12px"
        backgroundColor="rgba(20, 20, 20, 0.4)"
        border="none"
        height={{ base: '30px', sm: '40px' }}
        color="#FCFCFD"
        value={messageSent}
        onChange={handleMessageInput}
        onKeyDown={handleInputEnter}
        placeholder="채팅을 입력해주세요."
        sx={{
          '::placeholder': {
            color: '#FCFCFD',
          },
        }}
      />
      <Button
        fontSize={{ base: '13px', sm: '16px' }}
        colorScheme="mong"
        color="#FCFCFD"
        height={{ base: '30px', sm: '40px' }}
        onClick={handleSendMessage}
      >
        전송
      </Button>
    </Flex>
  );
}

export default BiddingInput;
