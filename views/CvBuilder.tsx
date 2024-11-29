"use client";
import CvPreviwer from "@/components/CvPreviwer/CvPreviwer";
import FieldEditor from "@/components/FieldEditor/FieldEditor";
import { CVProvider, useCV } from "@/context/Cv";
import React from "react";

const CvBuilder = () => {
  return (
    <div className="  bg-slate-600 flex">
      <CVProvider>
        <FieldEditor />
        <CvPreviwer />
      </CVProvider>
    </div>
  );
};

export default CvBuilder;
