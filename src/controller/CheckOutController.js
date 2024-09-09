
import Cart from '@/model/Cart';
import Order from '@/model/OrderConfirmation';
import mongoose from 'mongoose';


export const createOrder = async (req, res) => {
  const { name, email, phone, address, cartItems, totalPrice } = req.body;

  if (!name || !email || !phone || !address || !cartItems || !totalPrice) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart items are required' });
    }

    const newOrder = new Order({
      name,
      email,
      phone,
      address,
      cartItems,
      totalPrice,
    });

    await newOrder.save();
    await Cart.findOneAndUpdate({}, { $set: { items: [], totalPrice: 0 } });

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
};
