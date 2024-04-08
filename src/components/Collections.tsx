import { useEffect, useCallback, useContext, useState } from "react";
import { Context } from "../store/ContextProvider";
import { CollectionType } from "../types/types";
import Collection from "./Collection";
import { Button, Loading } from "../components/ui";
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
    } catch (error) {
      console.log("Error: ", error);
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
