import { Text, Box, Button, Image, Flex } from '@chakra-ui/react';
import kakaoLogo from '../../assets/images/kakaoLogo.png';
import ServiceLogo from '../../assets/images/serviceLogo.png';

const baseAPIURL = import.meta.env.VITE_APP_API_BASE_URL;

function Login() {
  const handleKakaoLoginButtonClick = () => {
    window.location.href = `${baseAPIURL}/api/v1/auth/kakao`;
  };
  return (
    <Flex
      gap="40px"
      width="100%"
      height="calc(var(--vh, 1vh) * 100)"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Image width="157px" src={ServiceLogo} marginBottom="10px" />
      <Text color="blackAlpha.900" fontWeight={500} textAlign="center">
        간편하게 로그인 하고
        <br />
        다양한 서비스를 이용해보세요.
      </Text>
      <Box>
        <Button
          backgroundColor="#fee500"
          borderRadius="12px"
          size="md"
          width="290px"
          height="50px"
          color="#000000d9"
          _hover={{ backgroundColor: '#e6ce00' }}
          leftIcon={<Image src={kakaoLogo} alt="Kakao Logo" boxSize="25px" />}
          onClick={handleKakaoLoginButtonClick}
        >
          <Text fontSize="16px" fontWeight={700}>
            카카오 로그인
          </Text>
        </Button>
      </Box>
    </Flex>
  );
}

export default Login;
