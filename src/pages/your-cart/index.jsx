
import { deleteFromCart, getCart, updateCartQuantity } from '@/utils/cart-utils/CartUtils';
import React, { useState, useEffect } from 'react';


function YourCart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchCart() {
      const { cart, total } = await getCart();
      setCart(cart);
      setTotal(total);
    }
    fetchCart();
  }, []);

  const handleQuantityChange = async (productId, quantity) => {
    await updateCartQuantity(productId, quantity);
    const { cart, total } = await getCart();
    setCart(cart);
    setTotal(total);
  };

  const handleDelete = async (productId) => {
    await deleteFromCart(productId);
    const { cart, total } = await getCart();
    setCart(cart);
    setTotal(total);
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map(item => (
            <li key={item.productId}>
              <span>Product ID: {item.productId}</span>
              <button onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}>+</button>
              <span>Quantity: {item.quantity}</span>
              <button onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}>-</button>
              <button onClick={() => handleDelete(item.productId)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <div>Total: ${total.toFixed(2)}</div>
    </div>
  );
}

export default YourCart;
