import type { ReactNode } from "react"


const variants = {
    border: "border border-maincolor",
    ghost: "bg-[#eef2ff]"
}
const SectionTag = ({ children, variant = "ghost" }: { children: ReactNode, variant?: "border" | "ghost" }) => {
    return (
        <span className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-sm font-medium text-maincolor ${variants[variant]}`}>
            {children}
        </span>
    )
}

export default SectionTag