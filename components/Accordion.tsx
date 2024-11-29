// components/Accordion.tsx

import React, { useState } from "react";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <div
        className="cursor-pointer text-lg font-semibold text-gray-700 p-4 bg-gray-200 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
      </div>
      {isOpen && <div className="p-4 bg-gray-100 rounded-md">{children}</div>}
    </div>
  );
};

export const Accordion: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div>{children}</div>;
};
