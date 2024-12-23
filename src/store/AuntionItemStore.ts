import { create } from 'zustand';

interface AuctionItemInfo {
  itemName: string;
  description: string;
  price: number | undefined;
  auctionItemId: string;
  itemPicture: File[] | null;
}

interface AuctionItemStore {
  auctionItemInfo: AuctionItemInfo;
  updateItemField: (
    field: keyof AuctionItemInfo,
    value: string | number | boolean | File[] | null
  ) => void;
  resetItemForm: () => void;
  getFormItemData: () => AuctionItemInfo;
}

const initialState: AuctionItemInfo = {
  itemName: '',
  description: '',
  price: undefined,
  auctionItemId: '',
  itemPicture: null,
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
    set((state) => ({
      auctionItemInfo: {
        ...initialState,
        auctionItemId: state.auctionItemInfo.auctionItemId,
      },
    })),
  getFormItemData: () => get().auctionItemInfo,
}));

export default useAuctionItemStore;
