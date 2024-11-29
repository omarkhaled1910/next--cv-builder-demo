import { useCV } from "@/context/Cv";
import React, { useState } from "react";
import { setField } from "@/reducer/CvReducer";
import TextInput from "../TextInput"; // Assuming this component exists
import TextEditor from "../TextEditor"; // Assuming TextEditor is implemented
import DateInput from "../DateInput";
import {
  ArrowLongUpIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { DocumentMinusIcon } from "@heroicons/react/24/solid";

interface ExperienceField {
  type: "richtext" | "text" | "date" | "checkbox"; // Field types
  name: string; // Name of the field
  label: string; // Label for the field
}

interface ExperienceHandlerProps {
  accessKey: "employment" | "certifacte" | "education";
  title: string;
  desc?: string;
  fields: ExperienceField[]; // Dynamic fields prop
  firstDisplayAcessKey: string;
  secondDisplayAcessKey: string;
}

const ExperienceHandler = ({
  accessKey,
  title,
  desc,
  fields,
  firstDisplayAcessKey,
  secondDisplayAcessKey,
}: ExperienceHandlerProps) => {
  const { dispatch, state } = useCV();
  const [expandedItems, setExpandedItems] = useState<string[]>([]); // Track expanded items
  const [editingIndex, setEditingIndex] = useState<number | null>(null); // Track which experience is being edited
  const [newExperience, setNewExperience] = useState<any>( // For new experience fields
    fields.reduce((acc, field) => {
      acc[field.name] = ""; // Initialize fields with an empty value
      return acc;
    }, {} as Record<string, any>)
  );

  const items = state[accessKey]; // Get the items based on the accessKey

  // Handle changes in the dynamic form fields for either new or edited experience
  const handleExperienceChange = (value: any, field: string) => {
    if (editingIndex !== null) {
      // Update experience in edit mode
      const updatedItems = items.map((item, index) =>
        index === editingIndex ? { ...item, [field]: value } : item
      );
      dispatch(setField(accessKey, updatedItems)); // Update state immediately
    } else {
      // Update new experience form
      setNewExperience((prev: any) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  // Handle deletion of an Experience
  const handleDelete = (itemIndex: number) => {
    const updatedItems = items.filter((_, index) => index !== itemIndex);
    dispatch(setField(accessKey, updatedItems)); // Update state after deletion
  };

  // Toggle expansion of an Experience and also handle editing
  const toggleExpandedItem = (index: string) => {
    if (expandedItems.includes(index)) {
      // Collapse item and reset edit index
      setExpandedItems((prev) => prev.filter((item) => item !== index));
      setEditingIndex(null); // Clear editing state when collapsing
    } else {
      // Expand item and set it as being edited
      setExpandedItems([index]); // Ensure only one item is expanded at a time
      setEditingIndex(Number(index)); // Set the editing index
    }
  };

  // Render different field types dynamically
  const renderField = (field: ExperienceField, index: number) => {
    const value =
      editingIndex !== null && index === editingIndex
        ? items[editingIndex]?.[field.name] || ""
        : newExperience[field.name];

    switch (field.type) {
      case "richtext":
        return (
          <TextEditor
            setContent={(value: any) =>
              handleExperienceChange(value, field.name)
            }
            content={value}
          />
        );
      case "text":
        return (
          <TextInput
            value={value}
            onChange={(e) => handleExperienceChange(e.target.value, field.name)}
            label={field.label}
          />
        );
      case "date":
        return (
          <DateInput
            type="date"
            value={value}
            onChange={(e) => handleExperienceChange(e.target.value, field.name)}
            label={field.label}
          />
        );
      case "checkbox":
        return (
          <div>
            <input
              type="checkbox"
              checked={value}
              onChange={(e) =>
                handleExperienceChange(e.target.checked, field.name)
              }
            />
            <span>{field.label}</span>
          </div>
        );
      default:
        return null;
    }
  };

  // Add new experience to the state
  const handleAddNewExperience = () => {
    const updatedItems = [...items, newExperience];
    dispatch(setField(accessKey, updatedItems)); // Add new experience to state

    // Hide the new experience form after saving
    setExpandedItems([]); // Or set a new state variable to hide the form

    setNewExperience(
      fields.reduce((acc, field) => {
        // Reset new experience form
        acc[field.name] = "";
        return acc;
      }, {} as Record<string, any>)
    );
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <span>
            {" "}
            <ExclamationCircleIcon className=" size-6 " />
          </span>
          <div className="text-xl font-semibold">{title}</div>
        </div>
        <div>
          <DocumentMinusIcon className="size-6" />
        </div>
      </div>

      {desc && (
        <div>
          <p className=" text-gray-400">{desc}</p>
        </div>
      )}

      <br />
      <div className="flex flex-col gap-8">
        {/* Display existing experiences */}
        {items.map((item, index) => (
          <div key={index} className="items-center flex-col">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold">
                  {item?.[firstDisplayAcessKey]}
                </div>
                <div>{item?.[secondDisplayAcessKey]}</div>
              </div>

              <div className="flex items-center gap-4">
                <button onClick={() => handleDelete(index)}>
                  <span className="text-red-500">
                    <TrashIcon className="size-6" />
                  </span>
                </button>

                <button onClick={() => toggleExpandedItem(index.toString())}>
                  <span>
                    <ArrowLongUpIcon className=" size-6 " />
                  </span>
                </button>
              </div>
            </div>

            {/* Accordion Section */}
            {expandedItems.includes(index.toString()) &&
              editingIndex === index && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {fields.map((field, fieldIndex) => (
                    <div key={fieldIndex} className="w-full">
                      {renderField(field, index)}{" "}
                      {/* Render the field for the current item */}
                    </div>
                  ))}
                </div>
              )}
          </div>
        ))}

        {/* Form for adding new experience */}
        {expandedItems.includes("new") && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map((field, index) => (
              <div key={index} className="w-full">
                {renderField(field, -1)} {/* -1 indicates new experience */}
              </div>
            ))}
          </div>
        )}

        {/* Button to add new experience */}
        {expandedItems.includes("new") && (
          <button
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
            onClick={handleAddNewExperience} // Save new experience
          >
            Save New {title}
          </button>
        )}

        {/* Button to Show New Experience Fields */}
        {!expandedItems.length && !editingIndex && (
          <button
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md flex items-center justify-center gap-3"
            onClick={() => setExpandedItems(["new"])} // Show new experience form
          >
            <PlusCircleIcon className=" size-6 " /> Add New {title}
          </button>
        )}
      </div>
      <div className="my-8 border-t border-gray-300"></div>
    </div>
  );
};

export default ExperienceHandler;
