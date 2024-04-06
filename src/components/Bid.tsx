import { BidType } from "../types/types";
import Button from "../components/ui/Button";
import { sharedStylesButtons } from "./Collection";
import Image from "next/image";

interface BidProps {
  data: BidType;
  i: number;
  deleteBidHandler: (id: number, collection_id: number) => void;
}

export const Bid = ({ data, i, deleteBidHandler }: BidProps) => {
  return (
    <section className="bg-indigo-900 px-5 py-4 rounded">
      <div className="flex justify-between">
        <div>
          <p>Bid #{i + 1}</p>
          <p>
            Price: $<span className="font-bold">{data.price}</span>
          </p>
          <p>
            Status: <span className="font-bold">{data.status}</span>
          </p>
        </div>
        <div className={sharedStylesButtons.buttonContStyle}>
          <Button
            className={`${sharedStylesButtons.buttonStyle} ${sharedStylesButtons.buttonGreen}`}
          >
            ACCEPT
          </Button>
          <Button
            className={`${sharedStylesButtons.buttonStyle} ${sharedStylesButtons.buttonRed}`}
          >
            REJECT
          </Button>
        </div>
        <div className={sharedStylesButtons.buttonContStyle}>
          <Button
            className={`${sharedStylesButtons.buttonStyle} ${sharedStylesButtons.buttonIconCenter}`}
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
            clickHandler={deleteBidHandler.bind(
              null,
              data.id,
              data.collection_id
            )}
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
        </div>
      </div>
    </section>
  );
};

export default Bid;
