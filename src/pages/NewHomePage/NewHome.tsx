import {
  Box,
  Button,
  Flex,
  Image,
  VStack,
  Skeleton,
  SkeletonCircle,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ShowingUser from '../../components/NewHomeTest/ShowingUser';
import Navigator from '../../components/Navigator';
import ShowingItem from '../../components/NewHomeTest/ShowingItem';
import serviceLogo from '../../assets/images/serviceLogo.png';
import useAuthStore from '../../store/UserAuthStore';
import useShowToast from '../../hooks/useShowToast';
import axiosInstance from '../../utils/AxiosInstance';

function UserSkeleton() {
  return (
    <Flex p={4} width="100%" justify="space-between" align="flex-start">
      <VStack align="stretch" flex={1} mr={4} spacing={3}>
        {[...Array(2)].map((_, index) => (
          <Skeleton
            key={index}
            height="20px"
            startColor="gray.700"
            endColor="gray.600"
            width={`${Math.random() * 30 + 60}%`}
          />
        ))}
      </VStack>
      <Flex direction="column" align="center" minW="60px">
        <SkeletonCircle size="60px" startColor="gray.700" endColor="gray.600" />
        <Skeleton
          mt={2}
          height="12px"
          width="40px"
          startColor="gray.700"
          endColor="gray.600"
        />
      </Flex>
    </Flex>
  );
}

function NewHome() {
  const nav = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const showToast = useShowToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const getLogout = async () => {
    try {
      await axiosInstance.get('/auth/logout');
      return { success: true, message: '로그아웃 성공' };
    } catch (error) {
      return { success: false, message: '로그아웃 중 오류가 발생했습니다.' };
    }
  };

  const handleLogout = async () => {
    const result = await getLogout();
    if (result.success) {
      logout();
      showToast('로그아웃 성공', result.message, 'success');
      nav('/login');
    } else {
      showToast('로그아웃 실패', result.message, 'error');
    }
  };

  return (
    <Box
      height="calc(var(--vh, 1vh) * 100)"
      backgroundColor="#161717"
      position="relative"
      width="100%"
      overflow="hidden"
    >
      <Box height="100%">
        <Flex p={3} justifyContent="space-between">
          <Image height="50px" src={serviceLogo} onClick={() => nav('/')} />
          <Button
            backgroundColor="transparent"
            onClick={handleLogout}
            color="#FCFCFD"
          >
            LOG OUT
          </Button>
        </Flex>
        <VStack
          marginBottom="500px"
          display={isLoading ? 'block' : 'none'}
          width="100%"
          justifyContent="space-between"
          color="white"
        >
          <UserSkeleton />
          <Box
            height={{
              base: 'calc(calc(var(--vh, 1vh) * 100) - 250px)',
              sm: 'calc(calc(var(--vh, 1vh) * 100) - 250px)',
            }}
            width="100%"
            overflowY="auto"
          >
            <div className="grid grid-cols-2 gap-5 p-4">
              {[...Array(6)].map((_, index) => (
                <Box
                  key={index}
                  position="relative"
                  w={{ base: '140px', sm: '180px' }}
                  h={{ base: '200px', sm: '72' }}
                  rounded="lg"
                  overflow="hidden"
                >
                  <Skeleton
                    height="100%"
                    startColor="gray.700"
                    endColor="gray.600"
                  />
                  <Box
                    position="absolute"
                    bottom="68px"
                    left="3"
                    display="flex"
                    alignItems="center"
                    zIndex="20"
                  >
                    <SkeletonCircle size="6" mr="2" />
                    <Skeleton height="3" width="60px" />
                  </Box>
                  <Box
                    position="absolute"
                    bottom="0"
                    left="0"
                    right="0"
                    h="60px"
                    bg="white"
                    roundedBottom="xl"
                    p="2"
                    zIndex="20"
                  >
                    <Skeleton height="4" mb="2" />
                    <Skeleton height="3" width="70%" />
                  </Box>
                </Box>
              ))}
            </div>
          </Box>
        </VStack>
        <VStack width="100%" justifyContent="space-between" color="white">
          <ShowingUser />
          <ShowingItem />
          <Navigator />
        </VStack>
      </Box>
    </Box>
  );
}

export default NewHome;
