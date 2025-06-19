"use client";

import React from 'react';
import MultiImageUpload, { ImageItem } from './MultiImageUpload';

/**
 * This is a test component to verify that MultiImageUpload works correctly
 * with the installed react-dnd and react-dnd-html5-backend dependencies.
 */
export default function TestMultiImageUpload() {
  const [images, setImages] = React.useState<ImageItem[]>([]);

  const handleImageChange = (newImages: ImageItem[]) => {
    setImages(newImages);
    console.log('Images updated:', newImages);
  };

  return (
    <div className="container mt-4">
      <h1>Test MultiImageUpload Component</h1>
      <MultiImageUpload 
        onChange={handleImageChange}
        maxImages={5}
      />
      <div className="mt-4">
        <h3>Image Data:</h3>
        <pre>{JSON.stringify(images, null, 2)}</pre>
      </div>
    </div>
  );
}
