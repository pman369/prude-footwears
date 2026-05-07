import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { ProductCard } from './ProductCard';
import type { Product } from '../types';
import styles from './ProductGrid.module.css';

export const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<'All' | 'Men' | 'Women'>('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const PAGE_SIZE = 8;

  useEffect(() => {
    setPage(0);
    setHasMore(true);
    setProducts([]);
    fetchProducts(0, true);
  }, [filter]);

  const fetchProducts = async (currentPage = 0, reset = false) => {
    setLoading(true);
    let query = supabase.from('products').select('*', { count: 'exact' }).eq('in_stock', true);
    
    if (filter !== 'All') {
      query = query.eq('category', filter);
    }

    const from = currentPage * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data, count, error } = await query
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) {
      setError('Failed to load products.');
    } else {
      if (reset) {
        setProducts(data || []);
      } else {
        setProducts(prev => [...prev, ...(data || [])]);
      }
      if (count !== null && from + (data?.length || 0) >= count) {
        setHasMore(false);
      } else if ((data?.length || 0) < PAGE_SIZE) {
        setHasMore(false);
      }
    }
    setLoading(false);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProducts(nextPage);
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
          <>
            <div className={styles.grid}>
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {hasMore && (
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <button 
                  onClick={handleLoadMore} 
                  className="btn btn-outline"
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};
