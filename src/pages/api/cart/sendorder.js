import { createOrder } from "@/controller/CheckOutController";


export default function handler(req, res) {
  if (req.method === 'POST') {
    return createOrder(req, res);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
