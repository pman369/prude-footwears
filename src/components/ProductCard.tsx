import { type Product } from '../data/products';
import { handleWhatsAppOrder } from '../utils/order';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={product.image_url} alt={product.name} loading="lazy" />
      </div>
      <div className={styles.info}>
        <h3>{product.name}</h3>
        <p className={styles.price}>₦{product.price.toLocaleString()}</p>
        <button
          className="btn btn-primary"
          style={{ width: '100%', marginTop: '1rem' }}
          onClick={() => handleWhatsAppOrder(product)}
        >
          Order via WhatsApp
        </button>
      </div>
    </div>
  );
};
