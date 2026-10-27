import { useEffect } from "react";

function useResizeObserver(ref: React.RefObject<HTMLElement>, cb: () => void) {
    useEffect(() => {
        if (!ref.current) return;
        const ro = new ResizeObserver(() => cb());
        ro.observe(ref.current);
        return () => ro.disconnect();
    }, [ref, cb]);
}


export default useResizeObserver