
import Cart from '@/model/Cart';
import Product from '@/model/Products';
import mongoose from 'mongoose';

// total
const calculateTotalPrice = (cartItems) => {
  return cartItems.reduce((total, item) => {
    return total + item.productId.productPrice * item.quantity;
  }, 0);
};

// all cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne().populate('items.productId');
console.log(cart);

    if (cart) {
      cart.totalPrice = calculateTotalPrice(cart.items);
      await cart.save();
    }

    res.status(200).json(cart || { items: [], totalPrice: 0 });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error });
  }
};

// AddToCart
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({});
    if (!cart) {
      cart = new Cart({ items: [], totalPrice: 0 });
    }

    const existingProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingProductIndex >= 0) {
      cart.items[existingProductIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
// Correct way to populate after adding/updating
    await cart.populate('items.productId'); 
    cart.totalPrice = calculateTotalPrice(cart.items);
    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error adding to cart', error });
  }
};

// update Quantity
export const updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  try {
    let cart = await Cart.findOne({});
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const existingProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingProductIndex >= 0) {
      cart.items[existingProductIndex].quantity = quantity;
      await cart.populate('items.productId');
      cart.totalPrice = calculateTotalPrice(cart.items);
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: 'Product not found in the cart' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart', error });
  }
};

// Remove from cart
export const removeFromCart = async (req, res) => {
  const { productId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  try {
    let cart = await Cart.findOne({});
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
    await cart.populate('items.productId');
    cart.totalPrice = calculateTotalPrice(cart.items);
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error removing from cart', error });
  }
};


export const clearCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({});
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error clearing cart', error });
  }
}