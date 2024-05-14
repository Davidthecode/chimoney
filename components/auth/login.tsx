"use client";

import { type FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader } from "lucide-react";
import logo from "@/public/logo.svg";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import GoogleSigIn from "./google-signin";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { replace } = useRouter();

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await signIn("credentials", {
                email,
                password,
            });
            if (res && res.error) {
                toast.error("Invalid Credentials");
                setLoading(false);
                return;
            };
            setEmail("");
            setPassword("");
            setLoading(false);
            toast.success("Logged in successfully");
            replace("dashboard");
        } catch (error) {
            console.log(error);
        };
    };

    return (
        <div className="px-[10%]">
            <div className="pt-5 absolute flex items-center">
                <Link href="/">
                    <Image src={logo} alt="image" width={50} height={50} className="mr-1" />
                </Link>
                <h1 className="text-xl font-medium">Chimoney</h1>
            </div>

            <aside className="flex justify-center items-center h-screen">
                <div className="w-[30rem]">
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-2xl mb-2">Welcome to Chimoney</h1>
                        <p className="text-lg text-center">Log in to your account</p>
                        <GoogleSigIn />
                    </div>

                    <div className="flex justify-center items-center mt-8 w-full">
                        <div className="border-t border-gray-300 w-[46%] h-0"></div>
                        <div className="px-2 text-sm">or</div>
                        <div className="border-t border-gray-300 w-[46%] h-0"></div>
                    </div>

                    <form className="mt-6" onSubmit={handleLogin}>
                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-xs font-medium mb-2">Email address</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border border-gray-300 h-10 rounded-md px-2 outline-[#22C55E] text-sm"
                                type="text"
                                id="email"
                            />
                        </div>
                        <div className="flex flex-col mt-2">
                            <label htmlFor="password" className="text-xs font-medium mb-2">Password</label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border border-gray-300 h-10 rounded-md px-2 outline-[#22C55E] text-sm"
                                type="password"
                                id="password"
                            />
                        </div>
                        <button
                            type="submit"
                            className={`w-full text-white text-sm mt-6 flex items-center justify-center bg-[#22C55E] h-10 rounded-md ${loading ? "opacity-60" : "hover:bg-[#3aa461]"}`}
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader className="animate-spin" />
                            ) : (
                                <p>Log In</p>
                            )
                            }
                        </button>
                    </form>

                    <div className="mt-6 flex justify-center items-center text-xs">
                        <p>Don&apos;t have an account?</p>
                        <Link href="/signup">
                            <span className="underline font-semibold ml-1">Sign up</span>
                        </Link>
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default Login;