import databaseConnection from "@/lib/mongodb";
import Product from "@/model/Products";

export default async function handler(req, res, next) {
    databaseConnection()
    const { method } = req;
    switch (method) {
        case "GET":
            try {
                const products = await Product.find({});
                res.status(200).json(products);
            } catch (error) {
                res.status(500).json({ message: "Server error", error: error.message });
            }
            break;
        case "POST":
            try {
                const {
                    productImage,
                    productDetails,
                    productPrice,
                    category,
                } = req.body;
                if (
                    !productImage ||
                    !productDetails ||
                    !productPrice ||
                    !category
                ) {
                    return res.status(400).json({ message: "Missing required fields" });
                }
                const product = new Product({
                    productImage,
                    productDetails,
                    productPrice,
                    category,
                });
                await product.save();
                const products = await Product.find({});
                res.status(201).json(products);
            } catch (error) {
                res.status(400).json({ message: "Bad Request", error: error.message });
            }
            break;
        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
