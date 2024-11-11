import { Box, Button, Flex, HStack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuthStore from '../../store/UserAuthStore';
import RTCTestPage from '../../pages/RTCTestPage';
import SpringModal from '../Modal/SpringModal';
import VideoSocketStore from '../../store/VideoSocketStore';
import useSocketStore from '../../store/useSocketStore';

function BiddingStream() {
  const socket = useSocketStore((state) => state.socket);
  const isConnected = useSocketStore((state) => state.isConnected);
  const videoSocket = VideoSocketStore((state) => state.socket);
  const isVideoConnected = VideoSocketStore((state) => state.isConnected);
  const { auctionId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [sellerId, setSellerId] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const checkOwnership = () => {
      const ownerStatus = sellerId === user?.id;
      setIsOwner(ownerStatus);

      if (ownerStatus) {
        setIsOpen(true);
        if (confirmed) {
          setIsOpen(false);
        }
      }
    };

    checkOwnership();
    setCameraOff(false);
  }, [sellerId]);

  useEffect(() => {
    if (confirmed) {
      setIsOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!socket) return undefined;

    const handleSellerId = (response: any) => {
      const { type } = response;

      if (type === 'BID_READY') {
        setConfirmed(false);
        setIsOwner(false);
        setSellerId(response.sellerId);
      } else if (type === 'BID_END') {
        setCameraOff(true);
        setConfirmed(false);
      } else if (type === 'CAMERA_REQUEST') {
        setIsOwner(true);
        setIsOpen(true);
      }
    };

    socket.on('NOTIFICATION', handleSellerId);

    const sendCameraRequest = {
      auctionId,
      type: 'CAMERA',
      userId: user?.id,
    };

    socket.emit('CONTEXT', sendCameraRequest);

    return () => {
      socket.off('NOTIFICATION', handleSellerId);
    };
  }, [socket]);

  if (!isConnected || !isVideoConnected) {
    return <div>Loading...</div>;
  }

  const handleConfirm = () => {
    if (!videoSocket) return;
    setConfirmed(true);
    const agreementSend = {
      roomId: auctionId,
      isAgreed: true,
    };

    videoSocket.emit('seller-agreed', agreementSend);
    setIsOpen(false);
  };

  const handleReject = () => {
    if (!videoSocket) return;
    setConfirmed(false);
    const agreementSend = {
      roomId: auctionId,
      isAgreed: false,
    };

    videoSocket.emit('seller-agreed', agreementSend);
    setIsOpen(false);
  };

  return (
    <Box width="100%" height="100%">
      <SpringModal p="p-10" isOpen={isOpen} setIsOpen={setIsOpen}>
        <Box padding="12px" color="#FCFCFD" bg="#282828" width="100%">
          알림
        </Box>
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          padding="15px"
          color="#FCFCFD"
          bg="#222222"
          gap={5}
        >
          <Text fontSize={{ base: '20px' }}>물건을 팔아 볼 차례예요.</Text>
          <Text fontSize={{ base: '18px' }}>
            판매를 위해 카메라를 켜주세요!
          </Text>
          <HStack gap={5} justifyContent="center" width="100%">
            <Button onClick={handleConfirm} width="100px" colorScheme="mong">
              동의
            </Button>
            <Button
              onClick={handleReject}
              width="100px"
              colorScheme="mongCancle"
            >
              거부
            </Button>
          </HStack>
        </Flex>
      </SpringModal>

      <RTCTestPage cameraOff={cameraOff} isOwner={isOwner} />
    </Box>
  );
}

export default BiddingStream;
