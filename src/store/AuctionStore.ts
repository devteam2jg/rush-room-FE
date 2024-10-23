import { create } from 'zustand';

interface AuctionInfo {
  title: string;
  description: string;
  date: string;
  sellingLimitTime: number | undefined;
  createdAuctionId: string;
}

interface AuctionStore {
  auctionInfo: AuctionInfo;
  updateField: (field: keyof AuctionInfo, value: string | number) => void;
  resetForm: () => void;
  getFormData: () => AuctionInfo;
  getResponse: () => AuctionInfo['createdAuctionId'];
}

const initialState: AuctionInfo = {
  title: '',
  description: '',
  date: '',
  sellingLimitTime: undefined,
  createdAuctionId: '',
};

const useAuctionStore = create<AuctionStore>((set, get) => ({
  auctionInfo: initialState,
  updateField: (field, value) =>
    set((state) => ({
      auctionInfo: {
        ...state.auctionInfo,
        [field]: value,
      },
    })),
  resetForm: () =>
    set((state) => ({
      auctionInfo: {
        ...initialState,
        createdAuctionId: state.auctionInfo.createdAuctionId,
      },
    })),
  getFormData: () => get().auctionInfo,
  getResponse: () => get().auctionInfo.createdAuctionId,
}));

export default useAuctionStore;
