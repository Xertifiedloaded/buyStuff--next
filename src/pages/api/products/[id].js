import databaseConnection from "@/lib/mongodb";
import Product from "@/model/Products";


export default async function handler(req, res) {
  const { id } = req.query;

  await databaseConnection();

  if (req.method === "GET") {
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  } else if (req.method === "DELETE") {
    try {
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({ message: "Product deleted successfully", deletedProduct });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }



  } else if (req.method === "PATCH") {
    try {
      const updates = req.body; 
      const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true });

      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({ message: "Product updated successfully", updatedProduct });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET", "DELETE", "PATCH"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}