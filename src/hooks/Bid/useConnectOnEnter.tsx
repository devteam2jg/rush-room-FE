import { useEffect, useRef, useState } from 'react';
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
  const SERVER_URL = 'https://sfu.rushroom.kr/sfu';

  useEffect(() => {
    if (!auctionId) return undefined;

    const newSocket = io(`${baseURL}/auction-execute`);
    const newVideoSocket = io(SERVER_URL);

    newSocket?.on('connect', () => {
      // setIsConnected(true);
      socketRef.current = newSocket;
      setSocket(newSocket);
      setSocketIsConnected(true);
      console.log('Socket connected', newSocket);
    });

    newVideoSocket.on('connect', () => {
      videoSocketRef.current = newVideoSocket;
      setVideoSocket(newVideoSocket);
      setVideoIsConnected(true);
      console.log('Connected to server:', newSocket.id);
    });

    newSocket?.on('disconnect', (reason) => {
      setSocketIsConnected(false);
      console.log('Socket disconnected', reason);
    });

    newVideoSocket?.on('disconnect', (reason) => {
      setVideoIsConnected(false);
      console.log('Video Socket disconnected', reason);
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
      console.log('End Socket Connection!');
    };
  }, [auctionId]);
};

export default useConnectOnEnter;
