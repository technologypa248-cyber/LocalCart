import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2 } from "lucide-react";
import { getProductBySlug } from "@/lib/data";

// Mock cart data
const mockCartItems = [
    { slug: "quantum-smartphone", quantity: 1 },
    { slug: "echo-wireless-headphones", quantity: 2 },
];

function formatPrice(price: number) {
    const formatted = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);
    return formatted.replace("₹", "₨ ");
}

export default async function CartPage() {
    const cartItems = await Promise.all(
        mockCartItems.map(async (item) => {
            const product = await getProductBySlug(item.slug);
            return product ? { ...product, quantity: item.quantity } : null;
        })
    );

    const validCartItems = cartItems.filter(item => item !== null);
    
    const subtotal = validCartItems.reduce((acc, item) => {
        if (!item) return acc;
        const discountedPrice = item.price * (1 - item.discount / 100);
        return acc + discountedPrice * item.quantity;
    }, 0);

    const shipping = 50.00;
    const total = subtotal + shipping;
    
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold font-headline mb-8">Shopping Cart</h1>
      {validCartItems.length === 0 ? (
        <div className="text-center py-20">
            <p className="text-muted-foreground text-xl">Your cart is empty.</p>
            <Button asChild className="mt-4">
                <Link href="/">Continue Shopping</Link>
            </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {validCartItems.map((item) => item && (
                    <div key={item.id} className="flex items-center gap-4 p-4">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="rounded-md object-cover aspect-square"
                      />
                      <div className="flex-grow">
                        <Link href={`/product/${item.slug}`} className="font-semibold hover:underline">{item.name}</Link>
                        <p className="text-sm text-muted-foreground">{formatPrice(item.price * (1 - item.discount / 100))}</p>
                      </div>
                      <div className="flex items-center gap-2">
                         <Button variant="outline" size="icon" className="h-8 w-8"><Minus className="h-4 w-4" /></Button>
                         <Input type="number" value={item.quantity} className="h-8 w-14 text-center" readOnly />
                         <Button variant="outline" size="icon" className="h-8 w-8"><Plus className="h-4 w-4" /></Button>
                      </div>
                       <p className="font-semibold w-24 text-right">
                         {formatPrice(item.price * (1 - item.discount / 100) * item.quantity)}
                       </p>
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{formatPrice(shipping)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild size="lg" className="w-full">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
