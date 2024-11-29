import { useCV } from "@/context/Cv";
import React, { useState } from "react";
import { setField } from "@/reducer/CvReducer";
import TextInput from "../TextInput"; // Assuming this component exists
import SingleSelect from "../SingleSelect"; // Assuming SingleSelect is implemented

export const skillsLvls = [
  { label: "Beginner", value: 1 },
  { label: "Intermediate", value: 2 },
  { label: "Advanced", value: 3 },
  { label: "Expert", value: 4 },
  { label: "Master", value: 5 },
];

const SkillHandler = ({
  accessKey, // Renamed key to accessKey
  title,
  desc,
}: {
  accessKey: "skills"; // Renamed key to accessKey
  title: string;
  desc: string;
}) => {
  const { dispatch, state } = useCV();
  const [expandedItems, setExpandedItems] = useState<string[]>([]); // Track which items are expanded
  const [showNewFields, setShowNewFields] = useState(false); // State to handle showing the new fields for adding a skill

  // State for managing the new skill's title and level
  const [newSkillTitle, setNewSkillTitle] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState(1);

  const items = state[accessKey]; // Get the items based on the accessKey

  // Handle skill changes for existing skills (both name and level)
  const handleSkillChange = (itemIndex: number, field: string, value: any) => {
    const updatedItems = [...items];
    if (field === "title") {
      updatedItems[itemIndex].label = value; // Update skill name (label)
    } else if (field === "level") {
      updatedItems[itemIndex].value = value; // Update skill level (value)
    }
    dispatch(setField(accessKey, updatedItems)); // Update state with the new items
  };

  // Handle deletion of skill
  const handleDelete = (itemIndex: number) => {
    const updatedItems = items.filter((_, index) => index !== itemIndex);
    dispatch(setField(accessKey, updatedItems)); // Update state with the remaining items
  };

  // Add a new skill with default values
  const handleAddNewSkill = () => {
    const newSkill = { label: newSkillTitle, value: newSkillLevel }; // New skill with title and level
    const updatedItems = [...items, newSkill];
    dispatch(setField(accessKey, updatedItems)); // Update the state with the new skill
    setShowNewFields(false); // Hide the input fields after adding
    setNewSkillTitle(""); // Reset title input
    setNewSkillLevel(1); // Reset level input to default
  };

  // Toggle expansion of a skill
  const toggleExpandedItem = (index: string) => {
    setExpandedItems((prevExpandedItems) => {
      if (prevExpandedItems.includes(index)) {
        // If the item is already expanded, collapse it
        return prevExpandedItems.filter((item) => item !== index);
      } else {
        // If the item is not expanded, expand it
        return [...prevExpandedItems, index];
      }
    });
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <span>Drag</span>
          <div className="text-xl font-semibold">{title}</div>
        </div>
        <div>Three dots</div>
      </div>

      <div>
        <p className=" text-gray-400">{desc}</p>
      </div>

      <div className="flex flex-col gap-8">
        {items.map((item, index) => (
          <div key={index} className="items-center flex-col">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold">{item.label}</div>
                <div>{item.value}</div>
              </div>

              {/* Delete & Accordion Icons */}
              <div className="flex items-center gap-4">
                <button onClick={() => handleDelete(index)}>
                  <span className="text-red-500">Delete</span>{" "}
                  {/* Use an icon here */}
                </button>

                <button onClick={() => toggleExpandedItem(index.toString())}>
                  <span>Accordion</span> {/* Use an accordion icon here */}
                </button>
              </div>
            </div>

            {/* Accordion Section */}
            {expandedItems.includes(index.toString()) && (
              <div className="flex gap-4 mt-4">
                {/* Text Input for Skill Name */}
                <TextInput
                  value={item.label}
                  onChange={(e) =>
                    handleSkillChange(index, "title", e.target.value)
                  } // Update skill name (label)
                  label="Skill Name"
                />

                {/* Select for Skill Level */}
                <SingleSelect
                  value={item.value}
                  onChange={(e) =>
                    handleSkillChange(index, "level", e.target.value)
                  } // Update skill level (value)
                  options={skillsLvls}
                  label="Skill Level"
                />
              </div>
            )}
          </div>
        ))}

        {/* New Skill Input Fields (text input and select) */}
        {showNewFields && (
          <div className="flex justify-between gap-4 mt-4 items-center">
            {/* Text Input for New Skill Name */}
            <TextInput
              value={newSkillTitle}
              onChange={(e) => setNewSkillTitle(e.target.value)} // Update title state
              label="New Skill Name"
            />

            {/* Select for New Skill Level */}
            <SingleSelect
              value={newSkillLevel}
              onChange={(e) => setNewSkillLevel(Number(e.target.value))} // Update level state
              options={skillsLvls}
              label="Skill Level"
            />

            {/* Button to Save New Skill */}
            <button
              className="bg-blue-500 text-white px-4 h-8 rounded-md"
              onClick={handleAddNewSkill} // Add new skill to the list
            >
              Save Skill
            </button>
          </div>
        )}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
          onClick={() => setShowNewFields(true)} // Show the new fields when clicked
        >
          Add New Skill
        </button>
      </div>
    </div>
  );
};

export default SkillHandler;
