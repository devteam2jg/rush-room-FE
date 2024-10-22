import { create } from 'zustand';

interface AuctionInfo {
  title: string;
  content: string;
  date: string;
  duration: number | undefined;
}

interface AuctionStore {
  auctionInfo: AuctionInfo;
  updateField: (field: keyof AuctionInfo, value: string | number) => void;
  resetForm: () => void;
  getFormData: () => AuctionInfo;
}

const initialState: AuctionInfo = {
  title: '',
  content: '',
  date: '',
  duration: undefined,
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
    set({
      auctionInfo: initialState,
    }),
  getFormData: () => get().auctionInfo,
}));

export default useAuctionStore;
