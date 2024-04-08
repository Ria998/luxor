import { useState } from "react";
import { Wrapper } from ".";
import { Label, Input } from "../ui/forms";

interface AddCollectionProps {
  onAddCollection: (
    name: string,
    description: string,
    quantity: string,
    price: string
  ) => void;
}

export const AddCollection = ({ onAddCollection }: AddCollectionProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  const nameChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
  };

  const descriptionChangeHandler = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    setDescription(event.currentTarget.value);
  };

  const quantityChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setQuantity(event.currentTarget.value);
  };

  const priceChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setPrice(event.currentTarget.value);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    setError("");

    if (!name || !description || !quantity || !price) {
      setError(
        "Please eneter a string for name and description and a number for quantity and price."
      );
      return;
    }

    onAddCollection(name, description, quantity, price);
  };

  return (
    <Wrapper onSubmit={submitHandler} header="Add Collection">
      <>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            onChange={nameChangeHandler}
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Input
            type="text"
            id="description"
            name="description"
            onChange={descriptionChangeHandler}
          />
        </div>
        <div>
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            type="number"
            id="quantity"
            name="quantity"
            onChange={quantityChangeHandler}
          />
        </div>
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
