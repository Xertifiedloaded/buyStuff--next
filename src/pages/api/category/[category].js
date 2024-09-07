import databaseConnection from "@/lib/mongodb";
import Product from "@/model/Products";

export default async function handler(req, res) {
  await databaseConnection(); 
  const { category } = req.query; 
  try {
    const products = await Product.find(category ? { category } : {}); // If no category, return all products
    res.status(200).json(products); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching products" });
  }
}
