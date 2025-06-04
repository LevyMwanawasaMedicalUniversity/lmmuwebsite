"use client";

import React from 'react';
import SchoolPage from '@/components/schools/SchoolPage';
import { drpgsData } from '@/data/schools/drpgs';

export default function DirectorateOfResearchPage(): React.ReactNode {
  return <SchoolPage schoolData={drpgsData} />;
}
