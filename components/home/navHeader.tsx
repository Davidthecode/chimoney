"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { X } from "lucide-react";
import logo from "@/public/logo.svg";
import Image from "next/image";

type NavHeaderType = {
    handleToggleDropdownIcon: () => void,
    dropdownIconState: boolean,
};

const NavHeader = ({ handleToggleDropdownIcon, dropdownIconState }: NavHeaderType) => {
    return (
        <div className="flex items-center justify-between py-5 px-8 bg-white md:hidden">
            <Link href="/">
                <div className="flex items-center">
                    <Image src={logo} alt="image" width={50} height={50} className="mr-1" />
                    <h1 className="text-xl font-medium">Chimoney</h1>
                </div>
            </Link>
            <div>
                <button
                    onClick={handleToggleDropdownIcon}
                >
                    {
                        dropdownIconState ? (
                            <X size={20} strokeWidth={1.5} />
                        ) : (
                            <Menu size={20} strokeWidth={1.5} />
                        )
                    }
                </button>
            </div>
        </div>
    )
};

export default NavHeader;