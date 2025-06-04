"use client";

import React from 'react';
import SchoolPage from '@/components/schools/SchoolPage';
import { sophesData } from '@/data/schools/sophes';

export default function SchoolOfPublicHealthPage(): React.ReactNode {
  return <SchoolPage schoolData={sophesData} />;
}
