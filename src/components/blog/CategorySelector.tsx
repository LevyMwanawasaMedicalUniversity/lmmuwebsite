// src/components/blog/CategorySelector.tsx
import React, { useState, useEffect, useRef } from 'react';

export interface Category {
  id: number;
  name: string;
  slug: string;
}

interface CategorySelectorProps {
  selectedCategories: Category[];
  onChange: (categories: Category[]) => void;
  allowCreate?: boolean;
}

export default function CategorySelector({
  selectedCategories = [],
  onChange,
  allowCreate = true,
}: CategorySelectorProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [newCategoryName, setNewCategoryName] = useState<string>('');
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/categories');
        
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategories();
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

  // Filter categories based on search term
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Create new category
  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;
    
    try {
      setIsCreating(true);
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newCategoryName.trim() }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create category');
      }
      
      const newCategory = await response.json();
      
      // Update categories list
      setCategories(prev => [...prev, newCategory]);
      
      // Select the new category
      onChange([...selectedCategories, newCategory]);
      
      // Reset form
      setNewCategoryName('');
      setIsCreating(false);
      setSearchTerm('');
    } catch (error) {
      console.error('Error creating category:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
      setIsCreating(false);
    }
  };

  // Toggle category selection
  const toggleCategory = (category: Category) => {
    const isSelected = selectedCategories.some(c => c.id === category.id);
    
    if (isSelected) {
      onChange(selectedCategories.filter(c => c.id !== category.id));
    } else {
      onChange([...selectedCategories, category]);
    }
  };

  // Remove a selected category
  const removeCategory = (category: Category) => {
    onChange(selectedCategories.filter(c => c.id !== category.id));
  };

  return (
    <div className="mb-3 position-relative" ref={dropdownRef}>
      <label className="form-label fw-bold">
        Categories
        <span className="ms-1 text-muted small">
          ({selectedCategories.length} selected)
        </span>
      </label>
      
      {/* Selected categories list */}
      {selectedCategories.length > 0 && (
        <div className="d-flex flex-wrap gap-1 mb-2">
          {selectedCategories.map(category => (
            <span 
              key={category.id} 
              className="badge bg-primary bg-opacity-10 text-primary d-flex align-items-center py-2 px-3"
            >
              {category.name}
              <button
                type="button"
                className="btn-close ms-2"
                onClick={() => removeCategory(category)}
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
          placeholder="Search or select categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={() => setIsDropdownOpen(true)}
          aria-label="Search categories"
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
              <span className="ms-2">Loading categories...</span>
            </div>
          ) : error ? (
            <div className="text-danger p-2">
              <i className="fas fa-exclamation-circle me-1"></i> {error}
            </div>
          ) : (
            <>
              {filteredCategories.length === 0 && !searchTerm && (
                <div className="dropdown-item text-muted">No categories found</div>
              )}
              
              {filteredCategories.length === 0 && searchTerm && allowCreate && (
                <div className="p-2">
                  <p className="mb-1 text-muted">
                    <i className="fas fa-info-circle me-1"></i> No matching categories
                  </p>
                  <div className="d-flex gap-2 align-items-center">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => {
                        setNewCategoryName(searchTerm);
                        handleCreateCategory();
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
              
              {filteredCategories.map(category => (
                <div
                  key={category.id}
                  className={`dropdown-item d-flex align-items-center ${
                    selectedCategories.some(c => c.id === category.id) ? 'active bg-light' : ''
                  }`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => toggleCategory(category)}
                >
                  <div className="form-check mb-0">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={selectedCategories.some(c => c.id === category.id)}
                      readOnly
                    />
                    <label className="form-check-label">{category.name}</label>
                  </div>
                </div>
              ))}
              
              {/* Option to create new category */}
              {allowCreate && searchTerm && !filteredCategories.some(c => 
                c.name.toLowerCase() === searchTerm.toLowerCase()
              ) && (
                <div className="dropdown-divider"></div>
              )}
            </>
          )}
          
          {/* Create new category form */}
          {allowCreate && searchTerm && !filteredCategories.some(c => 
            c.name.toLowerCase() === searchTerm.toLowerCase()
          ) && (
            <div className="p-2">
              <div className="input-group input-group-sm">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Create new category"
                  value={newCategoryName || searchTerm}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleCreateCategory}
                  disabled={isCreating || !(newCategoryName || searchTerm).trim()}
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
