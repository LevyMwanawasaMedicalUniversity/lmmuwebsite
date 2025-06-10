"use client";

import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Color from '@tiptap/extension-color';

// Editor Toolbar Component
const EditorToolbar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const addImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async () => {
      if (input.files?.length) {
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
          editor.chain().focus().setImage({ src: result.url }).run();
        } catch (error) {
          console.error('Error uploading image:', error);
          alert('Failed to upload image. Please try again.');
        }
      }
    };
    input.click();
  };

  return (
    <div className="editor-toolbar bg-light border p-2 rounded-top d-flex flex-wrap gap-1 align-items-center">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`btn btn-sm ${editor.isActive('heading', { level: 1 }) ? 'btn-primary' : 'btn-outline-secondary'}`}
      >
        H1
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`btn btn-sm ${editor.isActive('heading', { level: 2 }) ? 'btn-primary' : 'btn-outline-secondary'}`}
      >
        H2
      </button>
      
      <div className="d-flex gap-1 border-start ps-2 ms-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`btn btn-sm ${editor.isActive('bold') ? 'btn-primary' : 'btn-outline-secondary'}`}
        >
          <i className="fas fa-bold"></i>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`btn btn-sm ${editor.isActive('italic') ? 'btn-primary' : 'btn-outline-secondary'}`}
        >
          <i className="fas fa-italic"></i>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`btn btn-sm ${editor.isActive('underline') ? 'btn-primary' : 'btn-outline-secondary'}`}
        >
          <i className="fas fa-underline"></i>
        </button>
      </div>
      
      <div className="d-flex gap-1 border-start ps-2 ms-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`btn btn-sm ${editor.isActive('bulletList') ? 'btn-primary' : 'btn-outline-secondary'}`}
        >
          <i className="fas fa-list-ul"></i>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`btn btn-sm ${editor.isActive('orderedList') ? 'btn-primary' : 'btn-outline-secondary'}`}
        >
          <i className="fas fa-list-ol"></i>
        </button>
      </div>
      
      <div className="d-flex gap-1 border-start ps-2 ms-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`btn btn-sm ${editor.isActive({ textAlign: 'left' }) ? 'btn-primary' : 'btn-outline-secondary'}`}
        >
          <i className="fas fa-align-left"></i>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`btn btn-sm ${editor.isActive({ textAlign: 'center' }) ? 'btn-primary' : 'btn-outline-secondary'}`}
        >
          <i className="fas fa-align-center"></i>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`btn btn-sm ${editor.isActive({ textAlign: 'right' }) ? 'btn-primary' : 'btn-outline-secondary'}`}
        >
          <i className="fas fa-align-right"></i>
        </button>
      </div>
      
      <div className="d-flex gap-1 border-start ps-2 ms-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`btn btn-sm ${editor.isActive('blockquote') ? 'btn-primary' : 'btn-outline-secondary'}`}
        >
          <i className="fas fa-quote-right"></i>
        </button>
        <button
          type="button"
          onClick={addImage}
          className="btn btn-sm btn-outline-secondary"
        >
          <i className="fas fa-image"></i>
        </button>
        
        <div className="dropdown">
          <button 
            className="btn btn-sm btn-outline-secondary dropdown-toggle" 
            type="button" 
            id="linkDropdown" 
            data-bs-toggle="dropdown" 
            aria-expanded="false"
          >
            <i className="fas fa-link"></i>
          </button>
          <div className="dropdown-menu p-3" aria-labelledby="linkDropdown" style={{ minWidth: '300px' }}>
            <div className="mb-3">
              <label htmlFor="linkUrl" className="form-label">URL</label>
              <input 
                type="url" 
                className="form-control" 
                id="linkUrl" 
                placeholder="https://example.com"
              />
            </div>
            <button 
              type="button" 
              className="btn btn-sm btn-primary"
              onClick={() => {
                const linkElement = document.getElementById('linkUrl');
                const url = linkElement ? linkElement.value : '';
                if (url) {
                  editor.chain().focus().setLink({ href: url }).run();
                }
              }}
            >
              Add Link
            </button>
            {editor.isActive('link') && (
              <button 
                type="button" 
                className="btn btn-sm btn-outline-danger ms-2"
                onClick={() => editor.chain().focus().unsetLink().run()}
              >
                Remove Link
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main BlogEditor component
const BlogEditor = ({ value, onChange, placeholder = 'Write your blog content here...' }) => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    
    // Bootstrap dropdown functionality requires manual initialization
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      // Load Bootstrap JavaScript if needed
      if (!window.bootstrap) {
        import('bootstrap/dist/js/bootstrap.bundle.min.js').then(() => {
          // Initialize Bootstrap tooltips and dropdowns
          const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
          [...tooltipTriggerList].map(tooltipTriggerEl => {
            return new window.bootstrap.Tooltip(tooltipTriggerEl);
          });
          
          const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
          [...dropdownElementList].map(dropdownToggleEl => {
            return new window.bootstrap.Dropdown(dropdownToggleEl);
          });
        });
      }
    }
    
    return () => {
      // Cleanup if needed
    };
  }, []);
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary',
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'img-fluid rounded my-3',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Color,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });
  // Don't render until we're in the browser
  if (!isMounted) {
    return (
      <div className="p-3 border rounded">
        <div className="d-flex justify-content-center align-items-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading editor...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-editor">
      <EditorToolbar editor={editor} />
      <EditorContent 
        editor={editor} 
        className="editor-content bg-white border rounded-bottom p-3"
      />
      <style jsx global>{`
        .blog-editor {
          margin-bottom: 1.5rem;
        }
        
        .blog-editor .editor-content {
          min-height: 280px;
        }
        
        .ProseMirror {
          min-height: 250px;
          padding: 1rem;
          outline: none;
          font-size: 16px;
          line-height: 1.6;
        }
        
        .ProseMirror p {
          margin-bottom: 1rem;
        }
        
        .ProseMirror h1,
        .ProseMirror h2,
        .ProseMirror h3,
        .ProseMirror h4,
        .ProseMirror h5,
        .ProseMirror h6 {
          margin-top: 1.5rem;
          margin-bottom: 1rem;
          font-weight: 600;
        }
        
        .ProseMirror ul,
        .ProseMirror ol {
          padding-left: 1.5rem;
          margin-bottom: 1rem;
        }
        
        .ProseMirror blockquote {
          border-left: 4px solid #dee2e6;
          padding-left: 1rem;
          color: #6c757d;
          margin-left: 0;
          margin-right: 0;
          font-style: italic;
        }
        
        .ProseMirror a {
          color: #0d6efd;
          text-decoration: underline;
        }
        
        .ProseMirror img {
          max-width: 100%;
          height: auto;
          margin: 1rem 0;
        }
        
        .ProseMirror p.is-editor-empty:first-child::before {
          color: #adb5bd;
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default BlogEditor;
