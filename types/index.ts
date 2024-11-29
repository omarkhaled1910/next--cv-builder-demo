export interface Skill {
  label: string;
  value: number;
}

export interface Employment {
  companyName: string;
  jobTitle: string;
  companyStartDate: Date | null;
  companyEndDate: Date | null;
  isWorkingNow: boolean;
  description: string;
}
export interface Education {
  unvName: string;
  degree: string;
  description: string;
  graduationDate: Date | null;
}
export interface Certifacte {
  certifacteName: string;
  description: string;
  finishDate: Date | null;
}
export interface CVState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  jobTitle: string;
  address: string;
  postalCode: string;
  drivingLicense: string;
  nationality: string;
  placeOfBirth: string;
  dateOfBirth: Date | null;
  summary: string;
  skills: Skill[];
  employment: Employment[];
  otherSkills1?: Skill[];
  otherSkills2?: Skill[];
  education: Education[];
  certifacte: Certifacte[];
}

export const initialCVState: CVState = {
  firstName: "John", // Placeholder name
  lastName: "Doe", // Placeholder last name
  email: "example@email.com", // Placeholder email
  phone: "+1 (555) 123-4567", // Placeholder phone number
  country: "USA", // Default country
  city: "New York", // Default city
  jobTitle: "Software Engineer", // Default job title
  address: "123 Main St.", // Default address
  postalCode: "10001", // Default postal code for New York
  drivingLicense: "Yes", // Default value assuming the person has a driving license
  nationality: "American", // Default nationality
  placeOfBirth: "New York", // Default place of birth
  dateOfBirth: null, // No default date of birth, null value
  summary: "A brief professional summary", // Default summary text
  skills: [], // Default empty array for skills
  employment: [], // Default empty array for employment
  otherSkills1: [], // Default empty array for other skills
  otherSkills2: [], // Default empty array for additional skills
  education: [], // Default empty array for education records
  certifacte: [], // Default empty array for certificates
};
