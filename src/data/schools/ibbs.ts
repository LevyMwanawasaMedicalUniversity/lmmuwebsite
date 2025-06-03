import { SchoolData } from '@/components/schools/SchoolPageTypes';

export const ibbsData: SchoolData = {
  name: "Institute of Basic and Biomedical Sciences",
  shortName: "IBBS",
  slug: "ibbs",
  heroImage: "/images/schools/ibbs-banner.jpg",
  tagline: "Advancing knowledge in basic and biomedical sciences through innovative research and education",
  overview: "The Institute of Basic and Biomedical Sciences at Levy Mwanawasa Medical University is dedicated to advancing knowledge in basic and biomedical sciences through innovative research and education. Our programmes are designed to provide students with a strong foundation in the basic sciences that underpin medical and health sciences.",
  mission: "To provide high-quality education and conduct innovative research in basic and biomedical sciences that contributes to the advancement of knowledge and improves health outcomes in Zambia and beyond.",
  vision: "To be a leading institute for basic and biomedical sciences education and research in Africa, recognized for its contribution to scientific knowledge and innovation.",
  director: {
    name: "Prof. John Smith",
    title: "Director",
    qualifications: "PhD, MSc, BSc",
    imageSrc: "/images/schools/ibbs-director.jpg",
    message: [
      "Welcome to the Institute of Basic and Biomedical Sciences at Levy Mwanawasa Medical University.",
      "Our institute is committed to excellence in teaching and research in the basic and biomedical sciences. We offer a range of programmes designed to prepare students for successful careers in science and research.",
      "Our faculty members are experts in their fields and are dedicated to providing students with the knowledge and skills needed to excel in the scientific community."
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
  feeStructure: [
    {
      title: "Bachelor of Science in Biomedical Sciences",
      fees: [
        {
          category: "Tuition Fees",
          items: [
            { name: "Zambian Students", amount: "26,000" },
            { name: "International Students", amount: "36,000" }
          ]
        },
        {
          category: "Other Fees",
          items: [
            { name: "Registration Fee", amount: "1,500" },
            { name: "Library Fee", amount: "1,000" },
            { name: "Computer Lab Fee", amount: "1,200" },
            { name: "Student Union Fee", amount: "500" },
            { name: "Laboratory Fee", amount: "2,000" }
          ]
        },
        {
          category: "Index Fees",
          items: [
            { name: "Examination Fee", amount: "2,500" },
            { name: "Practicum Fee", amount: "3,000" }
          ]
        }
      ]
    },
    {
      title: "Bachelor of Science in Medical Laboratory Sciences",
      fees: [
        {
          category: "Tuition Fees",
          items: [
            { name: "Zambian Students", amount: "27,000" },
            { name: "International Students", amount: "37,000" }
          ]
        },
        {
          category: "Other Fees",
          items: [
            { name: "Registration Fee", amount: "1,500" },
            { name: "Library Fee", amount: "1,000" },
            { name: "Computer Lab Fee", amount: "1,200" },
            { name: "Student Union Fee", amount: "500" },
            { name: "Laboratory Fee", amount: "2,500" }
          ]
        },
        {
          category: "Index Fees",
          items: [
            { name: "Examination Fee", amount: "2,500" },
            { name: "Practicum Fee", amount: "3,500" }
          ]
        }
      ]
    },
    {
      title: "Diploma in Biomedical Sciences",
      fees: [
        {
          category: "Tuition Fees",
          items: [
            { name: "Zambian Students", amount: "19,000" },
            { name: "International Students", amount: "29,000" }
          ]
        },
        {
          category: "Other Fees",
          items: [
            { name: "Registration Fee", amount: "1,200" },
            { name: "Library Fee", amount: "800" },
            { name: "Computer Lab Fee", amount: "1,000" },
            { name: "Student Union Fee", amount: "500" },
            { name: "Laboratory Fee", amount: "1,500" }
          ]
        },
        {
          category: "Index Fees",
          items: [
            { name: "Examination Fee", amount: "2,000" },
            { name: "Practicum Fee", amount: "2,500" }
          ]
        }
      ]
    }
  ],
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
