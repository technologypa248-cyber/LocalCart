"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Minus, Plus, ShoppingCart } from "lucide-react";

type AddToCartFormProps = {
  productId: string;
  stock: number;
};

export function AddToCartForm({ productId, stock }: AddToCartFormProps) {
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => {
      const newQuantity = prev + amount;
      if (newQuantity < 1) return 1;
      if (newQuantity > stock) return stock;
      return newQuantity;
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you would call a server action to add to cart
    console.log(`Adding ${quantity} of product ${productId} to cart.`);
    toast({
      title: "Added to cart!",
      description: `${quantity} x Product has been added to your cart.`,
    });
  };

  if (stock === 0) {
    return (
        <Button size="lg" disabled className="w-full">
            Out of Stock
        </Button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-4">
      <div className="grid gap-2">
        <Label htmlFor="quantity" className="text-sm">
          Quantity
        </Label>
        <div className="flex items-center">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-r-none"
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            id="quantity"
            name="quantity"
            type="number"
            value={quantity}
            onChange={(e) => {
                const value = Math.max(1, Math.min(stock, Number(e.target.value)))
                setQuantity(value);
            }}
            className="h-10 w-16 rounded-none border-x-0 text-center"
            min="1"
            max={stock}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-l-none"
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= stock}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Button type="submit" size="lg" className="flex-1">
        <ShoppingCart className="mr-2 h-5 w-5" />
        Add to Cart
      </Button>
    </form>
  );
}
