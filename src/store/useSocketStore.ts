import { Socket } from 'socket.io-client';
import { create } from 'zustand';

interface SocketStore {
  socket: Socket | null;
  isConnected: boolean;
  setSocket: (socket: Socket | null) => void;
  setIsConnected: (isConnected: boolean) => void; // 단순히 상태를 저장하는 setter
}

const useSocketStore = create<SocketStore>((set) => ({
  socket: null,
  isConnected: false,
  setSocket: (socket) => set({ socket }),
  setIsConnected: (isConnected) => set({ isConnected }),
}));

export default useSocketStore;
