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
      fetchData(); 
    } catch (error) {
      console.error('Product upload failed:', error);
    }
  };

  const handleAddLocation = async (productData) => {
    try {
      await axios.post('/api/location/location', productData);
      alert('Product uploaded successfully!');
      fetchData(); 
    } catch (error) {
      console.error('Product upload failed:', error);
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
        handleAddLocation
      }}
    >
      {children}
    </Context.Provider>
  );
};


export const useApiContext = () => useContext(Context);