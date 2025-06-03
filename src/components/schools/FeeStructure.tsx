"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FeeStructure as FeeStructureType } from './SchoolPageTypes';

interface FeeStructureProps {
  feeStructure: FeeStructureType;
}

export const FeeStructure: React.FC<FeeStructureProps> = ({ feeStructure }) => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="fee-structure mt-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {/* Main Programs Fee Table */}
        <div className="mb-8 overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border">
                  PROGRAM
                </th>
                <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider border">
                  TUITION FEE ONLY
                </th>
                <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider border">
                  YEAR 1 TUITION FEE, INDEX FEE & OTHER FEES
                </th>
                <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider border">
                  YEAR 1 REGISTRATION FEE
                </th>
                <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider border">
                  OTHER YEARS' TUITION FEE & OTHER FEES
                </th>
                <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider border">
                  OTHER YEARS' REGISTRATION FEE
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {feeStructure.programFees.map((program, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 text-sm text-gray-900 border">{program.programName}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-center font-medium border">{program.tuitionFeeOnly}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-center font-medium border">{program.year1TuitionAndFees}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-center font-medium border">{program.year1RegistrationFee}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-center font-medium border">{program.otherYearsTuitionAndFees}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-center font-medium border">{program.otherYearsRegistrationFee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Additional Fees Tables Side by Side */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          {/* OTHER FEES Table */}
          <div className="flex-1 overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border" colSpan={2}>
                    OTHER FEES
                  </th>
                </tr>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 border">
                    Item
                  </th>
                  <th className="px-4 py-2 text-center text-xs font-medium text-gray-700 border">
                    AMOUNT
                  </th>
                </tr>
              </thead>
              <tbody>
                {feeStructure.otherFees.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-2 text-sm text-gray-900 border">{item.name}</td>
                    <td className="px-4 py-2 text-sm text-gray-900 text-center font-medium border">{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* INDEX FEES Table */}
          <div className="flex-1 overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border" colSpan={2}>
                    INDEX FEES
                  </th>
                </tr>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 border">
                    Item
                  </th>
                  <th className="px-4 py-2 text-center text-xs font-medium text-gray-700 border">
                    AMOUNT
                  </th>
                </tr>
              </thead>
              <tbody>
                {feeStructure.indexFees.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-2 text-sm text-gray-900 border">{item.name}</td>
                    <td className="px-4 py-2 text-sm text-gray-900 text-center font-medium border">{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
