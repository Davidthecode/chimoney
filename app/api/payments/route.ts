import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { sendMoneyToWallet, sendMoneyWithEmail, sendMoneyWithPhoneNumber } from "@/backend/controllers/paymentsController";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 400 });
  };

  const { email, phone, amount, receiverChimoneyId, userSubId, action } = await req.json();

  if (action === "toEmail") {
    const response = await sendMoneyWithEmail({ email, amount, userSubId });
    return response;
  } else if (action === "toPhone") {
    const response = await sendMoneyWithPhoneNumber({ phone, amount, userSubId });
    return response;
  } else if (action === "toWallet") {
    const response = await sendMoneyToWallet({ receiverChimoneyId, amount, userSubId });
    return response;
  } else {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }
};