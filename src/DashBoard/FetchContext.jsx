'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
export const Context = createContext({});
export const ApiProvider = ({ children }) => {
  const [product, setProducts] = useState([]);
  const [locationData, setLocation] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const [productsResponse, locationResponse] = await Promise.all([
                  axios.get('/api/products/product'),
                  axios.get('/api/location/location')
              ]);
              console.log('Products:', productsResponse);
              console.log('Location:', locationResponse);
              setProducts(productsResponse.data);
              setLocation(locationResponse.data);
          } catch (error) {
              console.error('Failed to fetch data', error);
          }
      };

      fetchData();
  }, []);
  return (
    <Context.Provider
      value={{
        product,
        locationData
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useApiContext = () => useContext(Context);