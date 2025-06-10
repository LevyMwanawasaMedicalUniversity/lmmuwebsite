import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostById } from '@/lib/blog';
import BlogPostDetail from '@/components/blog/BlogPostDetail';

type Props = {
  params: { id: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // For server components, we should await params instead of using React.use()
  const paramsObj = await params;
  const postId = parseInt(paramsObj.id);
  
  if (isNaN(postId)) {
    return {
      title: 'Post Not Found | LMMU Blog',
      description: 'The requested blog post could not be found.',
    };
  }
  
  const post = await getPostById(postId);
  
  if (!post) {
    return {
      title: 'Post Not Found | LMMU Blog',
      description: 'The requested blog post could not be found.',
    };
  }
  
  return {
    title: `${post.title} | LMMU Blog`,
    description: post.summary || 'Levy Mwanawasa Medical University blog post',
  };
}

export default async function BlogPostPage({ params }: Props) {
  // For server components, we should await params instead of using React.use()
  const paramsObj = await params;
  const postId = parseInt(paramsObj.id);
  
  if (isNaN(postId)) {
    notFound();
  }
  
  const post = await getPostById(postId);
  
  if (!post) {
    notFound();
  }
  
  return <BlogPostDetail post={post} />;
}
