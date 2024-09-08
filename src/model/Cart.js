// models/Cart.js
import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  items: [
    {
      productId: {
        type: String,
        ref: "Product", 
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
      },
    },
  ],
  totalPrice: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);
export default Cart;
