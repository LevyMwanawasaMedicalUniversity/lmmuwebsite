import { SchoolData } from '@/components/schools/SchoolPageTypes';

export const ibbsData: SchoolData = {
  name: "Institute of Basic and Biomedical Sciences",
  shortName: "IBBS",
  slug: "ibbs",
  heroImage: "/images/schools/ibbs/ibbs-banner.jpg",
  tagline: "Advancing knowledge in basic and biomedical sciences through innovative research and education",
  overview: "The Institute of Basic and Biomedical Sciences (IBBS) at Levy Mwanawasa Medical University is a center of excellence dedicated to advancing knowledge in basic and biomedical sciences through cutting-edge research and world-class education. Our programmes combine theoretical knowledge with practical laboratory experience, preparing students for successful careers in research, healthcare, and related industries. With state-of-the-art facilities and expert faculty, we provide a stimulating environment for scientific discovery and innovation.",
  mission: "To provide high-quality education and conduct innovative research in basic and biomedical sciences that contributes to the advancement of knowledge, addresses local health challenges, and improves health outcomes in Zambia and beyond.",
  vision: "To be a leading institute for basic and biomedical sciences education and research in Africa, recognized globally for its contribution to scientific knowledge, innovation, and the development of solutions to pressing health challenges.",
  director: {
    name: "Dr. Mable Mutengo",
    title: "Director – Institute of Basic & Biomedical Sciences",
    qualifications: "BSc, MSc, PhD",
    imageSrc: "/images/schools/ibbs/mable-ibbs.png",
    message: [
      "Welcome to the Levy Mwanawasa Medical University (LMMU) Institute of Basic and Biomedical Sciences.",
      "The Chainama College of Health Sciences, Dental Training School, Levy Mwanawasa University Teaching Hospital and Chainama Hills Hospital have been integrated into the LMMU. The LMMU Institute of Basic and Biomedical Sciences is recognized nationally and internationally for excellence in educating and training healthcare workers for Zambia and the Southern Africa region.",
      "The academic staff of the Institute of Basic and Biomedical Sciences are renowned for their dedication to inspiring students to prepare for careers as healthcare practitioners and researchers, and for deploying best global practices in nursing and healthcare management."
    ]
  },
  programmes: [
    {
      id: 1,
      title: "Bachelor of Science in Biomedical Sciences",
      level: "Undergraduate",
      duration: "4 Years",
      description: "A comprehensive programme that provides a strong foundation in the basic sciences that underpin medicine and healthcare.",
      gradient: "from-red-600 to-red-800",
      icon: "fa-dna",
      pattern: "mesh"
    },
    {
      id: 2,
      title: "Bachelor of Science in Medical Laboratory Sciences",
      level: "Undergraduate",
      duration: "4 Years",
      description: "Trains students in laboratory techniques for diagnosis, treatment, and prevention of disease.",
      gradient: "from-purple-600 to-purple-800",
      icon: "fa-microscope",
      pattern: "dots"
    },
    {
      id: 3,
      title: "Bachelor of Science in Human Nutrition",
      level: "Undergraduate",
      duration: "4 Years",
      description: "Focuses on the science of nutrition and its application to human health and disease prevention.",
      gradient: "from-green-600 to-green-800",
      icon: "fa-apple-whole",
      pattern: "wave"
    },
    {
      id: 4,
      title: "Bachelor of Science in Biochemistry",
      level: "Undergraduate",
      duration: "4 Years",
      description: "Studies the chemical processes and substances that occur within living organisms.",
      gradient: "from-blue-600 to-blue-800",
      icon: "fa-flask",
      pattern: "radial"
    },
    {
      id: 5,
      title: "Diploma in Biomedical Sciences",
      level: "Diploma",
      duration: "3 Years",
      description: "Provides foundational knowledge and skills in the basic sciences that underpin medicine and healthcare.",
      gradient: "from-red-500 to-red-700",
      icon: "fa-vial",
      pattern: "circles"
    },
    {
      id: 6,
      title: "Diploma in Medical Laboratory Sciences",
      level: "Diploma",
      duration: "3 Years",
      description: "Provides training in laboratory techniques for diagnosis, treatment, and prevention of disease.",
      gradient: "from-purple-500 to-purple-700",
      icon: "fa-microscope",
      pattern: "diagonal"
    }
  ],
  feeStructure: {
    programFees: [
      {
        programName: "Bachelor of Science in Biomedical Sciences",
        tuitionFeeOnly: "K19,525",
        year1TuitionAndFees: "K22,400",
        year1RegistrationFee: "K5,600",
        otherYearsTuitionAndFees: "K22,150",
        otherYearsRegistrationFee: "K5,537.5"
      },
      {
        programName: "Diploma in Biomedical Sciences",
        tuitionFeeOnly: "K11,725",
        year1TuitionAndFees: "K14,570",
        year1RegistrationFee: "K3,642.5",
        otherYearsTuitionAndFees: "K14,350",
        otherYearsRegistrationFee: "K3,587.5"
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
      { name: "Student ID card", amount: "K100" }
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
      title: "Research Laboratories",
      description: "State-of-the-art laboratories for research in biomedical sciences and related fields."
    },
    {
      icon: "fa-microscope",
      title: "Teaching Laboratories",
      description: "Well-equipped laboratories for teaching practical skills in biomedical sciences."
    },
    {
      icon: "fa-book",
      title: "Resource Center",
      description: "Comprehensive library with digital and print resources for biomedical sciences."
    },
    {
      icon: "fa-desktop",
      title: "Computer Labs",
      description: "Modern computer laboratories with specialized software for data analysis and research."
    }
  ]
};
