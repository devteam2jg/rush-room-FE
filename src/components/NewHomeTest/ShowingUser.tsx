import { createStandaloneToast, HStack, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useUserProfile from '../../hooks/useUserProfile';

function ShowingUser() {
  const nav = useNavigate();
  const { toast } = createStandaloneToast();
  const { data, error, isPending } = useUserProfile();
  if (isPending) {
    return <div>Loading...!!</div>;
  }

  if (error) {
    nav('/');
    toast({
      title: '실패',
      description: `${error.message}`,
      status: 'error',
      variant: 'left-accent',
      duration: 3000,
      isClosable: true,
    });
  }
  return (
    <HStack
      w="100%"
      padding="20px"
      justifyContent="space-between"
      align="center"
      borderRadius="3xl"
    >
      <Text fontSize="lg">
        안녕하세요, {`${data.name}`}님!
        <br />
        경매에 한번 참여해볼까요?
      </Text>
      <Image
        src={`${data.thumbnailUrl}`}
        alt="UserThumbnail"
        height="40px"
        borderRadius="full"
        boxSize="60px"
      />
    </HStack>
  );
}

export default ShowingUser;
