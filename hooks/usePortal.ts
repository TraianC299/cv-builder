import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
interface PortalProps {
    children: ReactNode;
    id: string;
  }
const usePortal = (el:HTMLElement) => {
    const Portal = ({ children }: PortalProps) => {
        const ref = useRef<Element | null>(null);
        const [mounted, setMounted] = useState(false);
      
        useEffect(() => {
          ref.current = el
          setMounted(true);
        }, []);
      
        return mounted && ref.current ? createPortal(children, ref.current): null;
      };
      
      return Portal;
  };

  export default usePortal;