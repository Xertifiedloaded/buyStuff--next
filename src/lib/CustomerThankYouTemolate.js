export function CustomerThankYouTemplate({ name, products, address }) {
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
        <h1 style="font-size: 26px; font-weight: bold; color: #333; text-align: center; margin-bottom: 20px;">Thank You for Your Order!</h1>
        
        <p style="font-size: 16px; color: #555; margin-bottom: 10px;">Dear ${name},</p>
        <p style="font-size: 16px; color: #555; margin-bottom: 20px;">Thank you for shopping with us. We have received your order and are preparing it for shipment. Here are the details:</p>
        
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
        
        <p style="font-size: 16px; color: #555; margin-bottom: 20px;"><strong>Shipping Address:</strong> ${address}</p>
        
        <p style="font-size: 16px; color: #555;">We will notify you once your order is shipped. Thank you for your patience and for choosing us!</p>
        
        <div style="text-align: center; margin-top: 30px;">
          <p style="font-size: 16px; color: #555;">If you have any questions or need assistance, feel free to contact us.</p>
        </div>
      </div>
    `;
}