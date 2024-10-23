import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/UserAuthStore';
import axiosInstance from '../../utils/AxiosInstance';
import useShowToast from '../../hooks/useShowToast';
import Navigator from '../../components/Navigator';
import Guide from '../../components/Guide';

function Home() {
  const logout = useAuthStore((state) => state.logout);
  const showToast = useShowToast();
  const nav = useNavigate();
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
      // queryClient.removeQueries({ queryKey: ['userInfo'] });
      showToast('로그아웃 성공', result.message, 'success');
      nav('/login');
    } else {
      showToast('로그아웃 실패', result.message, 'error');
    }
  };

  return (
    <>
      <div>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      <Guide />
      <Navigator />
    </>
  );
}

export default Home;
