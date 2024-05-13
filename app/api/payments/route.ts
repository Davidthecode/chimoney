import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { sendMoneyWithEmail, sendMoneyWithPhoneNumber } from "@/backend/controllers/paymentsController";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 400 });
  };

  const { email, phone, amount, userSubId } = await req.json();

  if (email) {
    const response = await sendMoneyWithEmail({ email, amount, userSubId });
    return response;
  } else if (phone) {
    const response = await sendMoneyWithPhoneNumber({ phone, amount, userSubId });
    return response;
  };
};