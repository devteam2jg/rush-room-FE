import {
  Heading,
  Image,
  Box,
  Text,
  Flex,
  createStandaloneToast,
  HStack,
  Divider,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { CiDollar } from 'react-icons/ci';
import useUserProfile from '../hooks/useUserProfile';

function UserProfile() {
  const nav = useNavigate();
  const { toast } = createStandaloneToast();
  const { data, error, isPending } = useUserProfile();
  console.log(data);
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
        <Text fontSize="30" fontWeight="extrabold">
          {data.name}
        </Text>
        <Image
          src={data.thumbnailUrl}
          alt="UserProfile"
          borderRadius="full"
          boxSize="80px"
        />
      </Flex>
    </Box>
  );
}

export default UserProfile;
