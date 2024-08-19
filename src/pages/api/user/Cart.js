// // pages/api/cart.js
// import { connectToDatabase } from '../../../lib/mongodb';
// import Cart from '../../../models/Cart';
// import jwt from 'jsonwebtoken';

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const { token, items } = req.body;

//     if (!token || !items) {
//       return res.status(400).json({ message: 'Missing token or items' });
//     }

//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       const { userId } = decoded;

//       await connectToDatabase();

//       let cart = await Cart.findOne({ userId });

//       if (cart) {
//         cart.items = items;
//       } else {
//         cart = new Cart({ userId, items });
//       }

//       await cart.save();
//       res.status(200).json(cart);
//     } catch (error) {
//       res.status(401).json({ message: 'Invalid token' });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }