import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getProductBySlug } from "@/lib/data";

// Mock cart data for checkout display
const mockCartItems = [
    { slug: "quantum-smartphone", quantity: 1 },
    { slug: "echo-wireless-headphones", quantity: 2 },
];

function formatPrice(price: number) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);
}


export default async function CheckoutPage() {
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
      <h1 className="text-3xl font-bold font-headline mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="lg:order-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                {validCartItems.map((item) => item && (
                    <div key={item.id} className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <Image src={item.imageUrl} alt={item.name} width={64} height={64} className="rounded-md object-cover aspect-square"/>
                            <div>
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                        </div>
                        <p>{formatPrice(item.price * (1 - item.discount / 100) * item.quantity)}</p>
                    </div>
                ))}
                </div>
                 <Separator className="my-4" />
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>{formatPrice(shipping)}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>{formatPrice(total)}</span>
                    </div>
                </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:order-1">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Shipping Information</CardTitle>
              <CardDescription>Payment method is Cash on Delivery (COD).</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" />
                    </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" placeholder="123 Main St" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Anytown" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State / Province</Label>
                    <Input id="state" placeholder="CA" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP / Postal Code</Label>
                    <Input id="zip" placeholder="12345" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" placeholder="USA" />
                </div>
              </form>
            </CardContent>
            <CardFooter>
                 <Button size="lg" className="w-full">
                    Place Order
                </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
