import { type Product } from '../types';
import { supabase } from './supabase';

const generateOrderCode = () => {
  const year = new Date().getFullYear();
  const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `PRUDE-${year}-${randomStr}`;
};

export const handleWhatsAppOrder = async (product: Product) => {
  const orderCode = generateOrderCode();
  
  // Create order record in Supabase
  const { error: orderError } = await supabase
    .from('orders')
    .insert([
      {
        order_code: orderCode,
        customer_name: 'Customer', // Placeholder, could be collected via form later
        phone: 'Pending',
        total_amount: product.price,
        status: 'pending'
      }
    ]);

  if (orderError) {
    console.error('Error creating order:', orderError);
    // Proceed anyway to not block the user, but log the error
  }

  const phoneNumber = '2348063719333';
  const message = `Hello PRUDE Footwears, I would like to order the ${product.name}.\nOrder Code: ${orderCode}`;
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
};

export const openWhatsAppHub = () => {
  window.open('https://wa.me/2348063719333', '_blank');
};
