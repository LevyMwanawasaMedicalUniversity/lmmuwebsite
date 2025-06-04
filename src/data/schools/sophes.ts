import { SchoolData } from "@/components/schools/SchoolPageTypes";

export const sophesData: SchoolData = {
  name: "School of Public Health and Environmental Sciences",
  shortName: "SOPHES",
  slug: "sophes",
  heroImage: "/images/schools/sophes/students.jpg",
  tagline: "Addressing public health challenges through education, research, and community engagement",
  overview: "Welcome to the Levy Mwanawasa Medical University (LMMU) School of Public Health and Environmental Sciences. The Chainama College of Health Sciences, Dental Training School, Levy Mwanawasa University Teaching Hospital and Chainama Hills Hospital have been integrated into the LMMU. The LMMU School of Public Health and Environmental Sciences is recognized nationally and internationally for excellence in educating and training healthcare workers for Zambia and the Southern Africa region. The academic staff of the School of Public Health and Environmental Sciences are renown for their dedication to inspiring students to prepare for careers as Environmental Technologist and to be part of the halthcare practitioners and researchers, and for deploying best global practices in Environmental Management and Public Health.",
  mission: "To improve population health through innovative education, research, and community engagement that addresses pressing public health challenges in Zambia and beyond.",
  vision: "To be a leading center of excellence in public health education, research, and practice in Africa, contributing to healthier communities and sustainable environments.",
  director: {
    name: "Prof. Victor Mukonka",
    title: "Dean – School of Public Health and Environmental Sciences",
    qualifications: "MB ChB, MPH, PhD",
    imageSrc: "/images/schools/sophes/SOPHES.png",
    message: [
      "Welcome to the School of Public Health and Environmental Sciences at Levy Mwanawasa Medical University.",
      "Our school is dedicated to addressing the complex public health challenges facing our communities through innovative education, research, and community engagement.",
      "We are committed to training the next generation of public health professionals who will lead efforts to improve health outcomes and create sustainable environments for all."
    ]
  },
  programmes: [
    {
      id: 1,
      title: "Bachelor of Science in Public Health",
      level: "Degree",
      duration: "4 Years",
      description: "A comprehensive program focusing on public health principles, disease prevention, and health promotion strategies.",
      gradient: "from-blue-500 to-blue-700",
      icon: "fa-heartbeat",
      pattern: "diagonal"
    },
    {
      id: 2,
      title: "Bachelor of Science in Public Health Nutrition",
      level: "Degree",
      duration: "4 Years",
      description: "A program focused on nutrition science and its application to public health challenges and interventions.",
      gradient: "from-green-500 to-green-700",
      icon: "fa-apple-alt",
      pattern: "radial"
    },
    {
      id: 3,
      title: "Bachelor of Science in Environmental Health",
      level: "Degree",
      duration: "4 Years",
      description: "A program that trains students in environmental factors affecting human health and strategies for environmental protection.",
      gradient: "from-teal-500 to-teal-700",
      icon: "fa-leaf",
      pattern: "mesh"
    },
    {
      id: 4,
      title: "Diploma in Environmental Health",
      level: "Diploma",
      duration: "3 Years",
      description: "A program that provides training in environmental health assessment, management, and protection.",
      gradient: "from-cyan-400 to-cyan-600",
      icon: "fa-tree",
      pattern: "wave"
    },
    {
      id: 5,
      title: "Diploma in Public Health",
      level: "Diploma",
      duration: "3 Years",
      description: "A program focused on public health practice, disease prevention, and health promotion.",
      gradient: "from-blue-400 to-blue-600",
      icon: "fa-stethoscope",
      pattern: "dots"
    },
    {
      id: 6,
      title: "Certificate HIV Community Health Workers",
      level: "Certificate",
      duration: "1 Year",
      description: "A program that trains community health workers in HIV prevention, care, and support services.",
      gradient: "from-red-400 to-red-600",
      icon: "fa-ribbon",
      pattern: "circles"
    }
  ],
  feeStructure: {
    programFees: [
      {
        programName: "Bachelor of Science in Environmental Health",
        tuitionFeeOnly: "K13,825",
        year1TuitionAndFees: "K16,700",
        year1RegistrationFee: "K4,175",
        otherYearsTuitionAndFees: "K16,450",
        otherYearsRegistrationFee: "K4,112.50"
      },
      {
        programName: "Bachelor of Science in Public Health",
        tuitionFeeOnly: "K13,825",
        year1TuitionAndFees: "K16,700",
        year1RegistrationFee: "K4,175",
        otherYearsTuitionAndFees: "K16,450",
        otherYearsRegistrationFee: "K4,112.50"
      },
      {
        programName: "Bachelor of Science in Public Health Nutrition",
        tuitionFeeOnly: "K13,825",
        year1TuitionAndFees: "K16,700",
        year1RegistrationFee: "K4,175",
        otherYearsTuitionAndFees: "K16,450",
        otherYearsRegistrationFee: "K4,112.50"
      },
      {
        programName: "Diploma in Public Health",
        tuitionFeeOnly: "K9,725",
        year1TuitionAndFees: "K12,570",
        year1RegistrationFee: "K3,142.50",
        otherYearsTuitionAndFees: "K12,350",
        otherYearsRegistrationFee: "K3,087.50"
      },
      {
        programName: "Diploma in Environmental Health",
        tuitionFeeOnly: "K9,725",
        year1TuitionAndFees: "K12,570",
        year1RegistrationFee: "K3,142.50",
        otherYearsTuitionAndFees: "K12,350",
        otherYearsRegistrationFee: "K3,087.50"
      },
      {
        programName: "Certificate HIV Community Health Workers",
        tuitionFeeOnly: "K5,225",
        year1TuitionAndFees: "K8,040",
        year1RegistrationFee: "K2,010",
        otherYearsTuitionAndFees: "K8,040",
        otherYearsRegistrationFee: "K2,010"
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

export default sophesData;
