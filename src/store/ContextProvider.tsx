import React, { useState } from "react";
import {
  ContextTypes,
  CollectionType,
  BidType,
  statusType,
} from "../types/types";
import AddCollection from "../components/forms/AddCollection";
import EditCollection from "../components/forms/EditCollection";
import EditBid from "../components/forms/EditBid";
import AddBid from "../components/forms/AddBid";
import {
  stateBidStatus,
  stateDeleteCollection,
  stateDeleteBid,
  stateEditCollection,
  stateEditBid,
  stateAddBid,
} from "./helper";

export const Context = React.createContext<ContextTypes | null>(null);

interface ContextProps {
  children: JSX.Element;
}

const ContextProvider = ({ children }: ContextProps) => {
  const [collections, setCollections] = useState<CollectionType[]>([]);

  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState<JSX.Element>(<></>);

  const [loadingModal, setLoadingModal] = useState(false);

  const modalCloseHandler = () => {
    setModal(false);
  };

  const addCollectionHandler = async (
    name: string,
    description: string,
    quantity: string,
    price: string
  ) => {
    setLoadingModal(true);

    try {
      const response = await fetch(`/api/collections`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          quantity: Number(quantity),
          price: Number(price),
        }),
      });

      if (response.status !== 201)
        throw new Error("Error creating collection. Please try again.");

      const data = await response.json();

      const collection: CollectionType = { ...data };
      collection.bids = [];

      setCollections((previous) => {
        const shallowClone = [...previous];
        shallowClone.unshift(collection);
        return shallowClone;
      });
      setModal(false);
    } catch (error) {
      console.log("Error: ", error);
    }

    setLoadingModal(false);
  };

  const addCollectionModal = () => {
    setModalContent(<AddCollection onAddCollection={addCollectionHandler} />);
    setModal(true);
  };

  const editCollectionHandler = async (
    id: number,
    name: string,
    description: string,
    quantity: number,
    price: string
  ) => {
    setLoadingModal(true);

    try {
      const response = await fetch(`/api/collections/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          quantity: quantity,
          price: Number(price),
        }),
      });

      if (!response.ok)
        throw new Error("Error editing collection. Please try again.");

      const data = await response.json();

      setCollections((previous) => {
        return stateEditCollection(previous, data);
      });
      setModal(false);
    } catch (error) {
      console.log("Error: ", error);
    }
    setLoadingModal(false);
  };

  const editCollectionModalHandler = (data: CollectionType) => {
    setModalContent(
      <EditCollection onEditCollection={editCollectionHandler} values={data} />
    );
    setModal(true);
  };

  const editBidHandler = async (id: number, price: string) => {
    setLoadingModal(true);

    try {
      const response = await fetch(`/api/bids/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price: Number(price),
        }),
      });

      if (!response.ok) throw new Error("Error editing Bid. Please try again.");

      const data = await response.json();

      setCollections((previous) => {
        return stateEditBid(previous, data);
      });
      setModal(false);
    } catch (error) {
      console.log("Error: ", error);
    }
    setLoadingModal(false);
  };

  const editBidModalHandler = (id: number, price: string) => {
    setModalContent(
      <EditBid initialPrice={price} onEditBid={editBidHandler.bind(null, id)} />
    );
    setModal(true);
  };

  const addBidHandler = async (id: number, price: string) => {
    try {
      const response = await fetch(`/api/bids`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          collection_id: id,
          price: Number(price),
        }),
      });

      if (response.status !== 201)
        throw new Error("Error creating bid. Please try again.");

      const data: BidType = await response.json();

      setCollections((previous) => {
        return stateAddBid(previous, data);
      });
      setModal(false);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const addBidModalHandler = (id: number) => {
    setModalContent(<AddBid onAddBid={addBidHandler.bind(null, id)} />);
    setModal(true);
  };

  const bidStatusHandler = async (
    id: number,
    collection_id: number,
    status: statusType
  ) => {
    if (!confirm(`Set bid ${id} to ${status}?`)) return;

    try {
      const response = await fetch(`/api/bids/${id}/${collection_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      });

      if (!response.ok)
        throw new Error("Error rejecting Bid. Please try again.");

      const data = await response.json();

      setCollections((previous) => {
        return stateBidStatus(previous, data, status);
      });
      setModal(false);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const deleteCollectionHandler = async (id: number, name: string) => {
    if (!confirm(`Please confirm deletion of collection: "${name}"`)) return;

    try {
      const response = await fetch(`/api/collections/${id}`, {
        method: "DELETE",
      });

      if (!response.ok)
        throw new Error("Error deleting collection. Please try again.");

      const data = await response.json();

      setCollections((previous) => {
        return stateDeleteCollection(previous, data);
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const deleteBidHandler = async (id: number, collection_id: number) => {
    if (!confirm(`Please confirm deletion of bid #${id}`)) return;

    try {
      const response = await fetch(`/api/bids/${id}`, { method: "DELETE" });

      if (!response.ok) throw new Error("Error deleting. Please try again.");

      const data = await response.json();

      setCollections((previous) => {
        return stateDeleteBid(previous, data);
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const contextData: ContextTypes = {
    collections,
    setCollections,
    modal,
    modalContent,
    modalCloseHandler,
    addCollectionModal,
    editCollectionModalHandler,
    editBidModalHandler,
    addBidModalHandler,
    bidStatusHandler,
    deleteCollectionHandler,
    deleteBidHandler,
    loadingModal,
  };

  return <Context.Provider value={contextData}>{children}</Context.Provider>;
};

export default ContextProvider;
