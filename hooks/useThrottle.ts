import { useRef, useCallback, useEffect } from 'react';

/**
 * Creates a throttled version of a function that limits how often it can be called.
 * @param callback The function to throttle.
 * @param delay The time in milliseconds to wait before allowing another call.
 * @returns A throttled function and a function to cancel any pending execution.
 */
export function useThrottle<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
) {
  // Use a ref to store the last time the function was executed
  const lastExecuted = useRef(0);
  // Use a ref to store the timeout ID to clear it later
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // The throttled function
  const throttledFunction = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      const timeSinceLastExecution = now - lastExecuted.current;
      const remainingTime = delay - timeSinceLastExecution;

      // If enough time has passed, execute immediately
      if (remainingTime <= 0) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        lastExecuted.current = now;
        callback(...args);
      } else if (!timeoutRef.current) {
        // Otherwise, set a timeout to execute after the remaining time
        timeoutRef.current = setTimeout(() => {
          lastExecuted.current = Date.now();
          callback(...args);
          timeoutRef.current = null; // Clear the reference after execution
        }, remainingTime);
      }
    },
    [callback, delay]
  );

  // Function to cancel any pending throttled execution
  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);
  
  // Cleanup the timeout when the component unmounts
  useEffect(() => {
    return cancel;
  }, [cancel]);

  return { throttledFunction, cancel };
}