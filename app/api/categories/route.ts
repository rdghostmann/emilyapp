// app/api/categories/route.ts
import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/connectDB"
import { Category } from "@/models/Category"

export async function GET() {
  try {
    await connectToDB()
    const categories = await Category.find({}).sort({ name: 1 }) // sort alphabetically
    return NextResponse.json({ categories })
  } catch (error: any) {
    console.error("Error fetching categories:", error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
