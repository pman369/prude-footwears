export interface Product {
  id: string;
  created_at: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  description?: string;
  image_url: string;
  in_stock: boolean;
}

export interface User {
  id: string;
  email?: string;
}

export interface Session {
  access_token: string;
  user: User;
}
