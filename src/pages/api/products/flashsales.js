import databaseConnection from "@/lib/mongodb";
import Product from "@/model/Products";

export default async function handler(req, res) {
  await databaseConnection();
  const { method } = req;

  switch (method) {
    case "GET":
      try {

        const flashSaleProducts = await Product.find({ isFlashSale: true }).sort({ _id: -1 });
        console.log("Flash Sale Products:", flashSaleProducts);
        
        if (flashSaleProducts.length === 0) {
          console.log("No flash sale products found");
        }
        
        res.status(200).json(flashSaleProducts);
      } catch (error) {
        console.error("Error fetching flash sale products:", error);
        res.status(500).json({ message: "Server error", error: error.message });
      }
      break;

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
