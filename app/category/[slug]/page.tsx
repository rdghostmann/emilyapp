// app/category/[slug]/page.tsx
import { CategoryDTO, getCategoryBySlug } from "@/controllers/categories";
import CategoryPageClient from "./CategoryPageClient";

interface CategoryPageProps {
  params: { slug: string };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  // ✅ Await params usage
  const slug = params.slug;

  // Fetch category data server-side
  const category: CategoryDTO | null = await getCategoryBySlug(slug);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-8">
            The category you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  // Pass category to client component for interactivity
  return <CategoryPageClient initialCategory={category} />;
}
