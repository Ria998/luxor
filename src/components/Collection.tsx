import Bid from "./Bid";
import Button from "../components/ui/Button";
import { BidType, CollectionType } from "../types/types";
import { sharedStylesButtons } from "../styles/sharedStyles";

interface CollectionProps {
  data: CollectionType;
}

export const Collection = ({ data }: CollectionProps) => {
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
            <Bid data={data} i={i} key={data.id} />
          ))}
        </div>
      </section>
    </section>
  );
};

export default Collection;