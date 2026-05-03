import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer id="contact" className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div>
            <div className={styles.logo}>PRUDE</div>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
              Handmade premium footwear, crafted in Nigeria with love and precision.
            </p>
          </div>
          <div className={styles.section}>
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#shop">Shop</a></li>
              <li><a href="#about">About</a></li>
            </ul>
          </div>
          <div className={styles.section}>
            <div>
              <h4>Contact Us</h4>
              <ul>
                <li>hello@prudefootwears.shop</li>
                <li>+234 806 371 9333</li>
                <li>Nigeria</li>
                <li style={{ marginTop: '1rem' }}>
                  <a href="/admin" style={{ opacity: 0.5, fontSize: '0.7rem' }}>Admin Login</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} PRUDE Footwears. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
