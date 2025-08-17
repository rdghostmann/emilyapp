// app/api/products/route.ts
import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectToDB } from "@/lib/connectDB";
import { isValidCategory } from "@/lib/categoryValidation";

export async function GET(req: Request) {
  await connectToDB();

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const subcategory = searchParams.get("subcategory");

  const filter: any = {};
  if (category) filter.category = category;
  if (subcategory) filter.subcategory = subcategory;

  const products = await Product.find(filter).sort({ createdAt: -1 });

  return NextResponse.json(products);
}


export async function POST(req: Request) {
  await connectToDB();
  const body = await req.json();

  const { name, price, category, subcategory, seller, details } = body;

  if (!isValidCategory(category, subcategory)) {
    return NextResponse.json({ error: "Invalid category or subcategory" }, { status: 400 });
  }

  const newProduct = await Product.create(body);
  return NextResponse.json(newProduct, { status: 201 });
}