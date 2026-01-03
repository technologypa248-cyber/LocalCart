import 'server-only';
import { Product, User, Category } from './definitions';
import {
  Smartphone,
  Headphones,
  Laptop,
  Watch,
  Camera,
  Gamepad2,
  Home,
  Bike,
  Speaker,
  BookOpen,
  Box,
  Rocket
} from 'lucide-react';

const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@localcart.com',
    passwordHash: 'adminpassword', // In a real app, this would be a proper hash
    role: 'admin',
    addresses: [
        { id: '1', street: '123 Admin Ave', city: 'Metropolis', state: 'NY', zip: '10001', country: 'USA' },
    ],
  },
  {
    id: '2',
    name: 'Regular User',
    email: 'user@localcart.com',
    passwordHash: 'userpassword',
    role: 'user',
    addresses: [
      { id: '2', street: '456 User St', city: 'Gotham', state: 'NJ', zip: '07001', country: 'USA' },
    ],
  },
];

const products: Product[] = [
  { id: '1', name: 'Quantum Smartphone', slug: 'quantum-smartphone', description: 'A smartphone from the future with holographic display.', price: 1299.99, discount: 10, stock: 50, category: 'Electronics', imageUrl: 'https://picsum.photos/seed/p1/600/600', imageHint: 'smartphone', isVisible: true },
  { id: '2', name: 'Echo Wireless Headphones', slug: 'echo-wireless-headphones', description: 'Noise-cancelling headphones with studio-quality sound.', price: 349.99, discount: 0, stock: 120, category: 'Electronics', imageUrl: 'https://picsum.photos/seed/p2/600/600', imageHint: 'headphones', isVisible: true },
  { id: '3', name: 'Orion Laptop Pro', slug: 'orion-laptop-pro', description: 'Sleek and powerful laptop for professionals.', price: 2499.99, discount: 5, stock: 30, category: 'Electronics', imageUrl: 'https://picsum.photos/seed/p3/600/600', imageHint: 'laptop', isVisible: true },
  { id: '4', name: 'Chrono Smartwatch', slug: 'chrono-smartwatch', description: 'A stylish smartwatch that tracks everything.', price: 499.99, discount: 15, stock: 200, category: 'Wearables', imageUrl: 'https://picsum.photos/seed/p4/600/600', imageHint: 'smartwatch', isVisible: true },
  { id: '5', name: 'Lumina Digital Camera', slug: 'lumina-digital-camera', description: 'Capture moments in stunning 4K quality.', price: 899.99, discount: 0, stock: 75, category: 'Electronics', imageUrl: 'https://picsum.photos/seed/p5/600/600', imageHint: 'camera', isVisible: true },
  { id: '6', name: 'Nebula Gaming Console', slug: 'nebula-gaming-console', description: 'Next-generation gaming with immersive graphics.', price: 599.99, discount: 0, stock: 0, category: 'Gaming', imageUrl: 'https://picsum.photos/seed/p6/600/600', imageHint: 'gaming console', isVisible: true },
  { id: '7', name: 'Aura VR Headset', slug: 'aura-vr-headset', description: 'Step into new worlds with this comfortable VR headset.', price: 450.00, discount: 20, stock: 40, category: 'Gaming', imageUrl: 'https://picsum.photos/seed/p7/600/600', imageHint: 'vr headset', isVisible: true },
  { id: '8', name: 'Sonic Bluetooth Speaker', slug: 'sonic-bluetooth-speaker', description: 'Portable speaker with deep bass and long battery life.', price: 129.99, discount: 0, stock: 300, category: 'Electronics', imageUrl: 'https://picsum.photos/seed/p8/600/600', imageHint: 'bluetooth speaker', isVisible: true },
  { id: '9', name: 'Scribe E-Reader', slug: 'scribe-e-reader', description: 'Read for weeks on a single charge with this e-ink tablet.', price: 179.99, discount: 10, stock: 150, category: 'Home', imageUrl: 'https://picsum.photos/seed/p9/600/600', imageHint: 'ereader tablet', isVisible: true },
  { id: '10', name: 'Apex Drone', slug: 'apex-drone', description: 'A high-performance drone with a 4K camera for breathtaking aerial shots.', price: 799.00, discount: 0, stock: 25, category: 'Gadgets', imageUrl: 'https://picsum.photos/seed/p10/600/600', imageHint: 'drone camera', isVisible: true },
  { id: '11', name: 'Connect Smart Home Hub', slug: 'connect-smart-home-hub', description: 'The central nervous system for your smart home.', price: 199.00, discount: 0, stock: 90, category: 'Home', imageUrl: 'https://picsum.photos/seed/p11/600/600', imageHint: 'smart home', isVisible: true },
  { id: '12', name: 'Volt Electric Scooter', slug: 'volt-electric-scooter', description: 'Zip through the city with this lightweight and fast electric scooter.', price: 650.00, discount: 5, stock: 60, category: 'Mobility', imageUrl: 'https://picsum.photos/seed/p12/600/600', imageHint: 'electric scooter', isVisible: true },
];

const categories: Category[] = [
    { name: 'Electronics', slug: 'electronics', icon: Smartphone },
    { name: 'Wearables', slug: 'wearables', icon: Watch },
    { name: 'Gaming', slug: 'gaming', icon: Gamepad2 },
    { name: 'Home', slug: 'home', icon: Home },
    { name: 'Gadgets', slug: 'gadgets', icon: Rocket },
    { name: 'Mobility', slug: 'mobility', icon: Bike },
]

// Simulate database latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getProducts({ query, category, sort, page = 1, limit = 9 }: { query?: string, category?: string, sort?: string, page?: number, limit?: number }) {
  await delay(500);

  let filteredProducts = products.filter(p => p.isVisible);

  if (query) {
    filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
  }

  if (category && category !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (sort === 'price-asc') {
    filteredProducts.sort((a, b) => (a.price * (1 - a.discount / 100)) - (b.price * (1 - b.discount / 100)));
  } else if (sort === 'price-desc') {
    filteredProducts.sort((a, b) => (b.price * (1 - b.discount / 100)) - (a.price * (1 - a.discount / 100)));
  } else { // newest by default
    filteredProducts.sort((a, b) => parseInt(b.id) - parseInt(a.id));
  }
  
  const totalPages = Math.ceil(filteredProducts.length / limit);
  const paginatedProducts = filteredProducts.slice((page - 1) * limit, page * limit);
  
  return { products: paginatedProducts, totalPages };
}

export async function getProductBySlug(slug: string) {
  await delay(300);
  return products.find(p => p.slug === slug && p.isVisible) || null;
}

export async function getCategories() {
    await delay(100);
    return categories;
}

export async function getUserByEmail(email: string) {
  await delay(200);
  return users.find(u => u.email === email) || null;
}

export async function getUserById(id: string) {
    await delay(100);
    return users.find(u => u.id === id) || null;
}
