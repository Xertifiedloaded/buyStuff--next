'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

export const Context = createContext({});
export const ApiProvider = ({ children }) => {
  const [product, setProducts] = useState([]);
  const [locationData, setLocation] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContentType, setModalContentType] = useState(null);


  const openModal = (type) => {
    setModalContentType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContentType(null);
  };


  const fetchData = async () => {
    try {
      const [productsResponse, locationResponse, ordersResponse] = await Promise.all([
        axios.get('/api/products/product'),
        axios.get('/api/location/location'),
        axios.get('/api/auth/checkout')
      ]);
      setProducts(productsResponse.data);
      setLocation(locationResponse.data);
      setOrders(ordersResponse.data);
    } catch (error) {
      console.error('Failed to fetch data', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);



  const handleAddProduct = async (productData) => {
    try {
      await axios.post('/api/products/product', productData);
      alert('Product uploaded successfully!');
      closeModal()
    } catch (error) {
      console.error('Product upload failed:', error);
    }
  };
  const handleAddLocation = async (productData) => {
    try {
      await axios.post('/api/location/location', productData);
      alert('Location Added successfully!');
      fetchData();
      closeModal()
    } catch (error) {
      console.error('Product upload failed:', error);
    }
  };


  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `/api/location/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      setLocation(locationData.filter(loc => loc._id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };
  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(
        `/api/products/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      setProducts(product.filter(product => product._id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };


  return (
    <Context.Provider
      value={{
        product,
        locationData,
        orders,
        isModalOpen,
        modalContentType,
        openModal,
        closeModal,
        handleAddProduct,
        handleAddLocation,
        handleDelete,
        handleDeleteProduct
      }}
    >
      {children}
    </Context.Provider>
  );
};


export const useApiContext = () => useContext(Context);