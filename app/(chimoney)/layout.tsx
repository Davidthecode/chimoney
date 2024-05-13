import type { Metadata } from "next";
import Sidebar from "@/components/sidebar/sidebar";
import DashboardNav from "@/components/navbar/dashboardnav";

export const metadata: Metadata = {
    title: "Chimoney",
    description: "The ultimate payment infrastructure",
};

export default function ServiceLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section className="flex items-center h-full">
            <Sidebar />
            <div className="flex flex-col h-full w-full">
                <DashboardNav />
                {children}
            </div>
        </section>
    );
};
