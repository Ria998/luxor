import { useState, useEffect, useCallback } from "react";
import { BidType, CollectionType } from "../types/types";
import Button from "../components/ui/Button";

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

  const buttonStyle = "py-1 rounded text-[14px]";
  const buttonContStyle = "flex flex-col gap-1.5 w-[117px]";
  const collectionButtonStyle = "bg-slate-800 hover:bg-slate-600 ";
  const bidButtonStyle = "bg-slate-700 hover:bg-slate-600 p";

  return (
    <>
      <Button
        className={`block mx-auto mb-6 px-4 py-2 rounded ${bidButtonStyle}`}
      >
        Add new Collection
      </Button>

      <div className="flex flex-col gap-6">
        {collections.map((data: CollectionType, i) => (
          <section className="bg-slate-700 px-6 py-4 rounded" key={data.id}>
            <header className="flex justify-between">
              <div>
                <p>
                  Collection Name:{" "}
                  <span className="font-bold">{data.name}</span>
                </p>
                <p>
                  Description:{" "}
                  <span className="font-bold">{data.description}</span>
                </p>
                <p>
                  Price: <span className="font-bold">${data.price}</span>
                </p>
                <p>
                  Quantity: <span className="font-bold">{data.quantity}</span>
                </p>
              </div>

              <div className={buttonContStyle}>
                <Button className={`${buttonStyle} ${collectionButtonStyle}`}>
                  EDIT
                </Button>
                <Button className={`${buttonStyle} ${collectionButtonStyle}`}>
                  DELETE
                </Button>
                <Button className={`${buttonStyle} ${collectionButtonStyle}`}>
                  PLACE BID
                </Button>
              </div>
            </header>

            <section className="bg-slate-600 px-5 py-4 mt-3 rounded">
              <header>
                <p className="font-bold">Bids:</p>
              </header>
              <div className="flex flex-col gap-4 mt-1">
                {data.bids.map((data: BidType, i: number) => (
                  <section
                    className="bg-slate-800 px-5 py-4 rounded"
                    key={data.id}
                  >
                    <div className="flex justify-between">
                      <div>
                        <p>Bid #{i + 1}</p>
                        <p>
                          Price: $
                          <span className="font-bold">{data.price}</span>
                        </p>
                        <p>
                          Status:{" "}
                          <span className="font-bold">{data.status}</span>
                        </p>
                      </div>
                      <div className={buttonContStyle}>
                        <Button className={`${buttonStyle} ${bidButtonStyle}`}>
                          ACCEPT
                        </Button>
                        <Button className={`${buttonStyle} ${bidButtonStyle}`}>
                          REJECT
                        </Button>
                        <Button className={`${buttonStyle} ${bidButtonStyle}`}>
                          EDIT
                        </Button>
                        <Button className={`${buttonStyle} ${bidButtonStyle}`}>
                          CANCEL
                        </Button>
                      </div>
                    </div>
                  </section>
                ))}
              </div>
            </section>
          </section>
        ))}
      </div>
    </>
  );
};

export default Collections;
