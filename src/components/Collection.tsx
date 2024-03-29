import Bid from "./Bid";
import Button from "../components/ui/Button";
import { BidType, CollectionType } from "../types/types";

interface CollectionProps {
  data: CollectionType;
  deleteCollectionHandler: (id: number) => void;
  deleteBidHandler: (id: number, collection_id: number) => void;
}

export const sharedStylesButtons = {
  buttonStyle: "py-1 rounded text-[14px]",
  buttonContStyle: "flex flex-col gap-1.5 w-[117px]",
  collectionButtonStyle: "bg-slate-800 hover:bg-slate-600 ",
  bidButtonStyle: "bg-slate-700 hover:bg-slate-600",
};

export const Collection = ({
  data,
  deleteBidHandler,
  deleteCollectionHandler,
}: CollectionProps) => {
  return (
    <section className="bg-slate-700 px-6 py-4 rounded">
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
            className={`${sharedStylesButtons.buttonStyle} ${sharedStylesButtons.collectionButtonStyle}`}
          >
            EDIT
          </Button>
          <Button
            clickHandler={deleteCollectionHandler.bind(null, data.id)}
            className={`${sharedStylesButtons.buttonStyle} ${sharedStylesButtons.collectionButtonStyle}`}
          >
            DELETE
          </Button>
          <Button
            className={`${sharedStylesButtons.buttonStyle} ${sharedStylesButtons.collectionButtonStyle}`}
          >
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
