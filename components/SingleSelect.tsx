// components/SingleSelect.tsx

import React from "react";

interface Option {
  label: string;
  value: number;
}

interface SingleSelectProps {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  label: string;
  error?: string;
  disabled?: boolean;
}

const SingleSelect: React.FC<SingleSelectProps> = ({
  value,
  onChange,
  options,
  label,
  error = "",
  disabled = false,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`mt-1 block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : ""
        }`}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default SingleSelect;
