import React from "react";

interface DateInputProps {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const DateInput: React.FC<DateInputProps> = ({
  type,
  value,
  onChange,
  label,
}) => {
  return (
    <div className="date-input-container">
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

export default DateInput;
