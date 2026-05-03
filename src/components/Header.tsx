import { openWhatsAppHub } from '../utils/order';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <div className={styles.logo}>PRUDE</div>
        <nav className={styles.navLinks}>
          <a href="#">Home</a>
          <a href="#shop">Shop</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#track">Track</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="nav-utility">
          <button className="btn btn-outline" style={{ padding: '0.5rem 1rem' }} onClick={openWhatsAppHub}>
            WhatsApp Hub
          </button>
        </div>
      </div>
    </header>
  );
};
