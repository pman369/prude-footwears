import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import styles from './AdminDashboard.module.css';
import { Package, ShoppingBag, LogOut } from 'lucide-react';
import { InventoryManager } from './InventoryManager';

export const AdminDashboard = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'orders' | 'inventory'>('orders');

  useEffect(() => {
    if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error) setOrders(data || []);
    setLoading(false);
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (!error) {
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <div className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Admin</h2>
        </div>
        <nav className={styles.nav}>
          <button 
            className={`${styles.navItem} ${activeTab === 'orders' ? styles.active : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <ShoppingBag size={20} /> Orders
          </button>
          <button 
            className={`${styles.navItem} ${activeTab === 'inventory' ? styles.active : ''}`}
            onClick={() => setActiveTab('inventory')}
          >
            <Package size={20} /> Inventory
          </button>
        </nav>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          <LogOut size={20} /> Logout
        </button>
      </aside>

      <main className={styles.content}>
        <header className={styles.contentHeader}>
          <h1>{activeTab === 'orders' ? 'Manage Orders' : 'Inventory Management'}</h1>
        </header>

        {activeTab === 'orders' && (
          <div className={styles.tableWrapper}>
            {loading ? <p>Loading orders...</p> : (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td><code>{order.order_code}</code></td>
                      <td>{order.customer_name}</td>
                      <td>₦{order.total_amount.toLocaleString()}</td>
                      <td>
                        <span className={`${styles.statusBadge} ${styles[order.status]}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>{new Date(order.created_at).toLocaleDateString()}</td>
                      <td>
                        <select 
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className={styles.select}
                        >
                          <option value="pending">Pending</option>
                          <option value="paid">Paid</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === 'inventory' && (
          <InventoryManager />
        )}
      </main>
    </div>
  );
};
