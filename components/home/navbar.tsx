"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from 'react';
import NavHeader from "./navHeader";
import logo from "@/public/logo.svg";
import Image from "next/image";

const Navbar = () => {
    const [dropdownIconState, setDropdownIconState] = useState(false);

    //Toggles navbar dropdown state
    const handleToggleDropdownIcon = () => {
        setDropdownIconState(!dropdownIconState);
    };

    //sets navbar dropdown to false in medium screens and above
    const updateDropdownState = () => {
        window.innerWidth > 767 && setDropdownIconState(false);
    };

    useEffect(() => {
        window.addEventListener('resize', updateDropdownState);
        return () => {
            window.removeEventListener('resize', updateDropdownState);
        };
    }, []);

    //References navbar and its content
    const navElementRef = useRef<HTMLDivElement | null>(null);

    //Sets navbar dropdown to false when you click outside of the dropdown
    const handleClickOutside = (e: any) => {
        const target = e.target as Node;
        if (navElementRef.current && !navElementRef.current.contains(target)) {
            setDropdownIconState(false);
        };
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [navElementRef]);

    return (
        <div>
            <NavHeader dropdownIconState={dropdownIconState} handleToggleDropdownIcon={handleToggleDropdownIcon} />
            <nav
                ref={navElementRef}
                className={`flex items-center py-3 px-8 md:px-12 lg:px-16 md:text-sm md:flex bg-white ${dropdownIconState ? "absolute z-50 px-[3%] top-20 inset-x-4 shadow-lg rounded-xl border border-gray-300 bg-white border-opacity-30 md:shadow-none md:border-none" : "hidden"}`}
            >
                <div className="w-full md:flex">
                    <div className="hidden md:flex items-center">
                        <Image src={logo} alt="image" width={50} height={50} className="mr-1" />
                        <h1 className="text-2xl">Chimoney</h1>
                    </div>
                    <div className="space-y-4 md:space-y-0 md:flex md:items-center md:ml-auto">
                        <Link href="/login">
                            <button className="mr-6 text-sm font-semibold flex items-center hover:underline underline-offset-4 ml-2 md:ml-0">Log in</button>
                        </Link>

                        <Link href="/signup">
                            <button className="mt-4 md:mt-0 border px-4 py-1 text-sm rounded-3xl bg-[#22C55E] text-white flex items-center"> Sign up</button>
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;