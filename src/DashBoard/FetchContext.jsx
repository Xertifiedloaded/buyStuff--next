'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
const Context = createContext({});
export const ApiProvider = ({ children }) => {
    const [product, setProducts] = useState([])
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products/product');
                console.log(response);
                setProducts(response.data);
            } catch (error) {
                console.error('Failed to fetch products', error);
            }
        };
        fetchProducts();
    }, []);

  return (
    <Context.Provider
      value={{
        product
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useApiContext = () => useContext(Context);