import databaseConnection from "@/lib/mongodb"
import Product from "@/model/Products"

export default async function handler(req, res) {
  await databaseConnection()
  const { method } = req

  switch (method) {
    case "GET":
      try {
        const products = await Product.find({}).sort({ _id: -1 })
        console.log(products);
        
        res.status(200).json(products)
      } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
      }
      break

    case "POST":
      try {
        const {
          productName,
          productImage,
          productDetails,
          productPrice,
          category,
          isFlashSale = false,
          isNewArrival = false,
        } = req.body

        if (
          !productName ||
          !productImage ||
          !productDetails ||
          !productPrice ||
          !category
        ) {
          return res.status(400).json({ message: "Missing required fields" })
        }

        const product = new Product({
          productName,
          productImage,
          productDetails,
          productPrice,
          category,
          isFlashSale,
          isNewArrival,
        })
        console.log(product)

        await product.save()

        const products = await Product.find({})
        res.status(201).json(products)
      } catch (error) {
        res.status(400).json({ message: "Bad Request", error: error.message })
      }
      break

    default:
      res.setHeader("Allow", ["GET", "POST"])
      res.setHeader('Cache-Control', 'no-store');
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
