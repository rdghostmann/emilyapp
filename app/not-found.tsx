// app/not-found.tsx
export default function NotFound() {
  return (
    <div className="p-6 h-full space-y-3 text-center flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">404 Page</h1>
      <p className="text-gray-500 mt-2">The page you’re looking for doesn’t exist.</p>
    </div>
  );
}
