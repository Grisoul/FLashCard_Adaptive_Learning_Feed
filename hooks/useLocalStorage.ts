'use client';

import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [value, setValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch {
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch {
            console.error("Failed to save to localStorage");
        }
    }, [key, value]);

    const remove = () => {
        window.localStorage.removeItem(key);
        setValue(initialValue);
    };

    return [value, setValue, remove] as const;
}
