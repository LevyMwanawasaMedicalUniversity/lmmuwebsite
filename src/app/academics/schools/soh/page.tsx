"use client";

import React from 'react';
import SchoolPage from '@/components/schools/SchoolPage';
import { sohData } from '@/data/schools/soh';

export default function SchoolOfHealthSciencesPage(): React.ReactNode {
  return <SchoolPage schoolData={sohData} />;
}
