import { useEffect, useState } from 'react';
import { SocketProps } from '../../utils/types';

const useCurrentTime = ({ socket }: SocketProps) => {
  const [currentTime, setCurrentTime] = useState<number>(0);

  useEffect(() => {
    if (!socket) return undefined;
    socket?.on('TIME_UPDATE', (timeData) => {
      setCurrentTime(timeData.time);
    });
    return () => {
      socket?.off('TIME_UPDATE');
    };
  }, [socket]);
  return { currentTime };
};

export default useCurrentTime;
