"use client";

import React from 'react';
import SchoolPage from '@/components/schools/SchoolPage';
import { ibbsData } from '@/data/schools/ibbs';

export default function InstituteOfBasicAndBiomedicalSciencesPage(): React.ReactNode {
  return <SchoolPage schoolData={ibbsData} />;
}
