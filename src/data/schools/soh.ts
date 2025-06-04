import { SchoolData } from '@/components/schools/SchoolPageTypes';

export const sohData: SchoolData = {
  name: "School of Health Sciences",
  shortName: "SOH",
  slug: "soh",
  heroImage: "/images/schools/sohs/School of Health Sciences04.JPG",
  tagline: "Excellence in educating and training healthcare workers for Zambia and the Southern Africa region",
  overview: "Welcome to the Levy Mwanawasa Medical University (LMMU) School of Health Sciences. The Chainama College of Health Sciences, Dental Training School, Levy Mwanawasa University Teaching Hospital and Chainama Hills Hospital have been integrated into the LMMU. The LMMU School of Health Sciences is recognized nationally and internationally for excellence in educating and training healthcare workers for Zambia and the Southern Africa region. The academic staff of the School of Health Sciences are renown for their dedication to inspiring students to prepare for careers as healthcare practitioners and researchers, and for deploying best global practices in Nutrition and Dietetics, Biomedical Sciences and other healthcare management.",
  mission: "To educate and train health professionals using hands-on and competence-based training that is administered through a distributed network of academic health complexes in order to contribute towards Universal Health Coverage in Zambia.",
  vision: "To be a center of excellence in health sciences education, research, and innovation that contributes to the advancement of healthcare in Zambia and the region.",
  director: {
    name: "Dr. Richard Kunda",
    title: "Dean – School of Health Sciences",
    qualifications: "BSc, MSc, PhD",
    imageSrc: "/images/schools/sohs/SOHS_RICHARD.png",
    message: [
      "Welcome to the School of Health Sciences at Levy Mwanawasa Medical University.",
      "Our school is committed to excellence in teaching, research, and service. We offer a range of programmes designed to prepare students for successful careers in healthcare.",
      "Our faculty members are experts in their fields and are dedicated to providing students with the knowledge and skills needed to excel in the healthcare sector."
    ]
  },
  programmes: [
    {
      id: 1,
      title: "Bachelor Of Science In Clinical Nutrition And Dietetics",
      level: "Undergraduate",
      duration: "4 Years",
      description: "Trains students in the science of nutrition and its application in health and disease management.",
      gradient: "from-blue-600 to-blue-800",
      icon: "fa-utensils",
      pattern: "dots"
    },
    {
      id: 2,
      title: "Bachelor Of Arts In General Counselling",
      level: "Undergraduate",
      duration: "4 Years",
      description: "Equips students with knowledge and skills for providing counselling services in various settings.",
      gradient: "from-purple-600 to-purple-800",
      icon: "fa-comments",
      pattern: "mesh"
    },
    {
      id: 3,
      title: "Bachelor Of Pharmacy",
      level: "Undergraduate",
      duration: "5 Years",
      description: "Prepares students for careers in pharmaceutical sciences and medication management.",
      gradient: "from-red-600 to-red-800",
      icon: "fa-pills",
      pattern: "radial"
    },
    {
      id: 4,
      title: "Bachelor Of Science In Radiography",
      level: "Undergraduate",
      duration: "4 Years",
      description: "Focuses on medical imaging techniques for diagnosis and treatment of diseases.",
      gradient: "from-teal-600 to-teal-800",
      icon: "fa-x-ray",
      pattern: "wave"
    },
    {
      id: 5,
      title: "Bachelor Of Physiotherapy",
      level: "Undergraduate",
      duration: "4 Years",
      description: "Trains students in assessment and treatment of physical dysfunction and injuries.",
      gradient: "from-green-600 to-green-800",
      icon: "fa-user-doctor",
      pattern: "zigzag"
    },
    {
      id: 6,
      title: "Bachelor Of Science In Speech And Language Therapy",
      level: "Undergraduate",
      duration: "4 Years",
      description: "Focuses on assessment and treatment of communication and swallowing disorders.",
      gradient: "from-orange-600 to-orange-800",
      icon: "fa-comment-medical",
      pattern: "bubbles"
    },
    {
      id: 7,
      title: "Diploma In Prostetics & Orthotics",
      level: "Diploma",
      duration: "3 Years",
      description: "Trains students in the design and creation of artificial limbs and supportive devices.",
      gradient: "from-indigo-500 to-indigo-700",
      icon: "fa-crutch",
      pattern: "circles"
    },
    {
      id: 8,
      title: "Diploma In General Counselling",
      level: "Diploma",
      duration: "3 Years",
      description: "Provides foundational knowledge and skills for counselling practice.",
      gradient: "from-purple-500 to-purple-700",
      icon: "fa-hand-holding-heart",
      pattern: "diagonal"
    }
  ],
  feeStructure: {
    programFees: [
      {
        programName: "Bachelor Of Science In Clinical Nutrition And Dietetics",
        tuitionFeeOnly: "K16,692",
        year1TuitionAndFees: "K19,673",
        year1RegistrationFee: "K4,918.25",
        otherYearsTuitionAndFees: "K19,317",
        otherYearsRegistrationFee: "K4,829.25"
      },
      {
        programName: "Bachelor Of Science In Radiography",
        tuitionFeeOnly: "K16,692",
        year1TuitionAndFees: "K19,673",
        year1RegistrationFee: "K4,918.25",
        otherYearsTuitionAndFees: "K19,317",
        otherYearsRegistrationFee: "K4,829.25"
      },
      {
        programName: "Bachelor Of Pharmacy",
        tuitionFeeOnly: "K16,692",
        year1TuitionAndFees: "K19,673",
        year1RegistrationFee: "K4,918.25",
        otherYearsTuitionAndFees: "K19,317",
        otherYearsRegistrationFee: "K4,829.25"
      },
      {
        programName: "Bachelor Of Physiotherapy",
        tuitionFeeOnly: "K16,692",
        year1TuitionAndFees: "K19,673",
        year1RegistrationFee: "K4,918.25",
        otherYearsTuitionAndFees: "K19,317",
        otherYearsRegistrationFee: "K4,829.25"
      },
      {
        programName: "Bachelor Of Science In Speech And Language Therapy",
        tuitionFeeOnly: "K16,692",
        year1TuitionAndFees: "K19,673",
        year1RegistrationFee: "K4,918.25",
        otherYearsTuitionAndFees: "K19,317",
        otherYearsRegistrationFee: "K4,829.25"
      },
      {
        programName: "Bachelor Of Arts In General Counselling",
        tuitionFeeOnly: "K9,725",
        year1TuitionAndFees: "K12,350",
        year1RegistrationFee: "K3087.50",
        otherYearsTuitionAndFees: "K12,350",
        otherYearsRegistrationFee: "K3087.50"
      },
      {
        programName: "Diploma In General Counselling",
        tuitionFeeOnly: "K9,725",
        year1TuitionAndFees: "K12,570",
        year1RegistrationFee: "K3,142.50",
        otherYearsTuitionAndFees: "K12,350",
        otherYearsRegistrationFee: "K3,087.50"
      },
      {
        programName: "Diploma Prostetics & Orthotics",
        tuitionFeeOnly: "K9,725",
        year1TuitionAndFees: "K12,570",
        year1RegistrationFee: "K3,142.50",
        otherYearsTuitionAndFees: "K12,350",
        otherYearsRegistrationFee: "K3,087.50"
      }
    ],
    otherFees: [
      { name: "Registration", amount: "K100" },
      { name: "Recreation", amount: "K150" },
      { name: "Medical", amount: "K100" },
      { name: "Maintenance", amount: "K200" },
      { name: "Student Guild", amount: "K200" },
      { name: "Library Services", amount: "K475" },
      { name: "Internet", amount: "K200" },
      { name: "Examination", amount: "K200" },
      { name: "Practical", amount: "K900" },
      { name: "Student ID card", amount: "K100" },
      { name: "TOTAL", amount: "K2,625" }
    ],
    indexFees: [
      { name: "GNC", amount: "K356" },
      { name: "HPCZ DEGREE", amount: "K250" },
      { name: "HPCZ DIPLOMA", amount: "K220" },
      { name: "HPCZ CERTIFICATE", amount: "K190" }
    ]
  },
  facilities: [
    {
      icon: "fa-flask",
      title: "Laboratories",
      description: "Modern laboratories for clinical skills, medical sciences, and research."
    },
    {
      icon: "fa-user-md",
      title: "Simulation Center",
      description: "Advanced simulation facilities for clinical training and practice."
    },
    {
      icon: "fa-pills",
      title: "Pharmacy",
      description: "Fully equipped pharmacy laboratory for pharmaceutical science training."
    },
    {
      icon: "fa-x-ray",
      title: "Radiography Suite",
      description: "Specialized equipment for training in medical imaging techniques."
    },
    {
      icon: "fa-book",
      title: "Resource Center",
      description: "Comprehensive library with digital and print resources for health sciences."
    },
    {
      icon: "fa-desktop",
      title: "Computer Labs",
      description: "Well-equipped computer laboratories with specialized healthcare software."
    }
  ]
};
