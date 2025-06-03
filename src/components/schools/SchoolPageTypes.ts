// Types for the dynamic school page component

export type PatternType = 'radial' | 'diagonal' | 'mesh' | 'wave' | 'dots' | 'circles' | 'zigzag' | 'bubbles';

export type Programme = {
  id: number;
  title: string;
  level: string;
  duration: string;
  description: string;
  gradient: string;
  icon: string;
  pattern: PatternType;
};

export type FeeItem = {
  name: string;
  amount: string;
};

// For main programs fee table
export type ProgramFee = {
  programName: string;
  tuitionFeeOnly: string;
  year1TuitionAndFees: string;
  year1RegistrationFee: string;
  otherYearsTuitionAndFees: string;
  otherYearsRegistrationFee: string;
};

// For OTHER FEES and INDEX FEES tables
export type AdditionalFeeItem = {
  name: string;
  amount: string;
};

export type FeeStructure = {
  programFees: ProgramFee[];
  otherFees: AdditionalFeeItem[];
  indexFees: AdditionalFeeItem[];
};

export type Facility = {
  icon: string;
  title: string;
  description: string;
};

export type Director = {
  name: string;
  title: string;
  qualifications: string;
  imageSrc: string;
  message: string[];
};

export type SchoolData = {
  name: string;
  shortName: string;
  slug: string;
  heroImage: string;
  tagline: string;
  overview: string;
  mission: string;
  vision: string;
  director: Director;
  programmes: Programme[];
  feeStructure: FeeStructure;
  facilities?: Facility[];
};
