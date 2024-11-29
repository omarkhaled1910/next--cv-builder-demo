// context/CVContext.tsx

import { cvReducer } from "@/reducer/CvReducer";
import { CVState, initialCVState } from "@/types";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";

// Create context
const CVContext = createContext<
  { state: CVState; dispatch: React.Dispatch<any> } | undefined
>(undefined);

// Create a provider component to wrap the app and provide access to context
export const CVProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(cvReducer, initialCVState);

  return (
    <CVContext.Provider value={{ state, dispatch }}>
      {children}
    </CVContext.Provider>
  );
};

// Custom hook to use the context
export const useCV = () => {
  const context = useContext(CVContext);
  if (!context) {
    throw new Error("useCV must be used within a CVProvider");
  }
  return context;
};
