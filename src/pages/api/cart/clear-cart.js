import { clearCart } from "@/controller/CartItems";
import databaseConnection from "@/lib/mongodb";



export default function handler(req, res) {
    databaseConnection()
    switch (req.method) {

      case 'POST':
        return clearCart(req, res);

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  