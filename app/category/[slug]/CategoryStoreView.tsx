// SubcategoriesGrid.tsx
import Link from "next/link";
import Image from "next/image";

interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  productCount?: number;
}

interface SubcategoriesGridProps {
  subcategories: Subcategory[];
  onSelectSubcategory?: (id: string) => void; // <-- Add optional callback
}

export default function SubcategoriesGrid({
  subcategories,
  onSelectSubcategory,
}: SubcategoriesGridProps) {
  if (!subcategories || subcategories.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Browse Subcategories</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {subcategories.map((subcategory) => (
          <div
            key={subcategory._id}
            className="cursor-pointer"
            onClick={() => onSelectSubcategory?.(subcategory._id)} // call callback if defined
          >
            <div className="p-4 bg-gray-100 rounded hover:bg-gray-200 text-center">
              {subcategory.image && (
                <Image
                  src={subcategory.image}
                  alt={subcategory.name}
                  width={80}
                  height={80}
                  className="mx-auto rounded-full mb-2 object-cover"
                />
              )}
              <h3 className="font-semibold text-gray-800">{subcategory.name}</h3>
              {subcategory.description && (
                <p className="text-sm text-gray-600">{subcategory.description}</p>
              )}
              {subcategory.productCount !== undefined && (
                <span className="text-xs text-green-600">{subcategory.productCount} products</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
