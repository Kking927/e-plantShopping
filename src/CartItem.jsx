import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";

const Cart = ({ onContinueShopping }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // ✅ Subtotal for each plant type
  const calculateTotalCost = (item) => {
    return item.price * item.quantity;
  };

  // ✅ Total for all items
  const calculateTotalAmount = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // ✅ Increment quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  // ✅ Decrement quantity (but not below 1)
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  // ✅ Remove plant type
  const handleRemove = (item) => {
    dispatch(removeItem(item.id));
  };

  // ✅ Continue shopping
  const handleContinueShopping = () => {
    onContinueShopping();
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price} × {item.quantity} = $
                {calculateTotalCost(item)}
                <button onClick={() => handleIncrement(item)}>+</button>
                <button onClick={() => handleDecrement(item)}>-</button>
                <button onClick={() => handleRemove(item)}>Remove</button>
              </li>
            ))}
          </ul>
          <h3>Total: ${calculateTotalAmount()}</h3>
        </div>
      )}
      <button onClick={handleContinueShopping}>Continue Shopping</button>
    </div>
  );
};

export default Cart;
