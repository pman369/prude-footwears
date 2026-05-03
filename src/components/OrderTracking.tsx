import { useState } from 'react';
import { supabase } from '../utils/supabase';
import styles from './OrderTracking.module.css';

export const OrderTracking = () => {
  const [orderCode, setOrderCode] = useState('');
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderCode.trim()) return;

    setLoading(true);
    setError('');
    setOrder(null);

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('order_code', orderCode.trim())
      .single();

    if (error) {
      setError('Order not found. Please check your code and try again.');
    } else {
      setOrder(data);
    }
    setLoading(false);
  };

  const getStatusIndex = (status: string) => {
    const statuses = ['pending', 'paid', 'processing', 'shipped', 'delivered'];
    return statuses.indexOf(status);
  };

  const statusList = [
    { label: 'Order Placed', status: 'pending' },
    { label: 'Payment Confirmed', status: 'paid' },
    { label: 'Processing', status: 'processing' },
    { label: 'Shipped', status: 'shipped' },
    { label: 'Delivered', status: 'delivered' },
  ];

  return (
    <section id="track" className="section-padding" style={{ backgroundColor: '#fff' }}>
      <div className="container">
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: 'var(--spacing-md)' }}>Track Your Order</h2>
          <form onSubmit={handleTrack} className={styles.form}>
            <input
              type="text"
              placeholder="Enter Order Code (e.g., PRUDE-2026-XXXX)"
              value={orderCode}
              onChange={(e) => setOrderCode(e.target.value)}
              className={styles.input}
            />
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Tracking...' : 'Track Order'}
            </button>
          </form>

          {error && <p className={styles.error}>{error}</p>}

          {order && (
            <div className={styles.result}>
              <div className={styles.orderSummary}>
                <p><strong>Order Code:</strong> {order.order_code}</p>
                <p><strong>Status:</strong> <span className={styles.statusBadge}>{order.status.toUpperCase()}</span></p>
              </div>

              <div className={styles.timeline}>
                {statusList.map((item, index) => (
                  <div 
                    key={item.status} 
                    className={`${styles.timelineItem} ${index <= getStatusIndex(order.status) ? styles.active : ''}`}
                  >
                    <div className={styles.dot}></div>
                    <div className={styles.label}>{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
