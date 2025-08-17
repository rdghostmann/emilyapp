// /seed/page.tsx
import { connectToDB } from "@/lib/connectDB";
import { Category } from "@/models/Category";
import { categories as staticCategories } from "@/constants/categories";

const SeedPage = async () => {
  try {
    await connectToDB();
    console.log("✅ Connected to DB");

    // Clear existing categories
    await Category.deleteMany({});

    // Map static categories to DB format with categoryName and categorySlug
    const categoriesToInsert = staticCategories.map((cat) => ({
      name: cat.name,
      slug: cat.slug,
      icon: cat.icon?.name || "", // store icon name as string
      image: cat.image,
      href: cat.href,
      subcategories: cat.subcategories.map((sub) => ({
        name: sub.name,
        description: sub.description,
        image: sub.image,
        productCount: sub.productCount,
        categoryName: cat.slug,
        subcategorySlug: sub.subcategorySlug,
      })),
    }));

    await Category.insertMany(categoriesToInsert);

    console.log("✅ Categories seeded successfully!");

    return <div>✅ Categories seeded successfully</div>;
  } catch (error) {
    console.error("❌ Error seeding Categories:", error);
    return <div>❌ Failed to seed Categories</div>;
  }
};

export default SeedPage;
