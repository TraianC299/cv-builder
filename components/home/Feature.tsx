import React from "react";

type FeatureProps = {
  title: string;
  description: string;
  svg: React.ReactNode;
};

const Feature: React.FC<FeatureProps> = ({ title, description, svg }) => {
  return (
    <article className="group relative overflow-hidden flex flex-col gap-2 bg-white transition-all duration-300 hover:-translate-y-1.5 sm:flex-row md:gap-4">
      <div className="grid h-12 w-12 min-w-12 place-items-center rounded-xl bg-[#eef2ff] text-maincolor transition-all duration-300 group-hover:bg-maincolor group-hover:text-white">
        {svg}
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-semibold tracking-tight text-blackgrey">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-grey">
          {description}
        </p>
      </div>
    </article>
  );
};

export default Feature;
