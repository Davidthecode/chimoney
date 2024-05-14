import { type NextAuthOptions } from "next-auth";
import { dbConnect } from "@/backend/config/dbConnect";
import usermodel from "@/backend/models/user";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                await dbConnect();
                if (!credentials) throw new Error("no credentials to log in");
                const { email, password } = credentials;

                const user = await usermodel.findOne({ email });
                if (!user) {
                    return null;
                };
                const passwordsMatch = await bcrypt.compare(
                    password,
                    user.password
                );

                if (!passwordsMatch) {
                    return null;
                };

                console.log("credentials", credentials);
                return user;
            },
        }),
    ],
    callbacks: {
        // @ts-ignore
        async signIn({ user, account }) {

            if (account && account.provider === "google") {
                const { name, email, id, image } = user;
                try {
                    await dbConnect();
                    const userExists = await usermodel.findOne({ email });

                    if (!userExists) {
                        //creates a chimoney sub account
                        const response = await fetch(`${process.env.CHIMONEY_BASE_URL}/v0.2/sub-account/create`, {
                            method: "POST",
                            headers: {
                                accept: 'application/json',
                                "Content-Type": "application/json",
                                "X-API-KEY": process.env.CHIMONEY_API_KEY as string
                            },
                            body: JSON.stringify({
                                name,
                                email,
                            })
                        });
                        const responseData = await response.json();
                        if (responseData.status !== 'success') {
                            console.log('chimoney error data', responseData);
                            return;
                        };

                        console.log("chimoney sub account registration data", responseData);
                        const userSubId = responseData.data.id; // grabs user sub id from chimoney

                        //creates user in database
                        const res = await fetch("http://localhost:3000/api/register", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                username: name,
                                email,
                                password: id,
                                avatar: image,
                                userSubId
                            }),
                        });

                        if (res.ok) {
                            return user;
                        }
                    };
                } catch (error) {
                    console.log("Sign in error", error);
                };
            };

            return user;
        },
    },
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
