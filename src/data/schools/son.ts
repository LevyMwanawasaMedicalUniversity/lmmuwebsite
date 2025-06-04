import { SchoolData } from '@/components/schools/SchoolPageTypes';

export const sonData: SchoolData = {
  name: "School of Nursing",
  shortName: "SON",
  slug: "son",
  heroImage: "/images/schools/son/son-banner.jpg",
  tagline: "Excellence in nursing education and practice",
  overview: "The Levy Mwanawasa Medical University School of Nursing is dedicated to educating and training competent nursing professionals who are prepared to meet the healthcare needs of individuals, families, and communities in Zambia and beyond. Our programs emphasize evidence-based practice, critical thinking, and compassionate care.",
  mission: "To educate and train nursing professionals using hands-on and competence-based training that is administered through a distributed network of academic health complexes in order to contribute towards Universal Health Coverage in Zambia.",
  vision: "To be a center of excellence in nursing education, research, and innovation that contributes to the advancement of healthcare in Zambia and the region.",
  director: {
    name: "Dr. Lonia Mwape",
    title: "Dean – School of Nursing",
    qualifications: "BSc, MSc, PhD",
    imageSrc: "/images/schools/son/lonia.png",
    message: [
      "Welcome to the School of Nursing at Levy Mwanawasa Medical University.",
      "Our school is committed to excellence in nursing education, research, and service. We offer a range of programmes designed to prepare students for successful careers in nursing and healthcare.",
      "Our faculty members are experts in their fields and are dedicated to providing students with the knowledge and skills needed to excel in the nursing profession."
    ]
  },
  programmes: [
    {
      id: 1,
      title: "Bachelor of Science in Nursing",
      level: "Degree",
      duration: "4 Years",
      description: "A comprehensive nursing program that prepares students for careers as professional nurses with training in patient care, health promotion, and disease prevention.",
      gradient: "from-blue-500 to-blue-700",
      icon: "fa-user-nurse",
      pattern: "diagonal"
    },
    {
      id: 2,
      title: "Bachelor of Science in Ophthalmic Nursing",
      level: "Degree",
      duration: "4 Years",
      description: "A specialized nursing program focused on eye care, preparing students for careers in ophthalmic nursing with skills in diagnosis, prevention, and treatment of eye conditions.",
      gradient: "from-green-500 to-green-700",
      icon: "fa-eye",
      pattern: "radial"
    },
    {
      id: 3,
      title: "Bachelor of Science in Mental Health Nursing",
      level: "Degree",
      duration: "4 Years",
      description: "A program that trains students in mental health assessment, diagnosis, and treatment, preparing them for careers in psychiatric and mental health nursing.",
      gradient: "from-purple-500 to-purple-700",
      icon: "fa-brain",
      pattern: "mesh"
    },
    {
      id: 4,
      title: "Bachelor of Science in Public Health Nursing",
      level: "Degree",
      duration: "4 Years",
      description: "A program focused on community health, disease prevention, and health promotion, preparing students for careers in public health nursing.",
      gradient: "from-red-500 to-red-700",
      icon: "fa-heartbeat",
      pattern: "wave"
    },
    {
      id: 5,
      title: "Advanced Diploma In Ophthalmic Nursing",
      level: "Advanced Diploma",
      duration: "2 Years",
      description: "An advanced program for training in ophthalmic nursing and eye care procedures.",
      gradient: "from-teal-400 to-teal-600",
      icon: "fa-eye",
      pattern: "circles"
    },
    {
      id: 6,
      title: "Diploma In Registered Nursing",
      level: "Diploma",
      duration: "3 Years",
      description: "A program that provides training in general nursing care and patient management.",
      gradient: "from-yellow-400 to-yellow-600",
      icon: "fa-user-nurse",
      pattern: "dots"
    },
    {
      id: 7,
      title: "Diploma In Midwifery",
      level: "Diploma",
      duration: "3 Years",
      description: "A program focused on maternal and newborn care, preparing students for careers in midwifery.",
      gradient: "from-pink-400 to-pink-600",
      icon: "fa-baby",
      pattern: "zigzag"
    },
    {
      id: 8,
      title: "Certificate In Nursing Assistant",
      level: "Certificate",
      duration: "1 Year",
      description: "A program that provides basic training in nursing assistance and patient care.",
      gradient: "from-blue-400 to-blue-600",
      icon: "fa-hand-holding-medical",
      pattern: "bubbles"
    }
  ],
  feeStructure: {
    programFees: [
      {
        programName: "Bachelor of Science in Nursing",
        tuitionFeeOnly: "K16,692",
        year1TuitionAndFees: "K19,673",
        year1RegistrationFee: "K4,918.25",
        otherYearsTuitionAndFees: "K19,317",
        otherYearsRegistrationFee: "K4,829.25"
      },
      {
        programName: "Bachelor of Science in Ophthalmic Nursing",
        tuitionFeeOnly: "K16,692",
        year1TuitionAndFees: "K19,673",
        year1RegistrationFee: "K4,918.25",
        otherYearsTuitionAndFees: "K19,317",
        otherYearsRegistrationFee: "K4,829.25"
      },
      {
        programName: "Bachelor of Science in Mental Health Nursing",
        tuitionFeeOnly: "K16,692",
        year1TuitionAndFees: "K19,673",
        year1RegistrationFee: "K4,918.25",
        otherYearsTuitionAndFees: "K19,317",
        otherYearsRegistrationFee: "K4,829.25"
      },
      {
        programName: "Bachelor of Science in Public Health Nursing",
        tuitionFeeOnly: "K13,825",
        year1TuitionAndFees: "K16,806",
        year1RegistrationFee: "K4,201.50",
        otherYearsTuitionAndFees: "K16,450",
        otherYearsRegistrationFee: "K4,112.50"
      },
      {
        programName: "Advanced Diploma In Ophthalmic Nursing",
        tuitionFeeOnly: "K11,725",
        year1TuitionAndFees: "K14,570",
        year1RegistrationFee: "K3,642.50",
        otherYearsTuitionAndFees: "K14,350",
        otherYearsRegistrationFee: "K3,587.50"
      },
      {
        programName: "Diploma in Midwifery",
        tuitionFeeOnly: "K9,725",
        year1TuitionAndFees: "K12,570",
        year1RegistrationFee: "K3,142.50",
        otherYearsTuitionAndFees: "K12,350",
        otherYearsRegistrationFee: "K3,087.50"
      },
      {
        programName: "Diploma in Public Health Nursing",
        tuitionFeeOnly: "K9,725",
        year1TuitionAndFees: "K12,570",
        year1RegistrationFee: "K3,142.50",
        otherYearsTuitionAndFees: "K12,350",
        otherYearsRegistrationFee: "K3,087.50"
      },
      {
        programName: "Diploma In Mental Health Nursing",
        tuitionFeeOnly: "K9,725",
        year1TuitionAndFees: "K12,570",
        year1RegistrationFee: "K3,142.50",
        otherYearsTuitionAndFees: "K12,350",
        otherYearsRegistrationFee: "K3,087.50"
      },
      {
        programName: "Diploma In Registered Nursing",
        tuitionFeeOnly: "K9,725",
        year1TuitionAndFees: "K12,570",
        year1RegistrationFee: "K3,142.50",
        otherYearsTuitionAndFees: "K12,350",
        otherYearsRegistrationFee: "K3,087.50"
      },
      {
        programName: "Diploma Oncology Nursing",
        tuitionFeeOnly: "K9,725",
        year1TuitionAndFees: "K12,570",
        year1RegistrationFee: "K3,142.50",
        otherYearsTuitionAndFees: "K12,350",
        otherYearsRegistrationFee: "K3,087.50"
      }
    ],
    otherFees: [
      {
        name: "Registration",
        amount: "K100"
      },
      {
        name: "Recreation",
        amount: "K150"
      },
      {
        name: "Medical",
        amount: "K100"
      },
      {
        name: "Maintenance",
        amount: "K200"
      },
      {
        name: "Student Guild",
        amount: "K200"
      },
      {
        name: "Library Services",
        amount: "K475"
      },
      {
        name: "Internet",
        amount: "K200"
      },
      {
        name: "Examination",
        amount: "K200"
      },
      {
        name: "Practical",
        amount: "K900"
      },
      {
        name: "Student ID card",
        amount: "K100"
      }
    ],
    indexFees: [
      {
        name: "GNC",
        amount: "K356"
      },
      {
        name: "HPCZ DEGREE",
        amount: "K250"
      },
      {
        name: "HPCZ DIPLOMA",
        amount: "K220"
      },
      {
        name: "HPCZ CERTIFICATE",
        amount: "K190"
      }
    ]
  }
};
