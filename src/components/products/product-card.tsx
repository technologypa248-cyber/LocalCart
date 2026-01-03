import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/definitions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";

type ProductCardProps = {
  product: Product;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(price);
}

export function ProductCard({ product }: ProductCardProps) {
  const discountedPrice = product.price * (1 - product.discount / 100);

  return (
    <Card className="flex h-full flex-col overflow-hidden rounded-lg shadow-sm transition-shadow hover:shadow-lg">
      <CardHeader className="p-0">
        <Link href={`/product/${product.slug}`} className="block overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={600}
            height={600}
            className="aspect-square w-full object-cover transition-transform duration-300 hover:scale-105"
            data-ai-hint={product.imageHint}
          />
        </Link>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <div className="mb-2 flex items-start justify-between">
          <CardTitle className="text-lg font-headline leading-tight">
            <Link href={`/product/${product.slug}`} className="hover:text-primary">
              {product.name}
            </Link>
          </CardTitle>
          {product.discount > 0 && (
            <Badge variant="destructive" className="ml-2 shrink-0">
              {product.discount}% OFF
            </Badge>
          )}
        </div>
         <p className="text-sm text-muted-foreground">{product.category}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <div>
           {product.discount > 0 ? (
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-primary">
                {formatPrice(discountedPrice)}
              </span>
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.price)}
              </span>
            </div>
          ) : (
            <span className="text-xl font-bold">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
        <Button size="icon" variant="outline" disabled={product.stock === 0}>
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Add to cart</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
