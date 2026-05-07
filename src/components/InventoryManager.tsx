import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import styles from './InventoryManager.module.css';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { Product } from '../types';

export const InventoryManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const PAGE_SIZE = 10;
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    price: '',
    category: 'Men',
    description: '',
    image_url: '',
    in_stock: true
  });

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const fetchProducts = async (currentPage = page) => {
    setLoading(true);
    const from = currentPage * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data, count, error } = await supabase
      .from('products')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to);
    
    if (!error) {
      setProducts(data || []);
      if (count !== null) setTotalCount(count);
    }
    setLoading(false);
  };

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        slug: product.slug,
        price: product.price.toString(),
        category: product.category,
        description: product.description || '',
        image_url: product.image_url || '',
        in_stock: product.in_stock
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        slug: '',
        price: '',
        category: 'Men',
        description: '',
        image_url: '',
        in_stock: true
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      price: parseFloat(formData.price)
    };

    if (editingProduct) {
      const { error } = await supabase
        .from('products')
        .update(payload)
        .eq('id', editingProduct.id);
      
      if (!error) fetchProducts();
    } else {
      const { error } = await supabase
        .from('products')
        .insert([payload]);
      
      if (!error) fetchProducts();
    }
    handleCloseModal();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      
      if (!error) fetchProducts();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          <Plus size={18} /> Add Product
        </button>
      </div>

      <div className={styles.grid}>
        {loading ? <p>Loading inventory...</p> : products.map(product => (
          <div key={product.id} className={styles.productCard}>
            <div className={styles.productImage}>
              <img src={product.image_url} alt={product.name} />
              {!product.in_stock && <div className={styles.outOfStockBadge}>Out of Stock</div>}
            </div>
            <div className={styles.productInfo}>
              <h3>{product.name}</h3>
              <p className={styles.category}>{product.category}</p>
              <p className={styles.price}>₦{product.price.toLocaleString()}</p>
              <div className={styles.actions}>
                <button onClick={() => handleOpenModal(product)} className={styles.editBtn}>
                  <Edit2 size={16} />
                </button>
                <button onClick={() => handleDelete(product.id)} className={styles.deleteBtn}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
        <button 
          onClick={() => setPage(p => Math.max(0, p - 1))} 
          disabled={page === 0 || loading}
          className="btn btn-outline"
        >
          Previous
        </button>
        <span style={{ display: 'flex', alignItems: 'center' }}>
          Page {page + 1} of {Math.max(1, Math.ceil(totalCount / PAGE_SIZE))}
        </span>
        <button 
          onClick={() => setPage(p => p + 1)} 
          disabled={(page + 1) * PAGE_SIZE >= totalCount || loading}
          className="btn btn-outline"
        >
          Next
        </button>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={handleCloseModal} className={styles.closeBtn}><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGrid}>
                <div className={styles.inputGroup}>
                  <label>Product Name</label>
                  <input 
                    type="text" 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    required 
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Slug (URL Identifier)</label>
                  <input 
                    type="text" 
                    value={formData.slug} 
                    onChange={e => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})}
                    placeholder="classic-brown-slide"
                    required 
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Price (₦)</label>
                  <input 
                    type="number" 
                    value={formData.price} 
                    onChange={e => setFormData({...formData, price: e.target.value})}
                    required 
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Category</label>
                  <select 
                    value={formData.category} 
                    onChange={e => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                  </select>
                </div>
                <div className={styles.inputGroup} style={{ gridColumn: 'span 2' }}>
                  <label>Image URL</label>
                  <input 
                    type="text" 
                    value={formData.image_url} 
                    onChange={e => setFormData({...formData, image_url: e.target.value})}
                    placeholder="/images/your-product.png"
                    required 
                  />
                </div>
                <div className={styles.inputGroup} style={{ gridColumn: 'span 2' }}>
                  <label>Description</label>
                  <textarea 
                    value={formData.description} 
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    rows={3}
                  />
                </div>
                <div className={styles.checkboxGroup}>
                  <label>
                    <input 
                      type="checkbox" 
                      checked={formData.in_stock} 
                      onChange={e => setFormData({...formData, in_stock: e.target.checked})}
                    /> In Stock
                  </label>
                </div>
              </div>
              <div className={styles.modalFooter}>
                <button type="button" onClick={handleCloseModal} className="btn btn-outline">Cancel</button>
                <button type="submit" className="btn btn-primary">
                  {editingProduct ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
