"use client";

import { ProductInterface } from "@/types/product";
import { SellerProfile } from "@/types/seller";
import { useState } from "react";

interface ContactSellerPageProps {
seller: SellerProfile;
  product: ProductInterface;
}

export default function ContactSellerPage({ seller, product }: ContactSellerPageProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Message sent to ${seller.username}: ${message}`);
    setMessage("");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className="text-xl font-semibold mb-2">Contact {seller.username}</h1>
      <p className="mb-4 text-gray-600">
        About product: <span className="font-medium">{product.name}</span> (${product.price})
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message..."
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
