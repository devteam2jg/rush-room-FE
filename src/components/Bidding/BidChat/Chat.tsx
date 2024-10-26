import { useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import useAuthStore from '../../../store/UserAuthStore';

interface ChatProps {
  socket: Socket;
}

function Chat({ socket }: ChatProps) {
  const user = useAuthStore((state) => state.user);
  const { auctionId } = useParams();
  const userId = user?.id;
  const handleSendMessage = () => {
    socket.emit('message', { auctionId, userId, message });
  };
  return <div>Chat</div>;
}

export default Chat;
