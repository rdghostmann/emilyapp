import { getCategoryBySlug, getSubcategoriesByCategory } from "@/lib/category";
import { getProductsByCategory } from "@/lib/products";
import CategoryStoreView from "./CategoryStoreView";

interface CategoryPageProps {
  params: { slug: string };
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  subCategories?: any[];
}

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  image?: string;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = (await getCategoryBySlug(params.slug)) as Category | null;

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-6">
            The category you&apos;re looking for doesn&apos;t exist.
          </p>
          <a
            href="/marketplace"
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Back to Marketplace
          </a>
        </div>
      </div>
    );
  }

  const categoryId = category._id.toString();
  const subcategories = await getSubcategoriesByCategory(categoryId);

  // Fetch products and map to frontend-friendly shape
  const rawProducts = await getProductsByCategory(categoryId);
  const products: Product[] = rawProducts.map((p: any) => ({
    _id: p._id.toString(),
    name: p.name,
    slug: p.slug || p._id.toString(), // fallback slug
    price: p.price,
    image: Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : undefined,
  }));

  return (
    <CategoryStoreView
      category={{ _id: category._id, name: category.name }}
      subcategories={subcategories}
      initialProducts={products}
    />
  );
}
