import { BidType, statusType } from "../types/types";
import Button from "../components/ui/Button";
import { sharedStylesButtons } from "./Collection";
import Image from "next/image";

interface BidProps {
  data: BidType;
  onBidStatus: (id: number, collection_id: number, status: statusType) => void;
  onDeleteBid: (id: number, collection_id: number) => void;
  onEditBidModal: (id: number, price: string) => void;
}

export const Bid = ({
  data,
  onBidStatus,
  onDeleteBid,
  onEditBidModal,
}: BidProps) => {
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
            onClick={onBidStatus.bind(
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
            onClick={onBidStatus.bind(
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
            onClick={onEditBidModal.bind(null, data.id, data.price)}
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
            onClick={onDeleteBid.bind(null, data.id, data.collection_id)}
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
