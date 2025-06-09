import React from 'react';
import { Metadata } from 'next';
import BlogList from '@/components/blog/BlogList';
import BlogHeader from '@/components/blog/BlogHeader';

export const metadata: Metadata = {
  title: 'Blog | Levy Mwanawasa Medical University',
  description: 'Latest news, events, and updates from Levy Mwanawasa Medical University',
};

export default async function BlogPage() {
  return (
    <main className="container py-5">
      <BlogHeader 
        title="LMMU Blog" 
        subtitle="Latest news, events, and updates from Levy Mwanawasa Medical University"
      />
      <BlogList />
    </main>
  );
}
