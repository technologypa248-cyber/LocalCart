export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discount: number; // Percentage
  stock: number;
  category: string;
  imageUrl: string;
  imageHint: string;
  isVisible: boolean;
};

export type Category = {
  name: string;
  slug: string;
  icon: React.ComponentType<{ className?: string }>;
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type Cart = {
  userId: string;
  items: CartItem[];
};

export type Address = {
  id: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: 'user' | 'admin';
  addresses: Address[];
};

export type Order = {
  id: string;
  userId: string;
  items: (CartItem & { unitPrice: number })[];
  total: number;
  shippingAddress: Address;
  status: 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered';
  createdAt: string;
};
