import { useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import {
  Button,
  Flex,
  Input,
  createStandaloneToast,
  Text,
  Box,
} from '@chakra-ui/react';
import { FaCircle } from 'react-icons/fa';
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
  const [isRecording, setIsRecording] = useState(false);
  const mediaStream = useRef<MediaStream | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  // const [highBidder, setHighBidder] = useState<string[]>([]);
  const { auctionId } = useParams();
  const userId = user?.id;
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!socket) return undefined;

    socket.on('message', (message: Message) => {
      console.log('received-message', message);
      setMessageList((list) => [...list, message]);
    });

    socket.on('bid_updated', (newBid) => {
      const highestBidder: Message = {
        auctionId: '',
        userId: 'sdaf12',
        message: `${newBid.newCurrentBid.toLocaleString()} 크레딧`,
        nickname: newBid.nickname,
      };
      setMessageList((list) => [...list, highestBidder]);
      endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
      console.log('bid_updated');
    });

    return () => {
      socket.off('message');
      socket.off('bid_updated');
      // socket.off('audioPlay');
      console.log('socket off');
    };
  }, [socket]);

  useEffect(() => {
    socket?.on('audioPlay', (audioData) => {
      const audioBlob = new Blob([audioData], { type: 'audio/webm' });

      audioBlob.arrayBuffer().then((buffer) => {
        const audioContext = new AudioContext();

        audioContext.decodeAudioData(buffer, (decodedData) => {
          const source = audioContext.createBufferSource();
          source.buffer = decodedData;

          source.detune.value = 500;

          const highPassFilter = audioContext.createBiquadFilter();
          highPassFilter.type = 'highpass';
          highPassFilter.frequency.value = 2000;
          highPassFilter.Q.value = 1;
          highPassFilter.gain.value = 15;

          const gainNode = audioContext.createGain();
          gainNode.gain.value = 2.5;

          source
            .connect(highPassFilter)
            .connect(gainNode)
            .connect(audioContext.destination);
          source.start();
          console.log('받았으니까 재생할게요');
        });
      });
    });

    return () => {
      socket?.off('audioPlay');
    };
  }, []);

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

  const handleVoiceRecord = async () => {
    setIsRecording(!isRecording);
    if (isRecording) {
      if (
        mediaRecorder.current &&
        mediaRecorder.current.state === 'recording'
      ) {
        mediaRecorder.current.stop();
      }
      if (mediaStream.current) {
        mediaStream.current.getTracks().forEach((track) => {
          track.stop();
        });
        console.log('녹음 종료 할게? 끊을게?');
      }
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        mediaStream.current = stream;
        mediaRecorder.current = new MediaRecorder(stream);

        mediaRecorder.current.ondataavailable = (e: BlobEvent) => {
          if (e.data.size > 0) {
            // chunks.current.push(e.data);
            console.log('보낼게?');
            const audioSendData = {
              data: e.data,
              auctionId,
              userId,
              nickname: user?.name,
            };
            socket?.emit('audio', audioSendData);
          }
        };

        mediaRecorder.current.onstop = () => {
          // const recordedBlob = new Blob(chunks.current, { type: 'audio/webm' });
          // const url = URL.createObjectURL(recordedBlob);
          // setRecordedUrl(url);
          // chunks.current = [];
        };

        mediaRecorder.current.start();
      } catch (error) {
        console.error('Error accessing microphone:', error);
        setIsRecording(!isRecording);
      }
    }
  };

  const handleMessageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageSent(e.target.value);
  };

  return (
    <Flex flexDirection="column" height="100%">
      <Flex
        flex="1"
        overflowY="auto"
        flexDirection="column"
        paddingBottom="62px"
      >
        {/* <Box color="white">{highBidder}</Box> */}
        {messageList.map((messageContent: Message) => {
          const lastThree = messageContent.userId.slice(-3);
          const userColor = `#${lastThree}${lastThree}`;
          return (
            <Box key={nanoid()}>
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
        padding="0 12px 0 0"
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        width="100%"
      >
        <Button
          padding="0"
          height="30px"
          _hover="#212326"
          _active="#212326"
          backgroundColor="#212326"
          onClick={handleVoiceRecord}
        >
          <FaCircle color="#C21807" />
        </Button>
        <Input
          marginRight="12px"
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
