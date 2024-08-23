
import { ConfirmationTemplate } from "@/lib/ConfirmationTemplate";
import { CustomerThankYouTemplate } from "@/lib/CustomerThankYouTemolate";
import transporter from "@/lib/nodemailer";
import Orders from "@/model/OrderConfirmation";
export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const orders = await Orders.find().sort({ createdAt: -1 });
        res.status(200).json(orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Failed to fetch orders" });
      }
      break;

    case "POST":
      const { name, email, phone, address, cartItems } = req.body;
      if (!Array.isArray(cartItems) || cartItems.length === 0) {
        return res.status(400).json({ message: "No items in the cart" });
      }

      try {
        const newOrder = new Orders({ name, email, phone, address, cartItems });
        await newOrder.save();

        const productsDetails = cartItems.map((item) => ({
          productName: item.productName,
          productPrice: item.productPrice,
          quantity: item.quantity,
        }));

        const adminMailOptions = {
          from: email,
          to: 'horllypizzy@gmail.com',
          subject: "New Order Received",
          html: ConfirmationTemplate({
            name,
            email,
            phone,
            address,
            products: productsDetails,
          }),
        };

        const customerMailOptions = {
          from: 'horllypizzy@gmail.com',
          to: email,
          subject: "Thank You for Your Order",
          html: CustomerThankYouTemplate({
            name,
            products: productsDetails,
            address,
          }),
        };

        await transporter.sendMail(adminMailOptions);
        await transporter.sendMail(customerMailOptions);

        res.status(200).json({ message: "Order created and emails sent successfully" });
      } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Failed to create order" });
      }
      break;

    default:
      res.status(405).json({ message: "Method Not Allowed" });
      break;
  }
}