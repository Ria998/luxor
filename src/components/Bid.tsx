import { useContext } from "react";
import { Context } from "../store/ContextProvider";
import { BidType } from "../types/types";
import Button from "../components/ui/Button";
import { sharedStylesButtons } from "./Collection";
import Image from "next/image";

interface BidProps {
  data: BidType;
}

export const Bid = ({ data }: BidProps) => {
  const { editBidModalHandler, bidStatusHandler, deleteBidHandler } =
    useContext(Context);

  return (
    <section
      className={`${
        data.status === "Accepted" ? "bg-green-900" : "bg-indigo-900"
      } px-5 py-4 rounded`}
    >
      <div className="flex justify-between">
        <div>
          <p>Bid #{data.id}</p>
          <p>
            Price: $<span className="font-bold">{data.price}</span>
          </p>
          <p>
            Status: <span className="font-bold">{data.status}</span>
          </p>
        </div>
        <div className={sharedStylesButtons.buttonContStyle}>
          <Button
            onClick={bidStatusHandler.bind(
              null,
              data.id,
              data.collection_id,
              "Accepted"
            )}
            disabled={data.status === "Accepted" ? true : false}
            className={`${sharedStylesButtons.buttonStyle} ${sharedStylesButtons.buttonGreen}`}
          >
            ACCEPT
          </Button>
          <Button
            onClick={bidStatusHandler.bind(
              null,
              data.id,
              data.collection_id,
              "Rejected"
            )}
            disabled={data.status === "Rejected" ? true : false}
            className={`${sharedStylesButtons.buttonStyle} ${sharedStylesButtons.buttonRed}`}
          >
            REJECT
          </Button>
        </div>
        <div className={sharedStylesButtons.buttonContStyle}>
          <Button
            onClick={editBidModalHandler.bind(null, data.id, data.price)}
            className={`${sharedStylesButtons.buttonStyle} ${sharedStylesButtons.buttonIconCenter}`}
          >
            <Image src="/edit.svg" alt="close" width={23} height={23} />
          </Button>
          <Button
            onClick={deleteBidHandler.bind(null, data.id, data.collection_id)}
            className={`${sharedStylesButtons.buttonStyle} ${sharedStylesButtons.buttonRed} ${sharedStylesButtons.buttonIconCenter}`}
          >
            <Image src="/delete.svg" alt="close" width={25} height={25} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Bid;
