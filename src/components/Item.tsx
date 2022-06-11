import React from "react";

import Button from "@material-ui/core/Button";

// types
import { CartItemType } from "../types";

interface Props {
  item: CartItemType;
  handleAddToCart: (selectedItem: CartItemType) => void;
}

const Item: React.FC<Props> = ({ item, handleAddToCart }) => {
  return (
    <div className="flex justify-between flex-col w-full border border-solid border-blue-500 h-full rounded-[20px]">
      <img
        className="max-h-[250px] object-cover rounded-t-[20px] rounded-b-none"
        src={item.image}
        alt={item.title}
      />
      <div className="font-arial p-4">
        <h3 className="font-bold">{item.title}</h3>
        <p>{item.description} </p>
        <h3>${item.price}</h3>
      </div>
      <Button
        className="rounded-t-none rounded-b-[20px]"
        onClick={() => handleAddToCart(item)}
      >
        Add To Cart
      </Button>
    </div>
  );
};

export default Item;
