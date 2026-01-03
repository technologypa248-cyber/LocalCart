import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, CheckCircle, XCircle } from "lucide-react";
import { AddToCartForm } from "./_components/add-to-cart-form";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    return { title: "Product not found" };
  }
  return {
    title: product.name,
    description: product.description,
  };
}

function formatPrice(price: number) {
    const formatted = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);
    return formatted.replace("₹", "₨ ");
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const discountedPrice = product.price * (1 - product.discount / 100);

  return (
    <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="overflow-hidden rounded-lg">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={800}
            height={800}
            className="h-full w-full object-cover aspect-square"
            data-ai-hint={product.imageHint}
          />
        </div>
        <div className="flex flex-col">
          {product.discount > 0 && (
            <Badge variant="destructive" className="w-fit">
              {product.discount}% OFF
            </Badge>
          )}
          <h1 className="mt-2 font-headline text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            {product.name}
          </h1>
          <div className="mt-4">
            {product.discount > 0 ? (
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-bold text-primary">
                  {formatPrice(discountedPrice)}
                </span>
                <span className="text-lg sm:text-xl text-muted-foreground line-through">
                  {formatPrice(product.price)}
                </span>
              </div>
            ) : (
              <span className="text-2xl sm:text-3xl font-bold">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          
          <div className="mt-4 flex items-center gap-2">
            {product.stock > 0 ? (
                <>
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-muted-foreground">{product.stock} in stock</span>
                </>
            ) : (
                <>
                <XCircle className="h-5 w-5 text-red-500" />
                <span className="text-sm text-red-500">Out of stock</span>
                </>
            )}
          </div>

          <p className="mt-6 text-base text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-8">
            <AddToCartForm productId={product.id} stock={product.stock} />
          </div>

          <div className="mt-6 text-sm text-muted-foreground">
            Category: <span className="font-medium text-foreground">{product.category}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
