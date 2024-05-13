"use client";

import {
    useEffect,
    useRef
} from "react";
import {
    LayoutDashboard,
    ArrowLeftRight,
    WalletCards,
    LogOut,
} from "lucide-react";
import Link from 'next/link';
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebarContext } from "@/context/sidebarContext";
import logo from "@/public/logo.svg";
import OutsideClick from "@/hooks/outsideClick";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Sidebar = () => {
    const currentPath = usePathname();
    const { isOpen, setIsOpen } = useSidebarContext();
    const { push } = useRouter();

    //set sidebar to false on larger screeens and above
    useEffect(() => {
        const handleResise = () => window.innerWidth > 1023 && setIsOpen(false);
        window.addEventListener("resize", handleResise);
        return () => {
            window.removeEventListener("resize", handleResise);
        };
    }, []);

    //Refrence sidebar div
    const sidebarDivRef = useRef<HTMLDivElement | null>(null);

    //function to close sidebar
    const closeSidebar = () => setIsOpen(false);

    //hook to close sidebar when you click outside of it in medium screens and below
    OutsideClick(sidebarDivRef, closeSidebar);

    //signs user out
    const handleLogout = () => {
        signOut();
        push("/");
    };

    return (
        <div className={`bg-[#faf9f9] border-r border-gray-200 border-opacity-50 lg:flex flex-col h-full text-[#525151] lg:w-[25%] xl:w-[22%] pt-4 ${isOpen ? "fixed inset-0 z-40 w-[17rem] sm:w-[20rem] flex flex-col " : "hidden lg:flex"
            }`}
            ref={sidebarDivRef}
        >
            <div className="flex justify-center pb-8">
                <Image src={logo} alt="image" width={40} height={40} />
            </div>
            <div className='flex flex-col items-center space-y-6'>
                <Link
                    href="/dashboard"
                    className={`flex justify-start rounded-md pl-2 py-1 w-3/4 hover:bg-[#E7E5E4] ${currentPath == "/dashboard" && "bg-[#E7E5E4]"}`}
                >
                    <LayoutDashboard strokeWidth={1.5} size={20} className="mr-2" />
                    <p className='text-sm font-medium'>Dashboard</p>
                </Link>
                <Link
                    href="/transactions"
                    className={`flex justify-start rounded-md pl-2 py-1 w-3/4 hover:bg-[#E7E5E4] ${currentPath == "/transactions" && "bg-[#E7E5E4]"}`}
                >
                    <ArrowLeftRight strokeWidth={1.5} size={20} className="mr-2" />
                    <p className="text-sm font-medium">Transactions</p>
                </Link>

                <Link href="/payments"
                    className={`flex justify-start rounded-md pl-2 py-1 w-3/4 hover:bg-[#E7E5E4] ${currentPath == "/payments" && "bg-[#E7E5E4]"}`}
                >
                    <WalletCards strokeWidth={1.5} size={20} className="mr-2" />
                    <p className="text-sm font-medium">payments</p>
                </Link>
            </div>
            <div className=" mt-auto ml-4 flex flex-col items-center space-y-20">
                <button
                    className="flex justify-start rounded-md pl-2 py-1 w-3/4 hover:bg-[#E7E5E4]"
                    onClick={handleLogout}
                >
                    <LogOut strokeWidth={1.5} size={20} className="mr-2" />
                    <p className="text-sm font-medium">Logout</p>
                </button>
                <Link href="https://github.com/Davidthecode" target='_blank'>
                    <p className='flex justify-center px-8 py-1 w-3/4 text-xs hover:underline'>
                        Github
                    </p>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;