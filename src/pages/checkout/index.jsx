import { useState, useEffect } from 'react';
import { PaystackButton } from 'react-paystack';

const CheckoutPage = () => {
  const [cart, setCart] = useState({ items: [], totalPrice: 0 });
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const publicKey = "pk_test_8b18eabe74aaa47775d4f5bff93133d7d2fb078f";

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch('/api/cart/cart');
        if (!response.ok) {
          throw new Error('Failed to fetch cart');
        }
        const data = await response.json();
        setCart(data);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchLocations = async () => {
      try {
        const response = await fetch('/api/location/location');
        if (!response.ok) {
          throw new Error('Failed to fetch locations');
        }
        const data = await response.json();
        setLocations(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCart();
    fetchLocations();
  }, []);

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPayload((prev) => ({ ...prev, [name]: value }));
  };

  const calculateTotalWithLocation = () => {
    const locationPrice = locations.find(loc => loc.locationId === selectedLocation)?.price || 0;
    return cart.totalPrice + locationPrice;
  };

  const handleSuccess = async (response) => {
    try {
      const response = await fetch('/api/cart/sendorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          address: payload.address,
          cartItems: cart.items.map(item => ({
            productName: item.productId.productName,
            productPrice: item.productId.productPrice,
            quantity: item.quantity,
          })),
          totalPrice: calculateTotalWithLocation(),
        }),
      });
      console.log(response);
      
      if (!response.ok) {
        throw new Error('Failed to send order details');
      }
      alert('Thanks for doing business with us! Come back soon!!');
    } catch (error) {
      alert('Failed to send order details. Please try again.');
    }
  };

  const componentProps = {
    email: payload.email,
    amount: calculateTotalWithLocation() * 100,
    metadata: {
      cartItems: cart.items.map(item => ({
        productName: item.productId.productName,
        productPrice: item.productId.productPrice,
        quantity: item.quantity,
      })),
      name: payload.name,
      phone: payload.phone,
      address: payload.address,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: handleSuccess,
    onClose: () => alert("Wait! Don't leave "),
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="wrapper mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="bg-black text-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Your Cart</h2>
        {cart.items.length > 0 ? (
          cart.items.map((item) => (
            <div key={item.productId._id} className="border-b py-2">
              <h3 className="text-lg font-semibold">{item.productId.productName}</h3>
              <p>Price: ${item.productId.productPrice.toFixed(2)}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
        <div className="mt-4">
          <label htmlFor="location" className="block text-lg font-medium mb-2">
            Select Location
          </label>
          <select
            id="location"
            value={selectedLocation}
            onChange={handleLocationChange}
            className="block w-full p-2 border bg-transparent border-gray-300 rounded-lg"
          >
            <option value="">Select a location</option>
            {locations.map((loc) => (
              <option key={loc.locationId} value={loc.locationId}>
                {loc.exactLocation} - ${loc.price.toFixed(2)}
              </option>
            ))}
          </select>
        </div>
        <h3 className="text-xl font-semibold mt-4">
          Total Price: ${calculateTotalWithLocation().toFixed(2)}
        </h3>
        <div className="mt-4">
          <label htmlFor="name" className="block text-lg font-medium mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={payload.name}
            onChange={handleInputChange}
            className="block w-full p-2 border bg-transparent border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mt-4">
          <label htmlFor="email" className="block text-lg font-medium mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={payload.email}
            onChange={handleInputChange}
            className="block w-full p-2 border bg-transparent border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mt-4">
          <label htmlFor="phone" className="block text-lg font-medium mb-2">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={payload.phone}
            onChange={handleInputChange}
            className="block w-full p-2 border bg-transparent border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mt-4">
          <label htmlFor="address" className="block text-lg font-medium mb-2">Address</label>
          <textarea
            id="address"
            name="address"
            value={payload.address}
            onChange={handleInputChange}
            className="block w-full p-2 border bg-transparent border-gray-300 rounded-lg"
            rows="3"
            required
          />
        </div>
        <PaystackButton
          className="cart__order-button block transition-bg-color duration-300 ease hover:bg-blue-500 w-full p-2 mt-4 border-0 rounded-lg bg-[#28a745] text-white"
          {...componentProps}
        />
      </div>
    </div>
  );
};

export default CheckoutPage;
