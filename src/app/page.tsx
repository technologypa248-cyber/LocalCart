import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductGrid } from '@/components/products/product-grid';
import { getProducts } from '@/lib/api/products';
import Image from 'next/image';

export default async function Home() {
  const { products } = await getProducts({ limit: 4, sort: 'newest' });

  return (
    <div>
      <section className="relative h-[60vh] w-full bg-gradient-to-r from-indigo-100 to-violet-100 flex items-center justify-center">
        <div className="text-center z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-headline tracking-tight text-gray-900">
            Welcome to <span className="text-primary">LocalCart</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600">
            Your one-stop shop for everything local and self-hosted.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
        <Image
            src="https://picsum.photos/seed/hero/1800/800"
            alt="Hero image"
            fill
            className="object-cover"
            priority
          />
        <div className="absolute inset-0 bg-white/30"></div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-headline text-center mb-12">
            New Arrivals
          </h2>
          <ProductGrid products={products} />
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
