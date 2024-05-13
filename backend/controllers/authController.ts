import { dbConnect } from "@/backend/config/dbConnect";
import usermodel from "@/backend/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const registerUser = async (req: any) => {
    try {
        const { username, email, password, avatar } = await req.json();

        //creates a chimoney sub account
        const response = await fetch(`${process.env.CHIMONEY_BASE_URL}/v0.2/sub-account/create`, {
            method: "POST",
            headers: {
                accept: 'application/json',
                "Content-Type": "application/json",
                "X-API-KEY": process.env.CHIMONEY_API_KEY as string
            },
            body: JSON.stringify({
                name: username,
                email,
            })
        });
        const responseData = await response.json();
        if (responseData.status !== 'success') {
            console.log('chimoney error data', responseData);
            return NextResponse.json({ message: "cannot sign up before the subId creation" }, { status: 400 })
        };

        // grabs user sub id from chimoney response
        const userSubId = responseData.data.id;

        //connects database
        await dbConnect();
        const userExists = await usermodel.findOne({ email });
        if (userExists) {
            return NextResponse.json({ message: "User already exists" }, { status: 500 });
        };
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new usermodel({ username, email, password: hashedPassword, avatar, userSubId });

        //creates user in database
        await newUser.save();
        return NextResponse.json({ message: "successfull" }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: error },
            { status: 500 }
        );
    };
};