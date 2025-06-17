import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface OfficerData {
  name: string;
  title: string;
  description: string;
  imageUrl: string;
}

interface UniversityOfficersProps {
  showTitle?: boolean;
  officers?: OfficerData[];
}

const defaultOfficers: OfficerData[] = [
  {
    name: "Prof. Elwyn Chomba",
    title: "Vice Chancellor",
    description: "Leading the university's strategic vision and academic excellence.",
    imageUrl: "/assets/images/university/officers/vc.png"
  },
  {
    name: "Prof. Laston Chikoya",
    title: "Deputy Vice Chancellor (Administration)",
    description: "Overseeing administrative functions and institutional operations.",
    imageUrl: "/assets/images/university/officers/dvc-admin.jpg"
  },
  {
    name: "Prof. Yusuf Ahmed",
    title: "Acting Deputy Vice Chancellor (Academic Affairs)",
    description: "Leading academic programs, research initiatives, and faculty development.",
    imageUrl: "/assets/images/university/officers/dvc-academic.jpg"
  }
];

const UniversityOfficers: React.FC<UniversityOfficersProps> = ({ 
  showTitle = true,
  officers = defaultOfficers 
}) => {
  return (
    <section className="py-5 bg-light">
      <div className="container py-4">
        {showTitle && (
          <motion.div 
            className="text-center mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-3">University Leadership</h2>
            <div className="divider mx-auto mb-4"></div>
            <p className="lead">Meet the principal officers who lead Levy Mwanawasa Medical University</p>
          </motion.div>
        )}

        <div className="row g-4 justify-content-center">
          {officers.map((officer, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              <motion.div 
                className="card h-100 border-0 shadow-sm rounded-3 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                whileHover={{ y: -10, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="position-relative" style={{ height: '300px' }}>
                  <Image 
                    src={officer.imageUrl} 
                    alt={officer.name} 
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="card-body text-center p-4">
                  <h4 className="card-title mb-1">{officer.name}</h4>
                  <p className="text-primary fw-bold mb-3">{officer.title}</p>
                  <p className="card-text text-muted">{officer.description}</p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UniversityOfficers;
