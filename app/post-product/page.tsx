import PostProductForm from "@/components/PostProductForm";

export default function PostProductPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Post Your Product</h1>
          <p className="text-gray-600">Share your agricultural products with thousands of potential buyers</p>
        </div>
        <PostProductForm />
      </div>
    </div>
  )
}
