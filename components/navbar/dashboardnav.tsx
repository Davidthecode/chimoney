"use client";

import {
    useEffect,
    useState,
    useRef
} from "react";
import {
    PanelRight,
    Menu,
    X,
} from "lucide-react";
import Image from "next/image";
import testUser from "@/public/testuser.svg";
import { useSidebarContext } from "@/context/sidebarContext";
import OutsideClick from "@/hooks/outsideClick";
import { useUserContext } from "@/context/userContext";

const DashboardNav = () => {
    const [navInfo, setNavInfo] = useState(false);
    const { setIsOpen } = useSidebarContext();
    const { userInfo } = useUserContext();

    //opens sidebar on medium screens and below
    const handleSidebar = () => setIsOpen(true);

    const handleNavInfo = () => setNavInfo(!navInfo);

    //set navInfo to false on larger screeens and above
    useEffect(() => {
        const handleResise = () => window.innerWidth > 1023 && setNavInfo(false);
        window.addEventListener("resize", handleResise);
        return () => {
            window.removeEventListener("resize", handleResise);
        };
    }, []);

    //Refrence navInfo div
    const divRef = useRef<HTMLDivElement | null>(null);

    //function to close navInfo
    const closeNavInfo = () => setNavInfo(false);

    //hook to close navInfo div when you click outside of it in medium screens and below
    OutsideClick(divRef, closeNavInfo);

    return (
        <nav className='py-5 w-full flex items-center justify-between px-4 sm:px-8'>
            <div className="flex items-center">
                <button onClick={handleSidebar}>
                    <PanelRight className="lg:hidden mr-3" />
                </button>
                <p className="text-sm font-bold">Chimoney</p>
            </div>
            <button onClick={handleNavInfo}>
                {navInfo ? <X className="sm:hidden" /> : <Menu className="sm:hidden" />}
            </button>
            <div className={`sm:flex ${navInfo ? "flex absolute bg-white right-2 top-16 z-10 border px-3 py-2 rounded-md" : "hidden"}`} ref={divRef}>
                {userInfo?.avatar ? (
                    <Image src={userInfo?.avatar} alt="image" width={0} height={0} loader={({ src }) => src} className="w-8 h-8 rounded-full mr-2" />
                ) : (
                    <Image src={testUser} alt="Default Image" width={30} height={30} className="mr-2" />
                )}
                <div className="flex flex-col">
                    <p className="text-xs font-bold">{userInfo?.username}</p>
                    <p className="text-xs">{userInfo?.email}</p>
                </div>
            </div>
        </nav>
    )
};

export default DashboardNav;
