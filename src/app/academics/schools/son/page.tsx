"use client";

import React from 'react';
import SchoolPage from '@/components/schools/SchoolPage';
import { sonData } from '@/data/schools/son';

export default function SchoolOfNursingPage(): React.ReactNode {
  return <SchoolPage schoolData={sonData} />;
}
