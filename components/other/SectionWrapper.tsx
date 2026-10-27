import React from "react";

const SectionWrapper = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`mx-auto w-full p-4 md:px-16 md:py-20 rounded-md ${className || ""}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default SectionWrapper;
