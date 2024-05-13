"use client";

import Image from "next/image";
import googleIcon from "@/public/google-icon.png";
import { signIn } from "next-auth/react";

const GoogleSigIn = () => {
    return (
        <>
            <button
                className="flex justify-center items-center rounded-md px-5 py-2 mt-8 border border-gray-300 w-full hover:bg-[#F9F8F8]"
                onClick={() => signIn("google")}
            >
                <Image src={googleIcon} alt="image" width={20} height={20} className="mr-2" />
                <p className="text-sm">Continue with Google</p>
            </button>
        </>
    )
};

export default GoogleSigIn;
