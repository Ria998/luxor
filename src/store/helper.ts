import { CollectionType, BidType, statusType } from "../types/types";

export const stateBidStatus = (
  previous: CollectionType[],
  data: BidType,
  status: statusType
) => {
  const index = previous.findIndex(
    (el: CollectionType) => el.id === data.collection_id
  );

  if (index === -1) return previous;

  const shallowClone = [...previous];

  const bidsClone = [...shallowClone[index].bids];

  const indexBids = bidsClone.findIndex((el: BidType) => el.id === data.id);

  if (status === "Accepted") {
    bidsClone.forEach((el) => {
      el.status = "Rejected";
    });
  }

  bidsClone[indexBids].status = data.status;
  shallowClone[index].bids = bidsClone;
  return shallowClone;
};

export const stateEditCollection = (
  previous: CollectionType[],
  data: CollectionType
) => {
  const shallowClone = [...previous];

  const index = shallowClone.findIndex(
    (el: CollectionType) => el.id === data.id
  );

  if (index === -1) return previous;

  shallowClone[index].name = data.name;
  shallowClone[index].price = data.price;
  shallowClone[index].quantity = data.quantity;
  shallowClone[index].description = data.description;

  return shallowClone;
};

export const stateDeleteCollection = (
  previous: CollectionType[],
  data: CollectionType
) => {
  const index = previous.findIndex((el: CollectionType) => el.id === data.id);

  if (index === -1) return previous;

  const shallowClone = [...previous];

  shallowClone.splice(index, 1);

  return shallowClone;
};

export const stateAddBid = (previous: CollectionType[], data: BidType) => {
  const index = previous.findIndex(
    (el: CollectionType) => el.id === data.collection_id
  );

  if (index === -1) return previous;

  const shallowClone = [...previous];

  const bidsClone = [...shallowClone[index].bids];

  bidsClone.unshift(data);

  shallowClone[index].bids = bidsClone;

  return shallowClone;
};

export const stateEditBid = (previous: CollectionType[], data: BidType) => {
  const shallowClone = [...previous];

  const index = shallowClone.findIndex(
    (el: CollectionType) => el.id === data.collection_id
  );

  if (index === -1) return previous;

  const bidsClone = [...shallowClone[index].bids];

  const indexBids = bidsClone.findIndex((el: BidType) => el.id === data.id);

  bidsClone[indexBids].price = data.price;

  shallowClone[index].bids = bidsClone;
  return shallowClone;
};

export const stateDeleteBid = (previous: CollectionType[], data: BidType) => {
  const index = previous.findIndex(
    (el: CollectionType) => el.id === data.collection_id
  );

  if (index === -1) return previous;

  const shallowClone = [...previous];

  const bidIndexDelete = (shallowClone[index] as CollectionType).bids.findIndex(
    (el: BidType) => el.id === data.id
  );

  if (bidIndexDelete === -1) return previous;

  const cloneBids = [...(shallowClone[index] as CollectionType).bids];

  cloneBids.splice(bidIndexDelete, 1);

  (shallowClone[index] as CollectionType).bids = cloneBids;

  return shallowClone;
};
