// app/api/products/[id]/route.ts
import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectToDB } from "@/lib/connectDB";


export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDB();

  const product = await Product.findById(params.id).populate("seller", "name email");
  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

// app/api/products/[id]/route.ts (extend PATCH)
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDB();
  const body = await req.json();

  const product = await Product.findByIdAndUpdate(params.id, body, { new: true });
  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}


// app/api/products/[id]/route.ts (extend DELETE)
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDB();

  const deleted = await Product.findByIdAndDelete(params.id);
  if (!deleted) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Product deleted" });
}
