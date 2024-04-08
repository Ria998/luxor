import { useState } from "react";
import { Wrapper } from "./Wrapper";
import { Label } from "../ui/forms/Label";
import { Input } from "../ui/forms/Input";
import { CollectionType } from "../../types/types";

interface EditCollectionProps {
  onEditCollection: (
    id: number,
    name: string,
    description: string,
    quantity: number,
    price: string
  ) => void;
  values: CollectionType;
}

export const EditCollection = ({
  onEditCollection,
  values,
}: EditCollectionProps) => {
  const [name, setName] = useState(values ? values.name : "");
  const [description, setDescription] = useState(
    values ? values.description : ""
  );
  const [quantity, setQuantity] = useState(values ? values.quantity : 0);
  const [price, setPrice] = useState(values ? values.price : "");
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
    setQuantity(Number(event.currentTarget.value));
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

    onEditCollection(values.id, name, description, quantity, price);
  };

  return (
    <Wrapper onSubmit={submitHandler} header="Edit Collection">
      <>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            onChange={nameChangeHandler}
            value={name}
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Input
            type="text"
            id="description"
            name="description"
            onChange={descriptionChangeHandler}
            value={description}
          />
        </div>
        <div>
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            type="number"
            id="quantity"
            name="quantity"
            onChange={quantityChangeHandler}
            value={quantity}
          />
        </div>
        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            type="number"
            id="price"
            name="price"
            onChange={priceChangeHandler}
            value={price}
            decimals={true}
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </>
    </Wrapper>
  );
};

export default EditCollection;
