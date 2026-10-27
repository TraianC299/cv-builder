import { cn } from "@/lib/utils";
import * as React from "react";

const AutoHeightTextarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  const innerRef = React.useRef<HTMLTextAreaElement>(null);
  const resolvedRef = (ref as React.RefObject<HTMLTextAreaElement>) || innerRef;

  React.useEffect(() => {
    const el = resolvedRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [props.value, resolvedRef]);

  return (
    <textarea
      className={cn(
        "flex min-h-[60px] w-full rounded-md bg-lightgrey px-3 py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-blackgrey focus-visible:border focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none overflow-hidden",
        className,
      )}
      ref={resolvedRef}
      {...props}
    />
  );
});
AutoHeightTextarea.displayName = "AutoHeightTextarea";

export { AutoHeightTextarea };
