// /products/[id]/page.tsx
import { getProductById } from "@/controllers/products";
import ProductPage from "./ProductPage";

interface PageProps {
  // params: { id: string } | Promise<{ id: string }>;
  params: { id: string };
}

export default async function ProductPageServer({ params }: PageProps) {
  // Await params in case it is a Promise
  // const { id } = await params;
  const { id } = params; 

  const product = await getProductById(id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
          <p className="text-gray-600 mb-4">
            The product you are looking for does not exist or has been removed.
          </p>
        </div>
      </div>
    );
  }


  // Pass fetched product to Client Component
  return <ProductPage product={product} />;
}

// /products/[id]/page.tsx
// import { getProductById } from "@/controllers/products";
// import ProductPage from "./ProductPage";
// import type { ProductInterface } from "@/types/product";

// interface PageProps {
//   params: { id: string };
// }

// export default async function ProductPageServer({ params }: PageProps) {
//   const { id } = params; 

//   const product: ProductInterface | null = await getProductById(id);

//   if (!product) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
//           <p className="text-gray-600 mb-4">
//             The product you are looking for does not exist or has been removed.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // Pass fetched product to Client Component
//   return <ProductPage product={product} />;
// }
