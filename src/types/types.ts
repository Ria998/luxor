export interface BidType {
  id: number;
  collection_id: number;
  price: string;
  status: string;
  user_id: number;
}

export interface CollectionType {
  id: number;
  name: string;
  description: string;
  price: string;
  quantity: number;
  bids: BidType[] | [];
}

export type statusType = "Pending" | "Accepted" | "Rejected";

export interface ContextTypes {
  collections: CollectionType[];
  setCollections: (prev: CollectionType[]) => void;
  modal: boolean;
  modalContent: JSX.Element;
  modalCloseHandler: () => void;
  addCollectionModal: () => void;
  editCollectionModalHandler: (data: CollectionType) => void;
  editBidModalHandler: (id: number, price: string) => void;
  addBidModalHandler: (id: number) => void;
  bidStatusHandler: (
    id: number,
    collection_id: number,
    status: statusType
  ) => void;
  deleteCollectionHandler: (id: number, name: string) => void;
  deleteBidHandler: (id: number, collection_id: number) => void;
  loadingModal: boolean;
}
