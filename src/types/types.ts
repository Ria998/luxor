export interface BidType {
  id: number;
  collection_id: number;
  price: string;
  status: number;
  user_id: number;
}

export interface CollectionType {
  id: number;
  name: string;
  description: string;
  price: string;
  quantity: number;
  bids: BidType[];
}
