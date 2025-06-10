"use client";

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import React Quill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => (
    <div className="p-3 border rounded">
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading editor...</span>
        </div>
      </div>
    </div>
  ),
});

// Load Quill styles on the client side
function QuillCSS() {
  useEffect(() => {
    // Only load CSS in browser environment
    if (typeof window !== 'undefined') {
      // Create a link element for the Quill CSS
      const link = document.createElement('link');
      link.href = 'https://cdn.quilljs.com/1.3.7/quill.snow.css';
      link.rel = 'stylesheet';
      link.type = 'text/css';
      document.head.appendChild(link);
    }
    
    // Clean up function
    return () => {
      if (typeof window !== 'undefined') {
        const links = document.querySelectorAll('link[href="https://cdn.quilljs.com/1.3.7/quill.snow.css"]');
        links.forEach(link => link.parentNode.removeChild(link));
      }
    };
  }, []);
  
  return null;
}

const toolbarOptions = [
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'align': [] }],
  ['blockquote', 'code-block'],
  [{ 'script': 'sub'}, { 'script': 'super' }],
  [{ 'color': [] }, { 'background': [] }],
  ['link', 'image', 'video'],
  ['clean']
];

const BlogEditor = ({ value, onChange, placeholder = 'Write your blog content here...' }) => {
  // The quill instance and config
  const quillRef = useRef(null);
    // Function to handle image uploads
  const handleImageUpload = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    
    input.onchange = async () => {
      if (input.files) {
        const file = input.files[0];
        const formData = new FormData();
        formData.append('file', file);
        
        try {
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });
          
          if (!response.ok) {
            throw new Error('Failed to upload image');
          }
          
          const result = await response.json();
          
          // Insert the image into the editor
          if (quillRef.current) {
            const quill = quillRef.current.getEditor();
            const range = quill.getSelection(true);
            quill.insertEmbed(range.index, 'image', result.url);
          }
        } catch (error) {
          console.error('Error uploading image:', error);
          alert('Failed to upload image. Please try again.');
        }
      }
    };
  };
  // Configure the Quill modules - with custom image handler
  const modules = {
    toolbar: {
      container: toolbarOptions,
      handlers: {
        image: handleImageUpload
      }
    },
    clipboard: {
      matchVisual: false,
      // Allow pasting of images
      matchers: []
    },
    keyboard: {
      bindings: {}
    }
  };
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'align',
    'blockquote', 'code-block',
    'script',
    'color', 'background',
    'link', 'image', 'video'
  ];
  return (
    <div className="blog-editor">
      <QuillCSS />
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
      <style jsx global>{`
        .blog-editor .ql-editor {
          min-height: 250px;
          font-size: 16px;
          line-height: 1.6;
        }
        .blog-editor .ql-toolbar {
          border-top-left-radius: 0.375rem;
          border-top-right-radius: 0.375rem;
          background-color: #f8f9fa;
        }
        .blog-editor .ql-container {
          border-bottom-left-radius: 0.375rem;
          border-bottom-right-radius: 0.375rem;
          background-color: white;
        }
      `}</style>
    </div>
  );
};

export default BlogEditor;