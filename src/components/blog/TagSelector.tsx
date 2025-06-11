// src/components/blog/TagSelector.tsx
import React, { useState, useEffect, useRef } from 'react';

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

interface TagSelectorProps {
  selectedTags: Tag[];
  onChange: (tags: Tag[]) => void;
  allowCreate?: boolean;
}

export default function TagSelector({
  selectedTags = [],
  onChange,
  allowCreate = true,
}: TagSelectorProps) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [newTagName, setNewTagName] = useState<string>('');
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch tags on component mount
  useEffect(() => {
    const fetchTags = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/tags');
        
        if (!response.ok) {
          throw new Error('Failed to fetch tags');
        }
        
        const data = await response.json();
        setTags(data);
      } catch (error) {
        console.error('Error fetching tags:', error);
        setError('Failed to load tags');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTags();
  }, []);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter tags based on search term
  const filteredTags = tags.filter(tag => 
    tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Create new tag
  const handleCreateTag = async () => {
    if (!newTagName.trim()) return;
    
    try {
      setIsCreating(true);
      const response = await fetch('/api/tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newTagName.trim() }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create tag');
      }
      
      const newTag = await response.json();
      
      // Update tags list
      setTags(prev => [...prev, newTag]);
      
      // Select the new tag
      onChange([...selectedTags, newTag]);
      
      // Reset form
      setNewTagName('');
      setIsCreating(false);
      setSearchTerm('');
    } catch (error) {
      console.error('Error creating tag:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
      setIsCreating(false);
    }
  };

  // Toggle tag selection
  const toggleTag = (tag: Tag) => {
    const isSelected = selectedTags.some(t => t.id === tag.id);
    
    if (isSelected) {
      onChange(selectedTags.filter(t => t.id !== tag.id));
    } else {
      onChange([...selectedTags, tag]);
    }
  };

  // Remove a selected tag
  const removeTag = (tag: Tag) => {
    onChange(selectedTags.filter(t => t.id !== tag.id));
  };

  return (
    <div className="mb-3 position-relative" ref={dropdownRef}>
      <label className="form-label fw-bold">
        Tags
        <span className="ms-1 text-muted small">
          ({selectedTags.length} selected)
        </span>
      </label>
      
      {/* Selected tags list */}
      {selectedTags.length > 0 && (
        <div className="d-flex flex-wrap gap-1 mb-2">
          {selectedTags.map(tag => (
            <span 
              key={tag.id} 
              className="badge bg-info bg-opacity-10 text-info d-flex align-items-center py-2 px-3"
            >
              {tag.name}
              <button
                type="button"
                className="btn-close ms-2"
                onClick={() => removeTag(tag)}
                style={{ fontSize: '0.6rem' }}
              ></button>
            </span>
          ))}
        </div>
      )}
      
      {/* Search input */}
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search or select tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={() => setIsDropdownOpen(true)}
          aria-label="Search tags"
        />
        <button 
          className="btn btn-outline-secondary" 
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <i className={`fas fa-chevron-${isDropdownOpen ? 'up' : 'down'}`}></i>
        </button>
      </div>
      
      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div className="dropdown-menu show w-100 p-2 mt-1 shadow-sm">
          {loading ? (
            <div className="text-center p-2">
              <div className="spinner-border spinner-border-sm text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <span className="ms-2">Loading tags...</span>
            </div>
          ) : error ? (
            <div className="text-danger p-2">
              <i className="fas fa-exclamation-circle me-1"></i> {error}
            </div>
          ) : (
            <>
              {filteredTags.length === 0 && !searchTerm && (
                <div className="dropdown-item text-muted">No tags found</div>
              )}
              
              {filteredTags.length === 0 && searchTerm && allowCreate && (
                <div className="p-2">
                  <p className="mb-1 text-muted">
                    <i className="fas fa-info-circle me-1"></i> No matching tags
                  </p>
                  <div className="d-flex gap-2 align-items-center">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => {
                        setNewTagName(searchTerm);
                        handleCreateTag();
                      }}
                      disabled={isCreating}
                    >
                      {isCreating ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-1" role="status"></span>
                          Creating...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-plus-circle me-1"></i> Create "{searchTerm}"
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
              
              {filteredTags.map(tag => (
                <div
                  key={tag.id}
                  className={`dropdown-item d-flex align-items-center ${
                    selectedTags.some(t => t.id === tag.id) ? 'active bg-light' : ''
                  }`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => toggleTag(tag)}
                >
                  <div className="form-check mb-0">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={selectedTags.some(t => t.id === tag.id)}
                      readOnly
                    />
                    <label className="form-check-label">{tag.name}</label>
                  </div>
                </div>
              ))}
              
              {/* Option to create new tag */}
              {allowCreate && searchTerm && !filteredTags.some(t => 
                t.name.toLowerCase() === searchTerm.toLowerCase()
              ) && (
                <div className="dropdown-divider"></div>
              )}
            </>
          )}
          
          {/* Create new tag form */}
          {allowCreate && searchTerm && !filteredTags.some(t => 
            t.name.toLowerCase() === searchTerm.toLowerCase()
          ) && (
            <div className="p-2">
              <div className="input-group input-group-sm">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Create new tag"
                  value={newTagName || searchTerm}
                  onChange={(e) => setNewTagName(e.target.value)}
                />
                <button
                  className="btn btn-info"
                  type="button"
                  onClick={handleCreateTag}
                  disabled={isCreating || !(newTagName || searchTerm).trim()}
                >
                  {isCreating ? (
                    <span className="spinner-border spinner-border-sm" role="status"></span>
                  ) : (
                    <i className="fas fa-plus"></i>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
