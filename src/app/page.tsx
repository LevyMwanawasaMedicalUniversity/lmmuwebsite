import React from 'react';
import Slider from '@/components/ui/Slider';
import CategorySection from '@/components/ui/CategorySection';
import NewsSection from '@/components/ui/NewsSection';
import ApplySection from '@/components/ui/ApplySection';

export default function HomePage(): React.ReactNode {
  return (
    <main>
      <Slider />
      <CategorySection />
      <NewsSection />
      <ApplySection />
    </main>
  );
}