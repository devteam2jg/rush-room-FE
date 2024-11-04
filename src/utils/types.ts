import { Socket } from 'socket.io-client';

export interface User {
  nickname: string;
  id: string;
  email: string;
  profileUrl: string;
  thumbnailUrl: string;
}

export interface AuctionItem {
  id: string;
  title: string;
  imageUrls: string[];
  startPrice: number;
  isSold: boolean;
  postedUser: User;
}

export interface AuctionBidItem {
  id: string;
  title: string;
  imageUrls: string[];
  startPrice: number;
  isSold: boolean;
  postedUser: User;
  buyerId: string;
  description: string;
  lastPrice: number;
}

export interface SocketProps {
  socket: Socket | null;
}
