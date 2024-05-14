"use client";

import {
    type ReactNode,
    useContext,
    createContext,
    useState,
    useEffect
} from 'react';

import { useSession } from 'next-auth/react';

type User = {
    avatar: string,
    email: string,
    password: string,
    username: string,
    userSubId: string,
};

type UserContextType = {
    userInfo: User | null,
    setUserInfo: (userInfo: User | null) => void,
};

export const UserContext = createContext<UserContextType | null>(null);

export const UseUserContext = ({ children }: { children: ReactNode }) => {
    const { status } = useSession();
    const [userInfo, setUserInfo] = useState<User | null>(null);

    useEffect(() => {
        const getUser = async () => {
            const res = await fetch("api/getUser");
            if (!res.ok) {
                console.log(res);
                console.log("context couldn't get user");
                return;
            };
            const resData = await res.json();
            setUserInfo(resData.user);
        };
        if (status === "authenticated") {
            getUser();
        };
    }, [status]);

    return (
        <UserContext.Provider value={{ userInfo, setUserInfo }}>
            {children}
        </UserContext.Provider>
    )
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('error');
    }
    return context;
};