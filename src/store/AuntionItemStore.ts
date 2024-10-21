import { create } from 'zustand';

interface AuctionItemInfo {
  itemName: string;
  content: string;
  price: number;
}

interface AuctionItemStore {
  auctionItemInfo: AuctionItemInfo;
  updateItemField: (
    field: keyof AuctionItemInfo,
    value: string | number
  ) => void;
  resetItemForm: () => void;
  getFormItemData: () => AuctionItemInfo;
}

const initialState: AuctionItemInfo = {
  itemName: '',
  content: '',
  price: 0,
};

const useAuctionItemStore = create<AuctionItemStore>((set, get) => ({
  auctionItemInfo: initialState,
  updateItemField: (field, value) =>
    set((state) => ({
      auctionItemInfo: {
        ...state.auctionItemInfo,
        [field]: value,
      },
    })),
  resetItemForm: () =>
    set({
      auctionItemInfo: initialState,
    }),
  getFormItemData: () => get().auctionItemInfo,
}));

export default useAuctionItemStore;
