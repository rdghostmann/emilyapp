// Example: Cart icon button using Lucide's ShoppingCart
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartIcon() {
  return (
    <Link href="/cart" className="flex items-center justify-center">
      <ShoppingCart className="h-6 w-6 text-green-600" />
    </Link>
  );
}