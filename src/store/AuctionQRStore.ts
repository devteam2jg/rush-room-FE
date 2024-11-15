import { create } from 'zustand';

interface QR {
  AuctionUrlForQR: string;
  setQRUrl: (QRUrl: string) => void;
}

const AuctionQRStore = create<QR>((set) => ({
  AuctionUrlForQR: 'https://rushroom.kr/',
  setQRUrl: (QRUrl) => set({ AuctionUrlForQR: QRUrl }),
}));

export default AuctionQRStore;
