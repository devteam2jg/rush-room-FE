import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import useSocketStore from '../../store/useSocketStore';
import VideoSocketStore from '../../store/VideoSocketStore';

interface SocketProps {
  auctionId: string | undefined;
}

const useConnectOnEnter = ({ auctionId }: SocketProps) => {
  const socketRef = useRef<Socket | null>(null);
  const videoSocketRef = useRef<Socket | null>(null);
  const setSocket = useSocketStore((state) => state.setSocket);
  const setSocketIsConnected = useSocketStore((state) => state.setIsConnected);
  const setVideoSocket = VideoSocketStore((state) => state.setSocket);
  const setVideoIsConnected = VideoSocketStore((state) => state.setIsConnected);
  const baseURL = import.meta.env.VITE_APP_SOCKET_URL;
  const GAME_SERVER_URL = `${baseURL}/game`;
  const MEDIA_SERVER_URL = `${baseURL}/media`;

  useEffect(() => {
    if (!auctionId) return undefined;

    const newSocket = io(GAME_SERVER_URL, {
      path: '/game/socket.io',
    });
    const newVideoSocket = io(MEDIA_SERVER_URL, {
      path: '/media/socket.io',
    });

    newSocket?.on('connect', () => {
      // setIsConnected(true);
      socketRef.current = newSocket;
      setSocket(newSocket);
      setSocketIsConnected(true);
    });

    newSocket.on('connect_error', (error) => {});

    newVideoSocket.on('connect', () => {
      videoSocketRef.current = newVideoSocket;
      setVideoSocket(newVideoSocket);
      setVideoIsConnected(true);
    });

    newVideoSocket.on('connect_error', (error) => {});

    newSocket?.on('disconnect', (reason) => {
      setSocketIsConnected(false);
    });

    newVideoSocket?.on('disconnect', (reason) => {
      setVideoIsConnected(false);
    });

    return () => {
      videoSocketRef.current?.emit('leave-room', { roomId: auctionId });
      setSocket(null);
      setVideoSocket(null);
      setSocketIsConnected(false);
      setVideoIsConnected(false);
      socketRef.current?.off('connect');
      socketRef.current?.off('disconnect');
      videoSocketRef.current?.off('connect');
      videoSocketRef.current?.off('disconnect');
      socketRef.current?.disconnect();
      videoSocketRef.current?.disconnect();
      // setIsConnected(false);
    };
  }, [auctionId]);
};

export default useConnectOnEnter;
