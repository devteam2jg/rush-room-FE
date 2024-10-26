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
