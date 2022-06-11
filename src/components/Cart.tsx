import React from "react";

// components
import CartItem from "./CartItem";

// types
import { CartItemType } from "../types";

interface Props {
  cartItems: CartItemType[];
  addToCart: (item: CartItemType) => void;
  removeFromCart: (id: number) => void;
}

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  const calculateTotal = (items: CartItemType[]) => {
    return items.reduce(
      (acc: number, item) => acc + item.amount * item.price,
      0
    );
  };

  return (
    <div className="p-5 flex flex-col justify-center items-center ">
      <h2 className="text-2xl">Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-lg">Your cart is empty</p>
      ) : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2 className="text-2xl mt-3">
        Total ${calculateTotal(cartItems).toFixed(2)}
      </h2>
    </div>
  );
};

export default Cart;
