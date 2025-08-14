import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/User";
import { connectToDB } from "@/lib/connectDB";
import { v4 as uuidv4 } from "uuid"; // <-- Import uuidv4

export async function POST(req: any) {
  try {
    await connectToDB();

    const {
      username,
      firstName,
      lastName,
      phone,
      email,
      password
    } = await req.json();

    if (!username || !firstName || !lastName || !phone || !email || !password) {
      return NextResponse.json({
        message: "All required fields must be filled",
        status: 400
      });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      userID: uuidv4(),
      username,
      firstName: firstName || "",
      lastName: lastName || "",
      phone,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({
      status: 201,
      success: true,
      message: "Registration successful"
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}





