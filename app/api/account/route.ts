import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { getTransactions, getWalletBalance } from "@/backend/controllers/accountController";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "unauthorized" }, { status: 400 });
    };

    const { userSubId, action } = await req.json();

    if (action === "walletBalance") {
        const response = await getWalletBalance({ userSubId });
        return response;
    } else if (action === "transactions") {
        const response = await getTransactions({ userSubId });
        return response;
    } else {
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
};