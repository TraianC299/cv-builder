import { useCallback, useEffect, useRef } from "react";

type ThrottleOptions = {
    leading?: boolean;
    trailing?: boolean;
};

export function useThrottleFn<T extends (...args: any[]) => any>(
    fn: T,
    delay: number,
    options: ThrottleOptions = {}
) {
    const { leading = true, trailing = true } = options;

    const lastCallTime = useRef<number | null>(null);
    const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const lastArgs = useRef<Parameters<T> | undefined>(undefined);
    const fnRef = useRef(fn);

    // Always keep latest function
    useEffect(() => {
        fnRef.current = fn;
    }, [fn]);

    const cancel = useCallback(() => {
        if (timeout.current) {
            clearTimeout(timeout.current);
            timeout.current = null;
        }
        lastCallTime.current = null;
        lastArgs.current = undefined;
    }, []);

    const flush = useCallback(() => {
        if (timeout.current && lastArgs.current) {
            fnRef.current(...lastArgs.current);
            cancel();
        }
    }, [cancel]);

    const throttled = useCallback(
        (...args: Parameters<T>) => {
            const now = Date.now();

            if (!lastCallTime.current && !leading) {
                lastCallTime.current = now;
            }

            const remaining = delay - (now - (lastCallTime.current || 0));
            lastArgs.current = args;

            if (remaining <= 0 || remaining > delay) {
                if (timeout.current) {
                    clearTimeout(timeout.current);
                    timeout.current = null;
                }

                lastCallTime.current = now;
                fnRef.current(...args);
            } else if (!timeout.current && trailing) {
                timeout.current = setTimeout(() => {
                    lastCallTime.current = leading ? Date.now() : null;
                    timeout.current = null;

                    if (lastArgs.current) {
                        fnRef.current(...lastArgs.current);
                    }
                }, remaining);
            }
        },
        [delay, leading, trailing]
    );

    // Cleanup on unmount
    useEffect(() => cancel, [cancel]);

    return { throttled, cancel, flush };
}
