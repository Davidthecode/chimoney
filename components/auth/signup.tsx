"use client";

import { type FormEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader } from "lucide-react";
import logo from "@/public/logo.svg";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import GoogleSigIn from "./google-signin";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { push } = useRouter();

    const handleSignup = async (e: FormEvent) => {
        e.preventDefault();
        const validate = username !== "" && email !== "" && password !== "";
        if (validate) {
            try {
                setLoading(true);
                const avatar = `https://ui-avatars.com/api/?name=${username}&background=random`;
                const res = await fetch("api/auth", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        username,
                        email,
                        password,
                        avatar
                    })
                })
                if (!res.ok) {
                    const errorData = await res.json();
                    if (errorData.message.code === 11000) {
                        toast.error("This email already exists, Login instead");
                    } else toast.error("Error signing up");
                } else {
                    setLoading(false);
                    setUsername("");
                    setEmail("");
                    setPassword("");
                    toast.success("Signed up successfully");
                    const data = await res.json();
                    push('/dashboard');
                }
            } catch (error) {
                setLoading(false);
                toast.error("Error signing up");
            };
        } else toast.error("Complete all fields before signing up");
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
                    <h1 className="text-2xl mb-2 text-center">The ultimate payment infrastructure</h1>
                    <GoogleSigIn />
                    <div className="flex justify-center items-center mt-8 w-full">
                        <div className="border-t border-gray-300 w-[46%] h-0"></div>
                        <div className="px-2 text-sm">or</div>
                        <div className="border-t border-gray-300 w-[46%] h-0"></div>
                    </div>

                    <form className="mt-6" onSubmit={handleSignup}>
                        <div className="flex flex-col mb-2">
                            <label htmlFor="username" className="text-xs font-medium mb-2">User Name</label>
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="border border-gray-300 h-10 rounded-md px-2 outline-[#22C55E] text-sm"
                                type="text"
                                id="username"
                            />
                        </div>
                        <div className="flex flex-col mb-2">
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
                                placeholder="Password must be at least 6 characters"
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
                                <p>Create new account</p>
                            )
                            }
                        </button>
                    </form>

                    <div className="mt-6 flex justify-center items-center text-xs">
                        <p>Already created an account?</p>
                        <Link href="/login">
                            <span className="underline font-semibold ml-1">Login</span>
                        </Link>
                    </div>
                    <p className="text-xs text-center mt-3">By signing up to agree to Chimoney terms and policy</p>
                </div>
            </aside>
        </div>
    );
};

export default Signup;