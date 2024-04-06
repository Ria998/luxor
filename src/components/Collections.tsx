import { useState, useEffect, useCallback } from "react";
import { BidType, CollectionType } from "../types/types";
import Collection from "./Collection";
import Button from "../components/ui/Button";
import { sharedStylesButtons } from "./Collection";
import Modal from "./modal/Modal";
import AddCollection from "./forms/AddCollection";
import EditCollection from "./forms/EditCollection";
import AddBid from "./forms/AddBid";

export const Collections = () => {
  const [collections, setCollections] = useState<CollectionType[]>([]);

  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState<JSX.Element>(<></>);

  const modalCloseHandler = () => {
    setModal(false);
  };

  const fetchCollections = useCallback(async () => {
    try {
      /*
      const response = await fetch("/api/collections");

      if (!response.ok)
        throw new Error("Error retrieving collections. Please try again.");

      const data = await response.json();

      console.log("data string", "=====", JSON.stringify(data));

      setCollections(data);
*/
      //

      setCollections(
        JSON.parse(
          `[{"id":2,"name":"Antique Toys","description":"Antique Toys","quantity":21,"price":"111221","bids":[{"id":5,"collection_id":2,"price":"21314","status":"Pending","user_id":1},{"id":6,"collection_id":2,"price":"22323","status":"Pending","user_id":2}]},{"id":1,"name":"Rare Jerseys","description":"Rare Jerseys","quantity":136,"price":"123","bids":[{"id":3,"collection_id":1,"price":"133","status":"Pending","user_id":1},{"id":4,"collection_id":1,"price":"155","status":"Pending","user_id":2}]}]`
        )
      );
    } catch (error) {
      // setError(error instanceof Error ? error.message : String(error));
    }
  }, []);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  const addCollectionHandler = async (
    name: string,
    description: string,
    quantity: string,
    price: string
  ) => {
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
      // setError(error instanceof Error ? error.message : String(error));
    }
  };

  const editCollectionHandler = async (
    id: number,
    name: string,
    description: string,
    quantity: number,
    price: string
  ) => {
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
      });
      setModal(false);
    } catch (error) {
      // setError(error instanceof Error ? error.message : String(error));
    }
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
        const index = previous.findIndex(
          (el: CollectionType) => el.id === data.collection_id
        );

        if (index === -1) return previous;

        const shallowClone = [...previous];

        const bidsClone = [...shallowClone[index].bids];

        bidsClone.unshift(data);

        shallowClone[index].bids = bidsClone;

        return shallowClone;
      });
      setModal(false);
    } catch (error) {
      // setError(error instanceof Error ? error.message : String(error));
    }
  };

  const deleteCollectionHandler = async (id: number) => {
    try {
      const response = await fetch(`/api/collections/${id}`, {
        method: "DELETE",
      });

      if (!response.ok)
        throw new Error("Error deleting collection. Please try again.");

      const data = await response.json();

      // delete bid from state so UI gets updated
      // state update dependent on previous version - so callback function format used
      // remembering to delete from/mutate clones and never mutating the original state
      setCollections((previous) => {
        const index = previous.findIndex(
          (el: CollectionType) => el.id === data.id
        );

        if (index === -1) return previous;

        const shallowClone = [...previous];

        shallowClone.splice(index, 1);

        return shallowClone;
      });
    } catch (error) {
      // setError(error instanceof Error ? error.message : String(error));
    }
  };

  const deleteBidHandler = async (id: number, collection_id: number) => {
    try {
      const response = await fetch(`/api/bids/${id}`, { method: "DELETE" });

      if (!response.ok) throw new Error("Error deleting. Please try again.");

      const data = await response.json();

      // delete bid from state so UI gets updated
      // state update dependent on previous version - so callback function format used
      // remembering to delete from/mutate clones and never mutating the original state
      setCollections((previous) => {
        const index = previous.findIndex(
          (el: CollectionType) => el.id === data.collection_id
        );

        if (index === -1) return previous;

        const shallowClone = [...previous];

        const bidIndexDelete = (
          shallowClone[index] as CollectionType
        ).bids.findIndex((el: BidType) => el.id === data.id);

        if (bidIndexDelete === -1) return previous;

        const cloneBids = [...(shallowClone[index] as CollectionType).bids];

        cloneBids.splice(bidIndexDelete, 1);

        (shallowClone[index] as CollectionType).bids = cloneBids;

        return shallowClone;
      });
    } catch (error) {
      // setError(error instanceof Error ? error.message : String(error));
    }
  };

  const addCollectionModal = () => {
    setModalContent(<AddCollection onAddCollection={addCollectionHandler} />);
    setModal(true);
  };

  const addBidModal = (id: number) => {
    setModalContent(<AddBid onAddBid={addBidHandler.bind(null, id)} />);
    setModal(true);
  };

  const editCollectionModal = (data: CollectionType) => {
    setModalContent(
      <EditCollection onEditCollection={editCollectionHandler} values={data} />
    );
    setModal(true);
  };

  return (
    <>
      {modal && (
        <Modal isOpen={modal} handleClose={modalCloseHandler}>
          {modalContent}
        </Modal>
      )}

      <div>
        <Button
          clickHandler={addCollectionModal}
          className={`${sharedStylesButtons.buttonStyle} block mx-auto mb-6 px-4 py-2 text-[16px]`}
        >
          New Collection
        </Button>

        <div className="flex flex-col gap-6">
          {collections.map((data: CollectionType, i) => (
            <Collection
              data={data}
              key={data.id}
              onAddBid={addBidModal}
              onEditCollection={editCollectionModal}
              deleteCollectionHandler={deleteCollectionHandler}
              deleteBidHandler={deleteBidHandler}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Collections;
