import { connectToDB } from "@/lib/connectDB";
import Product from "@/models/Product";
import User from "@/models/User";

export default async function SeedPage() {
  await connectToDB();

  // Example user(s)
  const users = [
    {
      _id: "68625a0a5933233bed203443",
      username: "rd47",
      email: "randalchukzwilson@gmail.com",
      password: "randalchukzwilson@gmail.com", // hash in real usage!
    },
  ];

  // Upsert user(s)
  for (const user of users) {
    await User.updateOne({ _id: user._id }, user, { upsert: true });
  }

  // Seed products, referencing the user as farmer
  const mockProducts = [
    {
      title: "Fresh Organic Tomatoes",
      description: "Premium quality organic tomatoes, freshly harvested from our farm. Perfect for cooking and salads.",
      price: 4.99,
      unit: "per kg",
      images: ["/product/fresh-organic-tomatoes.jpg"],
      farmer: users[0]._id, // Reference to User
      category: "fruits-vegetables",
      inStock: true,
      quantity: "500 kg available",
      postedAt: "2 hours ago",
    },
    {
      title: "Premium Wheat Grain",
      description:
        "High-quality wheat grain, perfect for flour production. Grown using sustainable farming practices.",
      price: 2.5,
      unit: "per kg",
      image: "/product/premium-wheat-grain.jpg",
      farmer: users[0]._id, // Reference to User
      category: "seedlings",
      inStock: true,
      quantity: "2000 kg available",
      postedAt: "5 hours ago",
    },
    {
      title: "Fresh Farm Eggs",
      description:
        "Free-range chicken eggs from happy, healthy chickens. Rich in nutrients and perfect for any meal.",
      price: 6.99,
      unit: "per dozen",
      image: "/product/fresh-farm-eggs.jpg",
      farmer: users[0]._id, // Reference to User
      category: "livestock-pets",
      inStock: true,
      quantity: "200 dozens available",
      postedAt: "1 day ago",
    },
    {
      title: "Organic Apples",
      description:
        "Sweet and crispy organic apples. No pesticides used. Great for eating fresh or making juice.",
      price: 5.99,
      unit: "per kg",
      image: "/product/organic-apples.jpg",
      farmer: users[0]._id, // Reference to User
      category: "fruits-vegetables",
      inStock: true,
      quantity: "800 kg available",
      postedAt: "3 hours ago",
    },
    {
      title: "Fresh Milk",
      description:
        "Pure, fresh milk from grass-fed cows. Rich in calcium and perfect for the whole family.",
      price: 3.99,
      unit: "per liter",
      image: "/product/fresh-milk.jpg",
      farmer: users[0]._id, // Reference to User
      category: "livestock-pets",
      inStock: true,
      quantity: "500 liters available",
      postedAt: "4 hours ago",
    },
    {
      title: "Organic Carrots",
      description:
        "Fresh, crunchy organic carrots. Perfect for cooking, juicing, or eating raw as a healthy snack.",
      price: 3.49,
      unit: "per kg",
      image: "/product/organic-carrots.jpg",
      farmer: users[0]._id, // Reference to User
      category: "fruits-vegetables",
      inStock: true,
      quantity: "300 kg available",
      postedAt: "6 hours ago",
    },

  ];

  // Remove all products first (optional)
  await Product.deleteMany({});

  // Insert products
  await Product.insertMany(mockProducts);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Seeded Products</h1>
      <ul className="list-disc pl-6">
        {mockProducts.map((p, i) => (
          <li key={i}>{p.title}</li>
        ))}
      </ul>
    </div>
  );
}