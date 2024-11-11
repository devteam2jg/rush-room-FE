import { Box, Button, Flex, Image, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import ShowingUser from '../../components/NewHomeTest/ShowingUser';
import Navigator from '../../components/Navigator';
import ShowingItem from '../../components/NewHomeTest/ShowingItem';
import serviceLogo from '../../assets/images/serviceLogo.png';
import useAuthStore from '../../store/UserAuthStore';
import useShowToast from '../../hooks/useShowToast';
import axiosInstance from '../../utils/AxiosInstance';

function NewHome() {
  const nav = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const showToast = useShowToast();
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
      // minHeight="calc(var(--vh, 1vh) * 100)"
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
