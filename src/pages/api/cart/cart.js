
import { addToCart, getCart, removeFromCart, updateCartItem } from "@/controller/CartItems";
import databaseConnection from "@/lib/mongodb";


export default function handler(req, res) {
  databaseConnection()
  switch (req.method) {
    case 'GET':
      return getCart(req, res);
    case 'POST':
      return addToCart(req, res);
    case 'PUT':
      return updateCartItem(req, res);
    case 'DELETE':
      return removeFromCart(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
