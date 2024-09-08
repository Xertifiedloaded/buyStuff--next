import databaseConnection from "@/lib/mongodb";
import Product from "@/model/Products";


export default async function handler(req, res) {
  await databaseConnection();
  const { method } = req;

  switch (method) {
    case "GET":
      try {

        const newArrival = await Product.find({ isNewArrival: true }).sort({ _id: -1 });
        
        if (newArrival.length === 0) {
          console.log("No Arrival products found");
        }
        
        res.status(200).json(newArrival);
      } catch (error) {
        console.error("Error fetching newArrival products:", error);
        res.status(500).json({ message: "Server error", error: error.message });
      }
      break;

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
