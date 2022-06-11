import React, { useEffect, useState } from "react";
import axios from "axios";

// types
import { CartItemType } from "./types";

// components
import Item from "./components/Item";
import Cart from "./components/Cart";

// material ui components
import Drawer from "@material-ui/core/Drawer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";

const App = () => {
  const getProducts = async () => {
    await axios
      .get<CartItemType[]>("https://fakestoreapi.com/products")
      .then((response) => setProducts(response.data));
  };

  const [loading, isLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [products, setProducts] = useState<CartItemType[]>([]);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [cartOpen, setCartOpen] = useState<boolean>(false);

  useEffect(() => {
    getProducts();
  }, []);

  const getTotalItems = (items: CartItemType[]) => {
    return items.reduce((acc: number, item) => acc + item.amount, 0);
  };

  const handleAddToCart = (selectedItem: CartItemType) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.id === selectedItem.id
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === selectedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }

      return [...prevItems, { ...selectedItem, amount: 1 }];
    });
  };

  const handleRemoveFromTheCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acc;
          return [...acc, { ...item, amount: item.amount - 1 }];
        } else {
          return [...acc, item];
        }
      }, [] as CartItemType[])
    );
  };

  if (loading) return <LinearProgress />;
  if (error) return <div>Something went wrong..</div>;

  return (
    <div className="m-[40px]">
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromTheCart}
        />
      </Drawer>
      <IconButton
        className="fixed z-[100] top-0 right-0"
        onClick={() => setCartOpen(true)}
      >
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCartIcon fontSize="large" />
        </Badge>
      </IconButton>
      <Grid container spacing={3}>
        {products?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default App;
