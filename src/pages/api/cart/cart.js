import databaseConnection from "@/lib/mongodb";
import Cart from "@/model/Cart";
import Product from "@/model/Products";


export default async function handler(req, res) {
  await databaseConnection();

  switch (req.method) {
    case "POST":
      return addProduct(req, res);
    case "GET":
      return getCart(req, res);
    case "DELETE":
      return removeProduct(req, res);
    case "PATCH":
      return updateProductQuantity(req, res);
    default:
      res.status(405).json({ message: "Method not allowed" });
  }
}

async function addProduct(req, res) {
  const { productId, quantity = 1 } = req.body;

  try {
    const product = await Product.findOne({ productId });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne();

    if (!cart) {
      cart = new Cart();
    }

    const itemIndex = cart.items.findIndex(item => item.productId === productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    cart.totalPrice = await calculateTotalPrice(cart.items);
    await cart.save();

    res.status(200).json({ items: cart.items, totalPrice: cart.totalPrice });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
}

async function getCart(req, res) {
  try {
    const cart = await Cart.findOne();

    if (!cart) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    res.status(200).json({ items: cart.items, totalPrice: cart.totalPrice });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
}

async function removeProduct(req, res) {
  const { productId } = req.body;

  try {
    let cart = await Cart.findOne();

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(item => item.productId === productId);

    if (itemIndex > -1) {
      cart.items.splice(itemIndex, 1);
      cart.totalPrice = await calculateTotalPrice(cart.items);
      await cart.save();

      res.status(200).json({ items: cart.items, totalPrice: cart.totalPrice });
    } else {
      res.status(404).json({ message: "Product not in cart" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
}

async function updateProductQuantity(req, res) {
  const { productId, quantity } = req.body;

  if (quantity < 1) {
    return res.status(400).json({ message: "Quantity must be at least 1" });
  }

  try {
    let cart = await Cart.findOne();

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(item => item.productId === productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
      cart.totalPrice = await calculateTotalPrice(cart.items);
      await cart.save();

      res.status(200).json({ items: cart.items, totalPrice: cart.totalPrice });
    } else {
      res.status(404).json({ message: "Product not in cart" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
}

async function calculateTotalPrice(items) {
  let totalPrice = 0;
  for (const item of items) {
    const product = await Product.findOne({ productId: item.productId });
    if (product) {
      totalPrice += item.quantity * product.productPrice;
    }
  }
  return totalPrice;
}
