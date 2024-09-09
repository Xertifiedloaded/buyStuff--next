import databaseConnection from "@/lib/mongodb";
import Product from "@/model/Products";

export default async function handler(req, res) {
    const { productId } = req.query;
  
    if (req.method === 'GET') {
      try {
        await databaseConnection();
  
        const product = await Product.findById(productId);
  
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
  
        res.status(200).json(product);
      } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  