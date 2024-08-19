// pages/api/users/[id].js
import { connectToDatabase } from '../../../lib/mongodb';
import User from '../../../models/User';
import jwt from 'jsonwebtoken';

const protect = async (req, res, next) => {
  const { cookies } = req;
  const token = cookies.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (err) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export default async function handler(req, res) {
  await connectToDatabase();
  await protect(req, res, async () => {
    if (req.method === 'PATCH') {
      const { name, email, password } = req.body;

      try {
        const user = await User.findById(req.query.id);

        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        user.name = name || user.name;
        user.email = email || user.email;

        if (password) {
          user.password = password;
        }

        await user.save();
        res.json({ user });
      } catch (err) {
        res.status(500).json({ message: 'Server error' });
      }
    } else {
      res.setHeader('Allow', ['PATCH']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  });
}