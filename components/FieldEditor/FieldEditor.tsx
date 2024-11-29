import React from "react";
import TextInput from "../TextInput";
import { useCV } from "@/context/Cv";
import { setField } from "@/reducer/CvReducer";
import AdditinalInfo from "./AdditinalInfo";
import TextEditor from "../TextEditor";
import SkillHandler from "./SkillHandler";
import ExprienceHandler from "./ExprienceHanlder";
import ExperienceHandler from "./ExprienceHanlder";

const FieldEditor = () => {
  const { dispatch, state } = useCV();

  const handleChange = (field: string, value: any) => {
    dispatch(setField(field as keyof typeof state, value)); // Use the action creator
  };

  return (
    <div className=" bg-white p-12 h-[100vh] overflow-auto flex-1">
      <h2 className="text-xl font-semibold"> Personal Details</h2>

      <div className=" flex gap-4 my-4">
        <TextInput
          onChange={(e) => handleChange("firstName", e.target.value)}
          label="First Name"
          value={state.firstName}
        />
        <TextInput
          onChange={(e) => handleChange("lastName", e.target.value)}
          label="Last Name"
          value={state.lastName}
        />
      </div>

      <div className=" flex">
        <TextInput
          onChange={(e) => handleChange("jobTitle", e.target.value)}
          label="Job Title"
          value={state.jobTitle}
        />
      </div>
      <AdditinalInfo />
      <br />

      <div>
        <h3 className="text-xl font-semibold">Summary</h3>
        <br />
        <TextEditor
          setContent={(value: string) => handleChange("summary", value)}
          content={state.summary}
        />
      </div>
      <br />
      <SkillHandler
        accessKey={"skills"}
        title={"Techenical Skills"}
        desc={"select  5 relevant skills that align with your job "}
      />
      <br />

      <ExperienceHandler
        firstDisplayAcessKey="companyName"
        secondDisplayAcessKey="jobTitle"
        accessKey="employment"
        title="Work Experience"
        desc="Your past employment details"
        fields={[
          {
            type: "text",
            name: "companyName",
            label: "Comapny Name",
          },
          {
            type: "text",
            name: "jobTitle",
            label: "Job  Title",
          },
          {
            type: "date",
            name: "companyStartDate",
            label: "Start Date",
          },
          {
            type: "date",
            name: "companyEndDate",
            label: "End Date",
          },

          {
            type: "richtext",
            name: "description",
            label: "Description",
          },
          {
            type: "checkbox",
            name: "isWorkingNow",
            label: "Currently Working There",
          },
        ]}
      />
      <br />

      <ExperienceHandler
        firstDisplayAcessKey="certifacteName"
        secondDisplayAcessKey=""
        accessKey="certifacte"
        title="Certifactes"
        fields={[
          {
            type: "richtext",
            name: "description",
            label: "Description",
          },
          {
            type: "text",
            name: "certifacteName",
            label: "Certifacte Name",
          },
          {
            type: "date",
            name: "finishDate",
            label: "End Date",
          },
        ]}
      />
      <br />
      <ExperienceHandler
        firstDisplayAcessKey="degree"
        secondDisplayAcessKey="unvName"
        accessKey="education"
        title="Eduactions"
        fields={[
          {
            type: "text",
            name: "unvName",
            label: "Unvirsity Name",
          },
          {
            type: "text",
            name: "degree",
            label: "Degree",
          },
          {
            type: "date",
            name: "graduationDate",
            label: "End Date",
          },
          {
            type: "richtext",
            name: "description",
            label: "Description",
          },
        ]}
      />
    </div>
  );
};

export default FieldEditor;
