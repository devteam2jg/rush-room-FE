import {
  Box,
  Text,
  Flex,
  createStandaloneToast,
  Avatar,
  VStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useUserProfile from '../hooks/useUserProfile';

function UserProfile() {
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
    <Box w="100%" p={6} pt={10}>
      <Flex color="white" alignItems="center" justifyContent="space-between">
        <VStack justifyContent="flex-start" alignItems="center">
          <Text fontSize="30" fontWeight="700">
            {data.name} 님
          </Text>
          <Text fontSize="20" fontWeight="700">
            어서 오세요!
          </Text>
        </VStack>

        <Avatar
          boxShadow="0 18px 50px -12px rgba(0, 0, 0, 0.85)"
          border="1px solid #664B9F"
          src={data.thumbnailUrl}
          size={{ base: 'xl', sm: '2xl' }}
        />
      </Flex>
    </Box>
  );
}

export default UserProfile;
