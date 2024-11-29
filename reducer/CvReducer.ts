// context/cvReducer.ts

import { CVState, Employment, Skill } from "@/types";

// Define Action Types

// Action Types
export const SET_FIELD = "SET_FIELD";
export const ADD_EMPLOYMENT = "ADD_EMPLOYMENT";
export const REMOVE_EMPLOYMENT = "REMOVE_EMPLOYMENT";
export const ADD_SKILL = "ADD_SKILL";
export const REMOVE_SKILL = "REMOVE_SKILL";

// Action interfaces
interface SetFieldAction {
  type: typeof SET_FIELD;
  field: keyof CVState;
  value: any;
}

interface AddEmploymentAction {
  type: typeof ADD_EMPLOYMENT;
  employment: Employment;
}

interface RemoveEmploymentAction {
  type: typeof REMOVE_EMPLOYMENT;
  index: number;
}

interface AddSkillAction {
  type: typeof ADD_SKILL;
  skill: Skill;
}

interface RemoveSkillAction {
  type: typeof REMOVE_SKILL;
  index: number;
}

// Union type for all actions
export type CVAction =
  | SetFieldAction
  | AddEmploymentAction
  | RemoveEmploymentAction
  | AddSkillAction
  | RemoveSkillAction;

// Action creators
export const setField = (field: keyof CVState, value: any): SetFieldAction => ({
  type: SET_FIELD,
  field,
  value,
});

export const addEmployment = (employment: Employment): AddEmploymentAction => ({
  type: ADD_EMPLOYMENT,
  employment,
});

export const removeEmployment = (index: number): RemoveEmploymentAction => ({
  type: REMOVE_EMPLOYMENT,
  index,
});

export const addSkill = (skill: Skill): AddSkillAction => ({
  type: ADD_SKILL,
  skill,
});

export const removeSkill = (index: number): RemoveSkillAction => ({
  type: REMOVE_SKILL,
  index,
});

// Reducer function to update the CV state
export const cvReducer = (state: CVState, action: CVAction): CVState => {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "ADD_EMPLOYMENT":
      return {
        ...state,
        employment: [...state.employment, action.employment],
      };
    case "REMOVE_EMPLOYMENT":
      return {
        ...state,
        employment: state.employment.filter(
          (_, index) => index !== action.index
        ),
      };
    case "ADD_SKILL":
      return {
        ...state,
        skills: [...state.skills, action.skill],
      };
    case "REMOVE_SKILL":
      return {
        ...state,
        skills: state.skills.filter((_, index) => index !== action.index),
      };
    default:
      return state;
  }
};
