// components/TextInput.tsx

import React from "react";

interface TextInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  label?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  placeholder = "",
  className = "",
  label = "",
}) => {
  return (
    <div>
      <p>{label}</p>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out ${className}`}
      />
    </div>
  );
};

export default TextInput;
