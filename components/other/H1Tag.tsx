import React from "react";

const H1Tag = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h1 className={`text-4xl font-semibold md:text-5xl ${className || ""}`}>
      {children}
    </h1>
  );
};

export default H1Tag;
