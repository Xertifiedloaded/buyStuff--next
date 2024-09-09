
import Cart from '@/model/Cart';
import Product from '@/model/Products';
import mongoose from 'mongoose';

//  function to calculate the total price of the cart 
const calculateTotalPrice = (cartItems) => {
  return cartItems.reduce((total, item) => {
    return total + item.productId.productPrice * item.quantity;
  }, 0);
};

// Fetch the cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne().populate('items.productId');

    if (cart) {
      cart.totalPrice = calculateTotalPrice(cart.items);
      await cart.save();
    }

    res.status(200).json(cart || { items: [], totalPrice: 0 });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error });
  }
};

// Add a product to the cart
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
      // Product exists in the cart, update quantity
      cart.items[existingProductIndex].quantity += quantity;
    } else {
      // Product doesn't exist in the cart, add new item
      cart.items.push({ productId, quantity });
    }

    await cart.populate('items.productId'); // Correct way to populate after adding/updating

    cart.totalPrice = calculateTotalPrice(cart.items);
    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error adding to cart', error });
  }
};

// Update the quantity of a product in the cart
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

// Remove a product from the cart
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