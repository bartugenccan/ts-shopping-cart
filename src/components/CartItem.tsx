import React from "react";

// material ui
import Button from "@material-ui/core/Button";

// types
import { CartItemType } from "../types";

interface Props {
  item: CartItemType;
  addToCart: (selectedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
}

const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => {
  return (
    <div className="flex justify-between font-arial border-b-2 pb-5">
      <div className="flex-1">
        <h3> {item.title} </h3>
        <div className="flex justify-between">
          <p>Price: ${item.price}</p>
          <p> Total: ${(item.amount * item.price).toFixed(2)} </p>
        </div>
        <div className="flex justify-between">
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => removeFromCart(item.id)}
          >
            -
          </Button>
          <p> {item.amount} </p>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => addToCart(item)}
          >
            +
          </Button>
        </div>
      </div>
      <img
        className="max-w-[80px] object-cover ml-10"
        src={item.image}
        alt={item.title}
      />
    </div>
  );
};

export default CartItem;
