import { NextResponse } from "next/server";
import { registerUser } from "@/backend/controllers/authController";

export async function POST(req: Request) {
  try {
    const response = await registerUser(req);
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: error },
      { status: 500 }
    );
  };
};
