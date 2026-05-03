export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image_url: string;
  category: 'Men' | 'Women';
}

export const PRODUCTS = [
  {
    id: '1',
    name: 'Classic Leather Slide – Brown',
    price: 15000,
    description: 'Handcrafted with premium leather for everyday comfort.',
    image_url: '/images/photo_1_2026-03-02_19-41-46.jpg',
    category: 'Men'
  },
  {
    id: '2',
    name: 'Premium Buckle Slide – Red',
    price: 18000,
    description: 'Statement footwear blending modern style with tradition.',
    image_url: '/images/photo_2_2026-03-02_19-41-46.jpg',
    category: 'Women'
  },
  {
    id: '3',
    name: 'Minimal Strap Sandal – Black',
    price: 12000,
    description: 'Clean, simple, and versatile for any occasion.',
    image_url: '/images/photo_3_2026-03-02_19-41-46.jpg',
    category: 'Men'
  }
];

export const HERO_IMAGE = '/images/photo_2026-05-03_01-46-08.jpg';
