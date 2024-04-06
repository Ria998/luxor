import Bid from "./Bid";
import Button from "../components/ui/Button";
import { BidType, CollectionType } from "../types/types";
import Image from "next/image";

export const sharedStylesButtons = {
  buttonStyle:
    "py-1 rounded text-[14px] bg-indigo-700 hover:bg-indigo-600 font-medium",
  buttonContStyle: "flex flex-col gap-1.5 w-[100px]",
  buttonRed: "bg-red-700 hover:bg-red-600",
  buttonGreen: "bg-green-700 hover:bg-green-600",
  buttonIconCenter: "flex justify-center",
};

interface CollectionProps {
  data: CollectionType;
  deleteCollectionHandler: (id: number) => void;
  deleteBidHandler: (id: number, collection_id: number) => void;
  onAddBid: (id: number) => void;
  onEditCollection: (data: CollectionType) => void;
}

export const Collection = ({
  data,
  deleteBidHandler,
  deleteCollectionHandler,
  onAddBid,
  onEditCollection,
}: CollectionProps) => {
  return (
    <section className="bg-indigo-900 px-6 py-4 rounded">
      <header className="flex justify-between">
        <div>
          <p>
            Collection Name: <span className="font-bold">{data.name}</span>
          </p>
          <p>
            Description: <span className="font-bold">{data.description}</span>
          </p>
          <p>
            Price: <span className="font-bold">${data.price}</span>
          </p>
          <p>
            Quantity: <span className="font-bold">{data.quantity}</span>
          </p>
        </div>

        <div className={sharedStylesButtons.buttonContStyle}>
          <Button
            className={`${sharedStylesButtons.buttonStyle} ${sharedStylesButtons.buttonIconCenter}`}
            clickHandler={onEditCollection.bind(null, data)}
          >
            <Image
              src="/edit.svg"
              alt="close"
              width={23}
              height={23}
              priority
            />
          </Button>
          <Button
            clickHandler={deleteCollectionHandler.bind(null, data.id)}
            className={`${sharedStylesButtons.buttonStyle} ${sharedStylesButtons.buttonRed} ${sharedStylesButtons.buttonIconCenter}`}
          >
            <Image
              src="/delete.svg"
              alt="close"
              width={25}
              height={25}
              priority
            />
          </Button>
          <Button
            className={sharedStylesButtons.buttonStyle}
            clickHandler={onAddBid.bind(null, data.id)}
          >
            New Bid
          </Button>
        </div>
      </header>

      <section className="bg-indigo-700 px-5 py-4 mt-3 rounded">
        <header>
          <p className="font-bold">Bids:</p>
        </header>
        <div className="flex flex-col gap-4 mt-1">
          {data.bids.map((data: BidType, i: number) => (
            <Bid
              data={data}
              i={i}
              key={data.id}
              deleteBidHandler={deleteBidHandler}
            />
          ))}
        </div>
      </section>
    </section>
  );
};

export default Collection;
