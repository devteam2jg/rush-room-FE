import { create } from 'zustand';

interface AuctionInfo {
  title: string;
  description: string;
  date: string;
  sellingLimitTime: number | undefined;
  createdAuctionId: string;
  privateCode: string;
  isPrivate: boolean;
}

interface AuctionStore {
  auctionInfo: AuctionInfo;
  updateField: (
    field: keyof AuctionInfo,
    value: string | number | boolean
  ) => void;
  resetForm: () => void;
  getFormData: () => Omit<AuctionInfo, 'createdAuctionId'>;
  getResponse: () => AuctionInfo['createdAuctionId'];
}

const initialState: AuctionInfo = {
  title: '',
  description: '',
  date: '',
  sellingLimitTime: undefined,
  createdAuctionId: '',
  privateCode: '',
  isPrivate: false,
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
        // isPrivate: state.auctionInfo.isPrivate,
      },
    })),
  getFormData: () => {
    const { createdAuctionId, ...rest } = get().auctionInfo;
    return rest;
  },
  getResponse: () => get().auctionInfo.createdAuctionId,
}));

export default useAuctionStore;
