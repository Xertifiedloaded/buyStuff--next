export function ConfirmationTemplate({ name, email, phone, address, products }) {

    const productsHtml = products.map(product => `
      <tr>
        <td style="padding: 12px; border: 1px solid #ddd; text-align: left;">${product.productName}</td>
        <td style="padding: 12px; border: 1px solid #ddd; text-align: left;">$${product.productPrice.toFixed(2)}</td>
        <td style="padding: 12px; border: 1px solid #ddd; text-align: center;">${product.quantity}</td>
        <td style="padding: 12px; border: 1px solid #ddd; text-align: right;">$${(product.productPrice * product.quantity).toFixed(2)}</td>
      </tr>
    `).join('');

    const totalPrice = products.reduce((total, product) => total + (product.productPrice * product.quantity), 0).toFixed(2);
    return `
      <div style="font-family: Arial, sans-serif; max-width: 650px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #ffffff;">
        <h1 style="font-size: 26px; font-weight: bold; color: #333; text-align: center; margin-bottom: 20px;">New Customer Order</h1>
        
        <p style="font-size: 16px; color: #555; margin-bottom: 10px;"><strong>Customer Name:</strong> ${name}</p>
        <p style="font-size: 16px; color: #555; margin-bottom: 10px;"><strong>Email:</strong> ${email}</p>
        <p style="font-size: 16px; color: #555; margin-bottom: 10px;"><strong>Phone:</strong> ${phone}</p>
        <p style="font-size: 16px; color: #555; margin-bottom: 20px;"><strong>Shipping Address:</strong> ${address}</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background-color: #f4f4f4;">
              <th style="padding: 12px; border: 1px solid #ddd; text-align: left; color: #333;">Product Name</th>
              <th style="padding: 12px; border: 1px solid #ddd; text-align: left; color: #333;">Price</th>
              <th style="padding: 12px; border: 1px solid #ddd; text-align: center; color: #333;">Quantity</th>
              <th style="padding: 12px; border: 1px solid #ddd; text-align: right; color: #333;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${productsHtml}
          </tbody>
          <tfoot>
            <tr style="background-color: #f4f4f4;">
              <td colspan="3" style="padding: 12px; border: 1px solid #ddd; text-align: right; font-weight: bold; color: #333;">Order Total:</td>
              <td style="padding: 12px; border: 1px solid #ddd; text-align: right; font-weight: bold; color: #333;">$${totalPrice}</td>
            </tr>
          </tfoot>
        </table>

        <p style="font-size: 16px; color: #555; text-align: center; margin-top: 20px;">Please process this order accordingly. Thank you!</p>
      </div>
    `;
}