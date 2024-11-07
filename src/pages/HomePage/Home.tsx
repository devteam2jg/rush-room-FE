import { Box, Button, Flex, Heading, Image, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { IoIosLogOut } from 'react-icons/io';
import useAuthStore from '../../store/UserAuthStore';
import axiosInstance from '../../utils/AxiosInstance';
import useShowToast from '../../hooks/useShowToast';
import Navigator from '../../components/Navigator';
import Guide from '../../components/Guide';
import serviceLogo from '../../assets/images/serviceLogo.png';
import NewHome from '../../components/NewHome';
import SquishyCard from '../../components/SquishyCard';
import Example from '../../components/TiltCard';

function Home() {
  const logout = useAuthStore((state) => state.logout);
  const showToast = useShowToast();
  const nav = useNavigate();
  const data = useAuthStore();
  console.log(data);
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
      minHeight="calc(var(--vh, 1vh) * 100)"
      height="100%"
      backgroundColor="#282828"
      position="relative"
      width="100%"
    >
      <Flex
        direction="column"
        width="100%"
        justifyContent="space-between"
        align="center"
        backgroundColor="#161717"
      >
        <Flex w="100%" justifyContent="space-between" align="center">
          <Image height="50px" src={serviceLogo} />
          <Button
            backgroundColor="transparent"
            onClick={handleLogout}
            color="white"
          >
            {/* <Image
              src={`${data.user?.thumbnailUrl}`}
              height="40px"
              borderRadius="10px"
            /> */}
            LOG OUT
            {/* <IoIosLogOut /> */}
          </Button>
        </Flex>

        <Box width="100%" overflowY="auto">
          {/* <Guide /> */}
          <Box
            p={4}
            textAlign="center"
            backgroundColor="#282828"
            maxHeight="100vh"
          >
            <VStack spacing={4}>
              <Heading as="h1" size="sm" color="white">
                우리 홈페이지 새단장 중 입니다.
              </Heading>
              <Image
                src="/images/home.jpg"
                alt="정상영업중"
                objectFit="cover"
                borderRadius="lg"
                shadow="md"
              />
            </VStack>
            <Example />
          </Box>
          <Navigator />
        </Box>
      </Flex>
    </Box>
  );
}

export default Home;
