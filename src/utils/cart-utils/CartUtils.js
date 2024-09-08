
export async function addToCart(productId, quantity = 1) {
  try {
    const response = await fetch('/api/cart/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity }),
    });
    const data = await response.json();
    if (response.ok) {
      console.log('Product added to cart:', data);
    } else {
      console.error('Failed to add product to cart:', data.message);
    }
  } catch (error) {
    console.error('Error adding product to cart:', error);
  }
}

export async function updateCartQuantity(productId, quantity) {
  try {
    const response = await fetch('/api/cart/cart', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity }),
    });
    const data = await response.json();
    if (response.ok) {
      console.log('Cart updated:', data);
    } else {
      console.error('Failed to update cart:', data.message);
    }
  } catch (error) {
    console.error('Error updating cart:', error);
  }
}

export async function deleteFromCart(productId) {
  try {
    const response = await fetch('/api/cart/cart', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId }),
    });
    const data = await response.json();
    if (response.ok) {
      console.log('Product removed from cart:', data);
    } else {
      console.error('Failed to remove product from cart:', data.message);
    }
  } catch (error) {
    console.error('Error removing product from cart:', error);
  }
}

export async function getCart() {
  try {
    const response = await fetch('/api/cart/cart', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch cart');
    }

    const data = await response.json();
  

    if (!data || totalPrice === undefined) {
      throw new Error('Unexpected response format');
    }

    return { data, totalPrice };
  } catch (error) {
    console.error('Error getting cart:', error);
    return { data: [], totalPrice: 0 };
  }
}
