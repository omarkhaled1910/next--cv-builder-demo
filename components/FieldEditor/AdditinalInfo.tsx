import React, { useState } from "react";
import { useCV } from "@/context/Cv";
import TextInput from "../TextInput";
import { setField } from "@/reducer/CvReducer";

const AdditinalInfo: React.FC = () => {
  const { dispatch, state } = useCV();
  const [isVisible, setIsVisible] = useState(false); // State to toggle visibility of additional fields

  const handleChange = (field: string, value: any) => {
    dispatch(setField(field as keyof typeof state, value)); // Use action creator to update the state
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible); // Toggle the visibility state
  };

  return (
    <div className="mt-6">
      <button
        onClick={toggleVisibility}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
      >
        {isVisible ? "Hide Additional Info" : "Show Additional Info"}
      </button>

      {isVisible && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Group 1 */}
          <div>
            <TextInput
              onChange={(e) => handleChange("address", e.target.value)}
              label="Address"
              value={state.address}
            />
          </div>
          <div>
            <TextInput
              onChange={(e) => handleChange("postalCode", e.target.value)}
              label="Postal Code"
              value={state.postalCode}
            />
          </div>

          {/* Group 2 */}
          <div>
            <TextInput
              onChange={(e) => handleChange("drivingLicense", e.target.value)}
              label="Driving License"
              value={state.drivingLicense}
            />
          </div>
          <div>
            <TextInput
              onChange={(e) => handleChange("nationality", e.target.value)}
              label="Nationality"
              value={state.nationality}
            />
          </div>

          {/* Group 3 */}
          <div>
            <TextInput
              onChange={(e) => handleChange("placeOfBirth", e.target.value)}
              label="Place of Birth"
              value={state.placeOfBirth}
            />
          </div>
          <div>
            <TextInput
              onChange={(e) => handleChange("dateOfBirth", e.target.value)}
              label="Date of Birth"
              value={
                state.dateOfBirth
                  ? state.dateOfBirth.toISOString().split("T")[0]
                  : ""
              }
              type="date"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdditinalInfo;
