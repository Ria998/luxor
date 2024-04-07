import { useState } from "react";
import { Wrapper } from "./Wrapper";
import { Label } from "../ui/forms/Label";
import { Input } from "../ui/forms/Input";

interface EditBidProps {
  onEditBid: (price: string) => void;
  initialPrice: string;
}

export const EditBid = ({ onEditBid, initialPrice }: EditBidProps) => {
  const [price, setPrice] = useState(initialPrice);

  const priceChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setPrice(event.currentTarget.value);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onEditBid(price);
  };

  return (
    <Wrapper header="Edit Bid" onSubmit={submitHandler}>
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
    </Wrapper>
  );
};

export default EditBid;
