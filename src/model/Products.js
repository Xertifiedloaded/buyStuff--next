// models/Product.js
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const ProductSchema = new mongoose.Schema({
  productId: {
    type: String,
    default: uuidv4, 
    unique: true,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  productDetails: {
    type: String,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ["Panties", "Brallets", "Shorts", "Bra", "Night Wears", "Boxers"],
    required: true,
  },
  isFlashSale: {
    type: Boolean,
    default: false, 
  },
  isNewArrival: { 
    type: Boolean,
    default: false,
  },
});

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
export default Product;
