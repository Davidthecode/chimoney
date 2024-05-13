import { dbConnect } from "@/backend/config/dbConnect";
import usermodel from "@/backend/models/user";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: "unauthorized user" }, { status: 500 })
    };
    await dbConnect();
    const email = session.user?.email;
    const user = await usermodel.findOne({ email });
    if (!user) {
        NextResponse.json({ error: "User not found", }, { status: 500 });
    };
    return NextResponse.json({ user }, { status: 200 });
};