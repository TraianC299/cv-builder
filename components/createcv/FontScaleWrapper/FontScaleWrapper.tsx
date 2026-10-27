import A4 from "@/constants/A4";
import useWindowSize from "@/hooks/useWindowSize";
import { paginateByHeights } from "@/lib/paginateByHeights";
import useCV from "@/store/cvStore";
import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import styles from "./FontScaleWrapper.module.scss";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  color?: string;
  [x: string]: any;
}


const hiddenStyles: React.CSSProperties = { position: "fixed", left: -99999, top: 0, visibility: "hidden" }
const pageInnerHeight = A4.HEIGHT - 48
const FontScaleWrapper = ({ children, className, color: _color, ...rest }: Props) => {
  const { height, width } = useWindowSize()
  const { cvObject } = useCV()
  const [pageMap, setPageMap] = useState<number[][]>([])

  const ref = useRef<HTMLDivElement>(null)

  const recompute = React.useCallback(() => {
    if (!ref.current) return;
    const el = ref.current;
    const kids = Array.from(el?.children || []) as HTMLElement[];
    const heights = kids.map((k) => Math.ceil(k.getBoundingClientRect().height));
    const newPages = paginateByHeights(heights, pageInnerHeight);
    setPageMap(newPages)
  }, []);


  useLayoutEffect(() => {
    recompute()
  }, [cvObject])



  // useResizeObserver(ref, recompute)

  const blocks = React.useMemo(() => React.Children.toArray(children), [children]);
  // console.log(blocks)


  const scaleStyle = useMemo(() => {
    const mob = width ? width / A4.WIDTH : 1;
    const desk = height ? height / A4.HEIGHT - 0.2 : 0.8;
    return {
      "--mobile-scale": mob,
      "--desktop-scale": desk,
      "--mobile-width": `${A4.WIDTH * mob}px`,
      "--mobile-height": `${A4.HEIGHT * mob}px`,
      "--desktop-width": `${A4.WIDTH * desk}px`,
      "--desktop-height": `${A4.HEIGHT * desk}px`,
    } as React.CSSProperties;
  }, [height, width]);


  return (
    <>
      <div
        // className="fixed top-0 left-0 border-8"
        style={hiddenStyles}
      >
        <div ref={ref} {...rest} className={`${styles.container} ${className}`}>
          {blocks.map((b, i) => (<div key={`m-${i}`}>{b}</div>))}
        </div>
      </div>
      <div
        id="pages-container"
        className="flex flex-col gap-4">
        {pageMap.map((indices, pageIdx) => (
          <div className={styles.a4PageWrapper} style={scaleStyle} key={`p-${pageIdx}`}>
            <div
              className={`${styles.container} ${styles.a4Page} ${className ?? ""}`}
              id={`page-${pageIdx}`}
              {...rest}
            >
              {indices.map((i) => (
                <div key={`p-${pageIdx}-${i}`} className="contents">{blocks[i]}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};


export default FontScaleWrapper;
