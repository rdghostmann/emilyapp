// /seed/page.tsx
import { connectToDB } from "@/lib/connectDB";
import Category from "@/models/Category";
import { categories as categoryConstants } from "@/constants/categories";

export default async function SeedPage() {
  try {
    await connectToDB();

    // Remove all old categories
    await Category.deleteMany({});

    // Transform constants -> DB format
    const categoriesToInsert = categoryConstants.map((cat) => ({
      name: cat.name,
      slug: cat.id,
      image: cat.image,
      href: cat.href,
      description: `${cat.name} category`, // basic placeholder description
      subCategories: cat.subcategories.map((sub) => {
        const subSlug = sub.toLowerCase().replace(/\s+/g, "-");
        return {
          name: sub,
          image: `/images/subcategories/${subSlug}.jpg`,
          description: `${sub} under ${cat.name}`,
          href: `${cat.href}/${subSlug}`,
        };
      }),
    }));

    // Insert into DB
    const inserted = await Category.insertMany(categoriesToInsert);

    return (
      <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
        <h1>✅ Seeding Complete</h1>
        <p>{inserted.length} categories inserted.</p>
        <ul>
          {inserted.map((cat) => (
            <li key={cat.slug}>
              <strong>{cat.name}</strong> – {cat.subCategories.length} subcategories
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (err: any) {
    return (
      <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
        <h1 style={{ color: "red" }}>❌ Seeding Failed</h1>
        <p>{err.message}</p>
      </div>
    );
  }
}
