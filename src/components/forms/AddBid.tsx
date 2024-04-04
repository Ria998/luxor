import { useState } from "react";
import { Wrapper } from "./Wrapper";
import { Label } from "../ui/forms/Label";
import { Input } from "../ui/forms/Input";

interface AddBidProps {
  onAddBid: (price: string) => void;
}

export const AddBid = ({ onAddBid }: AddBidProps) => {
  const [price, setPrice] = useState("");

  const priceChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setPrice(event.currentTarget.value);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onAddBid(price);
  };

  return (
    <Wrapper header="Add Bid" onSubmit={submitHandler}>
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
    </Wrapper>
  );
};

export default AddBid;
