const SectionSubtitle = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => {
  return (
    <p
      className={`max-w-2xl text-sm leading-relaxed md:text-base ${className || ""}`}
    >
      {children}
    </p>
  );
};

export default SectionSubtitle;
