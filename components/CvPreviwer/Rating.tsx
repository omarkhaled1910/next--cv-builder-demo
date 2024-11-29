import React from "react";

interface CircleRatingProps {
  value: number; // The value can be between 1 and 5
}

const CircleRating: React.FC<CircleRatingProps> = ({ value }) => {
  // Generate an array with 5 items to map over
  const circles = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div className="flex space-x-2">
      {circles.map((circle) => (
        <div
          key={circle}
          className={`w-4 h-4 rounded-full ${
            circle <= value ? "bg-black" : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

export default CircleRating;
