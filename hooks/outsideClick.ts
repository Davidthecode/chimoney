"use client";

import { useEffect } from "react";

const OutsideClick = (event: any, func: () => void) => {
    const handleClickOutside = (e: any) => {
        const target = e.target as Node;
        window.innerWidth < 1024 && event.current && !event.current.contains(target) && func();
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
};

export default OutsideClick;
