import { create } from 'zustand';

interface History {
  lastAuction: string | undefined;
  setlastAuction: (auctionId: string | undefined) => void;
}

const AuctionHistoryStore = create<History>((set) => ({
  lastAuction: undefined,
  setlastAuction: (auctionId) => set({ lastAuction: auctionId }),
}));

export default AuctionHistoryStore;
