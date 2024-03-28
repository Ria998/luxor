import { BidType } from "../types/types";
import Button from "../components/ui/Button";
import { sharedStylesButtons } from "../styles/sharedStyles";

interface BidProps {
  data: BidType;
  i: number;
}

export const Bid = ({ data, i }: BidProps) => {
  return (
    <section className="bg-slate-800 px-5 py-4 rounded">
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
            className={`${sharedStylesButtons.buttonStyle} ${sharedStylesButtons.bidButtonStyle}`}
          >
            ACCEPT
          </Button>
          <Button
            className={`${sharedStylesButtons.buttonStyle} ${sharedStylesButtons.bidButtonStyle}`}
          >
            REJECT
          </Button>
        </div>
        <div className={sharedStylesButtons.buttonContStyle}>
          <Button
            className={`${sharedStylesButtons.buttonStyle} ${sharedStylesButtons.bidButtonStyle}`}
          >
            EDIT
          </Button>
          <Button
            className={`${sharedStylesButtons.buttonStyle} ${sharedStylesButtons.bidButtonStyle}`}
          >
            CANCEL
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Bid;
