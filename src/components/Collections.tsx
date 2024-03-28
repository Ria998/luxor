import { useState, useEffect, useCallback } from "react";
import { CollectionType } from "../types/types";
import Collection from "./Collection";
import Button from "../components/ui/Button";
import { sharedStylesButtons } from "./Collection";

export const Collections = () => {
  const [collections, setCollections] = useState([]);

  const fetchCollections = useCallback(async () => {
    try {
      /*
      const response = await fetch("/api/collections");

      if (!response.ok) throw new Error("Something went wrong!");

      const data = await response.json();

      setCollections(data);
      */

      setCollections(
        JSON.parse(
          `[{"id":1,"name":"x1","description":"x1 desc","quantity":2,"price":"122.21","bids":[{"id":3,"collection_id":1,"price":"121.12","user_id":1,"status":1},{"id":4,"collection_id":1,"price":"133.91","user_id":2,"status":1}]},{"id":2,"name":"x2","description":"x2 desc","quantity":3,"price":"144.12","bids":[{"id":5,"collection_id":2,"price":"155.92","user_id":1,"status":2}]}]`
        )
      );
    } catch (error) {
      // setError(error instanceof Error ? error.message : String(error));
    }
  }, []);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  return (
    <>
      <Button
        className={`block mx-auto mb-6 px-4 py-2 rounded ${sharedStylesButtons.bidButtonStyle}`}
      >
        Add new Collection
      </Button>

      <div className="flex flex-col gap-6">
        {collections.map((data: CollectionType, i) => (
          <Collection data={data} key={data.id} />
        ))}
      </div>
    </>
  );
};

export default Collections;
