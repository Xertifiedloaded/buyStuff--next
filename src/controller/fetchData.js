const developmentUrl = 'https://buy-stuff-six.vercel.app';
const localUrl = 'http://localhost:3000';

export const fetchData = async () => {
  try {
    const response = await fetch(`${localUrl}/api/products/product`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
};