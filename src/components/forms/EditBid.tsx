import { useState } from "react";
import { Wrapper } from ".";
import { Label, Input } from "../ui/forms";

interface EditBidProps {
  onEditBid: (price: string) => void;
  initialPrice: string;
}

export const EditBid = ({ onEditBid, initialPrice }: EditBidProps) => {
  const [price, setPrice] = useState(initialPrice);
  const [error, setError] = useState("");

  const priceChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setPrice(event.currentTarget.value);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    setError("");

    if (!price) {
      setError("Please eneter a price.");
      return;
    }

    onEditBid(price);
  };

  return (
    <Wrapper header="Edit Bid" onSubmit={submitHandler}>
      <>
        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={priceChangeHandler}
            decimals={true}
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </>
    </Wrapper>
  );
};
