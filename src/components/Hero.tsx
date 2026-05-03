import { HERO_IMAGE } from '../data/products';
import { openWhatsAppHub } from '../utils/order';
import styles from './Hero.module.css';

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <div className={styles.content}>
          <h1>Handcrafted Footwear, Made in Nigeria</h1>
          <p>Premium handmade sandals designed for comfort, durability, and everyday elegance.</p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="#shop" className="btn btn-primary">Shop Collection</a>
            <button className="btn btn-outline" onClick={openWhatsAppHub}>Custom Order</button>
          </div>
        </div>
      </div>
      <div className={styles.image} style={{ backgroundImage: `url(${HERO_IMAGE})` }}></div>
    </section>
  );
};
