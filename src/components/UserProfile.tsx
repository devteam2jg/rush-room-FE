import {
  Heading,
  Image,
  Box,
  Flex,
  createStandaloneToast,
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
    <Box w="100%">
      <Flex
        p={6}
        pt={14}
        backgroundColor="#886CB5"
        color="white"
        alignItems="center"
        justifyContent="space-between"
        boxShadow="md"
        borderBottomRadius="2xl"
      >
        <Heading as="h1" size="lg" fontWeight="900">
          {data.name}
        </Heading>
        <Image
          src={data.thumbnailUrl}
          alt="UserProfile"
          borderRadius="lg"
          boxSize="100px"
        />
      </Flex>
    </Box>
  );
}

export default UserProfile;
