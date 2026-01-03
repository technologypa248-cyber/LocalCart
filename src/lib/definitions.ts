import type { Types } from 'mongoose';

export type Category = {
  _id: string;
  name: string;
  slug: string;
  iconName: string;
};

export type Product = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  category: Category;
  imageUrl: string;
  imageHint: string;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Cart = {
  _id: string;
  userId: string;
  items: {
    productId: Types.ObjectId;
    quantity: number;
  }[];
  createdAt: string;
  updatedAt: string;
};

export type Address = {
  _id?: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: 'user' | 'admin';
  addresses: Address[];
  createdAt: string;
  updatedAt: string;
};

export type Order = {
  _id: string;
  userId: Types.ObjectId;
  items: {
    productId: Types.ObjectId;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
  }[];
  total: number;
  shippingAddress: Address;
  status: 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered';
  createdAt: string;
  updatedAt: string;
};
