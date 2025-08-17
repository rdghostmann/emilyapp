// app/subcategory/[id]/page.tsximport { getSubcategoryById } from "@/controllers/categories";
import { getProduct, getSubcategoryById } from "@/controllers/products";
import SubcategoryPageClient from "./SubcategoryPageClient";

interface SubcategoryPageProps {
  params: { id: string } | Promise<{ id: string }>;
}

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
  const { id } = await params;

  const subcategory = await getSubcategoryById(id);
  if (!subcategory) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Subcategory Not Found</h1>
          <p className="text-gray-600 mb-8">The subcategory you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  // Fetch initial products server-side
  const initialProducts = await getProduct(subcategory.categorySlug, subcategory.id);

  return <SubcategoryPageClient subcategory={subcategory} initialProducts={initialProducts} />;
}
