import { useState } from 'react';

export default function useLocalStorage<T>(key: string, initialValue: T) {
    const [value, setValue] = useState<T>(() => {
        if (typeof window === 'undefined') {
            return initialValue;
        }
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    function updateValue(newValue: T) {
        try {
            setValue(newValue);
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(newValue));
            }
        } catch (error) {
            console.error(error);
        }
    }

    return [value, updateValue] as const;
}
