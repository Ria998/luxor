import { useEffect, useCallback, useContext, useState } from "react";
import { Context } from "../store/ContextProvider";
import { CollectionType } from "../types/types";
import Collection from "./Collection";
import Button from "../components/ui/Button";
import Loading from "../components/ui/Loading";
import { sharedStylesButtons } from "./Collection";
import Modal from "./modal/Modal";

export const Collections = () => {
  const {
    collections,
    setCollections,
    modal,
    modalContent,
    modalCloseHandler,
    addCollectionModal,
  } = useContext(Context);

  const [loadingCollections, setLoadingCollections] = useState(false);

  const fetchCollections = useCallback(async () => {
    setLoadingCollections(true);

    try {
      const response = await fetch("/api/collections");

      if (!response.ok)
        throw new Error("Error retrieving collections. Please try again.");

      const data = await response.json();

      setCollections(data);

      //
      /*
      setCollections(
        JSON.parse(
          `[{"id":2,"name":"Antique Toys","description":"Antique Toys","quantity":21,"price":"111221","bids":[{"id":5,"collection_id":2,"price":"21314","status":"Pending","user_id":1},{"id":6,"collection_id":2,"price":"22323","status":"Pending","user_id":2}]},{"id":1,"name":"Rare Jerseys","description":"Rare Jerseys","quantity":136,"price":"123","bids":[{"id":3,"collection_id":1,"price":"133","status":"Pending","user_id":1},{"id":4,"collection_id":1,"price":"155","status":"Pending","user_id":2}]}]`
        )
      );
      */
    } catch (error) {
      // setError(error instanceof Error ? error.message : String(error));
    }
    setLoadingCollections(false);
  }, []);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  return (
    <>
      {modal && (
        <Modal isOpen={modal} handleClose={modalCloseHandler}>
          {modalContent}
        </Modal>
      )}
      <div>
        <Button
          onClick={addCollectionModal}
          className={`${sharedStylesButtons.buttonStyle} block mx-auto mb-6 px-4 py-2 text-[16px]`}
        >
          New Collection
        </Button>

        {loadingCollections && (
          <Loading width={48} height={48} className="mx-auto mt-9" />
        )}

        {!loadingCollections && (
          <div className="flex flex-col gap-6">
            {collections.map((data: CollectionType) => (
              <Collection data={data} key={data.id} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Collections;
