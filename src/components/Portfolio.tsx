import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import styles from './Portfolio.module.css';

export const Portfolio = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('portfolio')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) {
      setItems(data || []);
    }
    setLoading(false);
  };

  if (loading) return null;
  if (items.length === 0) return null;

  return (
    <section id="portfolio" className="section-padding" style={{ backgroundColor: '#f0f0f0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-md)' }}>
          <h2 style={{ fontSize: '2.5rem' }}>Our Craftsmanship</h2>
          <p style={{ color: 'var(--color-text-light)' }}>A showcase of our custom projects and bespoke designs.</p>
        </div>
        
        <div className={styles.grid}>
          {items.map((item) => (
            <div key={item.id} className={styles.portfolioCard}>
              <div className={styles.imageWrapper}>
                <img src={item.image_url} alt={item.title} loading="lazy" />
                <div className={styles.overlay}>
                  <p className={styles.category}>{item.category}</p>
                </div>
              </div>
              <div className={styles.info}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
