"use client";

import { type ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { UseSidebarContext } from "@/context/sidebarContext";
import { UseUserContext } from "@/context/userContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    return (
        <SessionProvider>
            <UseSidebarContext>
                <UseUserContext>
                    {children}
                </UseUserContext>
            </UseSidebarContext>
        </SessionProvider>
    );
};