"use client";

import {
    type Dispatch,
    type SetStateAction,
    type ReactNode,
    useContext,
    createContext,
    useState,
} from 'react';

type SidebarType = {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
};

export const SidebarContext = createContext<SidebarType | null>(null);

export const UseSidebarContext = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </SidebarContext.Provider>
    )
};

export const useSidebarContext = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('error');
    }
    return context;
};