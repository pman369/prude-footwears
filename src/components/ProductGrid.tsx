import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { ProductCard } from './ProductCard';
import styles from './ProductGrid.module.css';

export const ProductGrid = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState<'All' | 'Men' | 'Women'>('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [filter]);

  const fetchProducts = async () => {
    setLoading(true);
    let query = supabase.from('products').select('*').eq('in_stock', true);
    
    if (filter !== 'All') {
      query = query.eq('category', filter);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      setError('Failed to load products.');
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  return (
    <section id="shop" className="section-padding">
      <div className="container">
        <div className={styles.header}>
          <div className={styles.title}>
            <h2>Our Collection</h2>
            <p className={styles.subtitle}>Handmade excellence in every step.</p>
          </div>
          <div className={styles.filters}>
            {['All', 'Men', 'Women'].map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat as any)}
                className={`btn ${filter === cat ? 'btn-primary' : 'btn-outline'} ${styles.filterBtn}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p>Loading collection...</p>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'red' }}>
            <p>{error}</p>
          </div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p>No products found in this category.</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
