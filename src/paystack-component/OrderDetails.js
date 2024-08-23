export const sendOrderDetails = async (cart, payload) => {
  try {
    const response = await fetch("/api/auth/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        address: payload.address,
        cartItems: cart.map((item) => ({
          productName: item.productName,
          productPrice: item.productPrice,
          quantity: item.quantity,
        })),
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error("Error sending order details:", error);
  }
};
