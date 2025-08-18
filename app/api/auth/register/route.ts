// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/User";
import { connectToDB } from "@/lib/connectDB";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    await connectToDB();

    const body = await req.json();
    const { username, firstName, lastName, phone, email, password } = body ?? {};

    if (!username || !firstName || !lastName || !phone || !email || !password) {
      return NextResponse.json(
        { success: false, error: "All required fields must be filled" },
        { status: 400 }
      );
    }

    const exists = await User.findOne({ email }).lean();
    if (exists) {
      return NextResponse.json(
        { success: false, error: "Email already registered" },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    await User.create({
      userID: uuidv4(),
      username,
      firstName,
      lastName,
      phone,
      email,
      password: hashed,
    });

    return NextResponse.json(
      { success: true, message: "Registration successful" },
      { status: 201 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
