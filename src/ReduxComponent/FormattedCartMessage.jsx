import Cart from "./Cart";

const formatCartMessage = () => {
    let message = "Order Details:\n";
    Cart.forEach(item => {
      message += `${item.name}: $${item.price.toFixed(2)} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}\n`;
    });
    message += `\nTotal: $${total}`;
    return message;
  };


  export const sendToWhatsAppAPI = async () => {
    const message = formatCartMessage();

    try {
      await fetch('http://your-server-url/send-whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      alert('Message sent via WhatsApp!');
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
    }
  };