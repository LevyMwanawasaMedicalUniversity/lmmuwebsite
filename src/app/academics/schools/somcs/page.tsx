"use client";

import React from 'react';
import SchoolPage from '@/components/schools/SchoolPage';
import { somcsData } from '@/data/schools/somcs';

export default function SchoolOfMedicinePage(): React.ReactNode {
  return <SchoolPage schoolData={somcsData} />;
}
