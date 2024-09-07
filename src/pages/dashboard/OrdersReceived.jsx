import React, { useState, useEffect } from 'react';
import { useApiContext } from '@/DashBoard/FetchContext';


const OrdersReceived = () => {
  const { orders } = useApiContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orders.length) {
      setLoading(false);
    }
  }, [orders]);

  return (
    <div className="text-black">
      {loading ? (
        <div className="flex justify-center items-center py-20">
          loading
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg text-gray-600">No orders found.</p>
        </div>
      ) : (
        <div className="  overflow-hidden">
          {orders.map((order) => (
            <div key={order._id} className="bg-white capitalize shadow-lg rounded-lg mb-2  border-gray-200 p-6 hover:bg-gray-50 transition duration-300 ease-in-out">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-lg text-gray-700">Order Date: {new Date(order.createdAt).toLocaleDateString()}</h3>
                  <p className="text-sm text-gray-500">Order ID: {order._id}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-xl text-blue-600">
                    Total: $
                    {order.cartItems
                      .reduce((total, item) => total + item.productPrice * item.quantity, 0)
                      .toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                {order.cartItems.map((item) => (
                  <div key={item.productName} className="flex justify-between py-2 text-gray-600">
                    <span>{item.productName}</span>
                    <span>Qty: {item.quantity}</span>
                    <span>${(item.productPrice * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersReceived;