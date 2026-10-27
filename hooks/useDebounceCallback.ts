import { useCallback, useEffect, useRef } from "react";

const useDebouncedCallback = <T extends (...args: any[]) => any>(
    callback: T,
    delay: number
): ((...args: Parameters<T>) => void) => {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const callbackRef = useRef<T>(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    return useCallback((...args: Parameters<T>) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            callbackRef.current(...args);
        }, delay);
    }, [delay]);
};

export default useDebouncedCallback;