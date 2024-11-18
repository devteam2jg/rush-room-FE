import { memo } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { Message } from '../../utils/types';

interface ChatMessageProps {
  messageContent: Message;
}

function BiddingChatMessage({ messageContent }: ChatMessageProps) {
  const lastThree = messageContent.userId.slice(-3);
  const userColor = `#${lastThree}${lastThree}`;

  if (messageContent.auctionId) {
    return (
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
    );
  }

  return (
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
  );
}

export default memo(BiddingChatMessage);
