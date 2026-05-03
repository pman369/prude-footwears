export const About = () => {
  return (
    <section id="about" className="section-padding" style={{ backgroundColor: '#f9f9f9' }}>
      <div className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-sm)' }}>The Prude Story</h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--color-text-light)', marginBottom: 'var(--spacing-md)' }}>
            PRUDE Footwears is a Nigerian footwear brand dedicated to creating premium handmade sandals
            and slides that combine comfort, durability, and timeless design.
          </p>
          <p>
            Every pair is carefully handcrafted using quality materials and refined finishing.
            Our process prioritizes comfort, strength, and a clean aesthetic suitable for
            everyday wear and special occasions alike.
          </p>
        </div>
      </div>
    </section>
  );
};
