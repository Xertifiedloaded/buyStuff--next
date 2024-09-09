
import { ConfirmationTemplate } from '@/lib/ConfirmationTemplate';
import { CustomerThankYouTemplate } from '@/lib/CustomerThankYouTemolate';
import transporter from '@/lib/nodemailer';
import Cart from '@/model/Cart';
import Order from '@/model/OrderConfirmation';

export const createOrder = async (req, res) => {
  const { name, email, phone, address, cartItems, totalPrice } = req.body;

  if (!name || !email || !phone || !address || !cartItems || !totalPrice) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart items are required' });
    }

    // Create a new order
    const newOrder = new Order({
      name,
      email,
      phone,
      address,
      cartItems,
      totalPrice,
    });
    console.log('Order details for admin:', {
      name,
      email,
      phone,
      address,
      products: cartItems,
      totalPrice,
    });

    await newOrder.save();
    await Cart.findOneAndUpdate({}, { $set: { items: [], totalPrice: 0 } });


    const adminMailOptions = {
      from: email,
      to: 'horllypizzy@gmail.com',
      subject: "New Order Received",
      html: ConfirmationTemplate({
        name,
        email,
        phone,
        address,
        products: cartItems,
        totalPrice,
      }),
    };


    const customerMailOptions = {
      to: email,
      subject: "Thank You for Your Order",
      html: CustomerThankYouTemplate({
        name,
        products: cartItems,
        address,
      }),
    };

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(customerMailOptions);

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
};
