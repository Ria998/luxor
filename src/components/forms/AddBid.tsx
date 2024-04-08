import { useState } from "react";
import { Wrapper } from ".";
import { Label, Input } from "../ui/forms";

interface AddBidProps {
  onAddBid: (price: string) => void;
}

export const AddBid = ({ onAddBid }: AddBidProps) => {
  const [price, setPrice] = useState("");
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

    onAddBid(price);
  };

  return (
    <Wrapper header="Add Bid" onSubmit={submitHandler}>
      <>
        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            type="number"
            id="price"
            name="price"
            onChange={priceChangeHandler}
            decimals={true}
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </>
    </Wrapper>
  );
};
