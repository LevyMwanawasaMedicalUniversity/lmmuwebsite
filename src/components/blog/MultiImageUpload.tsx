import React, { useState, useCallback } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export interface ImageItem {
  id: string;
  file?: File | null;
  previewUrl?: string;
  caption?: string;
  isUploaded?: boolean;
  url?: string;
  order?: number;
}

interface MultiImageUploadProps {
  existingImages?: ImageItem[];
  onChange: (images: ImageItem[]) => void;
  maxImages?: number;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

// Individual draggable image item
const DraggableImageItem = ({ 
  image, 
  index, 
  moveImage, 
  onRemove, 
  onCaptionChange 
}: { 
  image: ImageItem; 
  index: number; 
  moveImage: (dragIndex: number, hoverIndex: number) => void;
  onRemove: (id: string) => void;
  onCaptionChange: (id: string, caption: string) => void;
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'IMAGE_ITEM',
    item: { id: image.id, index } as DragItem,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  
  const [, drop] = useDrop(() => ({
    accept: 'IMAGE_ITEM',
    hover: (item: DragItem, monitor) => {
      if (!drag) {
        return;
      }
      
      const dragIndex = item.index;
      const hoverIndex = index;
      
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      
      moveImage(dragIndex, hoverIndex);
      
      // Update the dragged item's index
      item.index = hoverIndex;
    }
  }));
    // Correctly combining drag and drop refs
  const refCombiner = (node: HTMLDivElement | null) => {
    if (node) {
      drag(drop(node));
    }
  };

  return (
    <div 
      ref={refCombiner} 
      className={`position-relative border rounded p-2 mb-2 ${isDragging ? 'opacity-50 bg-light' : ''}`}
      style={{ cursor: 'move' }}
    >
      <div className="d-flex">
        <div className="me-3 text-center" style={{ minWidth: '100px' }}>
          <img 
            src={image.previewUrl || image.url} 
            alt="Preview" 
            className="img-thumbnail mb-1" 
            style={{ maxHeight: '100px', maxWidth: '100px', objectFit: 'cover' }} 
          />
          {index === 0 && (
            <span className="badge bg-warning text-dark">Featured</span>
          )}
        </div>
        <div className="flex-grow-1">
          <div className="mb-2">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Image caption (optional)"
              value={image.caption || ''}
              onChange={(e) => onCaptionChange(image.id, e.target.value)}
            />
          </div>
          <div>
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={() => onRemove(image.id)}
            >
              <i className="fas fa-trash-alt me-1"></i> Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function MultiImageUpload({ 
  existingImages = [], 
  onChange,
  maxImages = 10 
}: MultiImageUploadProps) {
  const [images, setImages] = useState<ImageItem[]>(() => {
    if (existingImages.length > 0) {
      return existingImages;
    }
    return [];
  });
  
  const handleImageAdd = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    const newFiles = Array.from(e.target.files);
    
    // Check if adding these would exceed the maximum
    if (images.length + newFiles.length > maxImages) {
      alert(`You can only upload a maximum of ${maxImages} images.`);
      return;
    }
    
    const newImages = newFiles.map(file => {
      const id = `new-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      return {
        id,
        file,
        previewUrl: URL.createObjectURL(file),
        caption: '',
        isUploaded: false,
        order: images.length
      };
    });
    
    setImages(prev => {
      const updated = [...prev, ...newImages];
      onChange(updated);
      return updated;
    });
    
    // Reset input value so we can select the same file again
    e.target.value = '';
  }, [images.length, onChange, maxImages]);
  
  const handleRemoveImage = useCallback((id: string) => {
    setImages(prev => {
      const updated = prev.filter(image => image.id !== id);
      onChange(updated);
      return updated;
    });
  }, [onChange]);
  
  const handleCaptionChange = useCallback((id: string, caption: string) => {
    setImages(prev => {
      const updated = prev.map(image => 
        image.id === id ? { ...image, caption } : image
      );
      onChange(updated);
      return updated;
    });
  }, [onChange]);
  
  const moveImage = useCallback((dragIndex: number, hoverIndex: number) => {
    setImages(prevImages => {
      const result = Array.from(prevImages);
      const [removed] = result.splice(dragIndex, 1);
      result.splice(hoverIndex, 0, removed);
      
      // Update order property for each image
      const updated = result.map((image, idx) => ({ ...image, order: idx }));
      
      onChange(updated);
      return updated;
    });
  }, [onChange]);
  
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <label className="form-label fw-bold mb-0">Images</label>
          <span className="text-muted small">
            {images.length} / {maxImages} images
          </span>
        </div>
        
        <input 
          type="file" 
          className="form-control mb-3" 
          accept="image/*"
          onChange={handleImageAdd}
          multiple
          disabled={images.length >= maxImages}
        />
        
        <div className="border rounded p-3 bg-light">
          {images.length === 0 && (
            <div className="text-center text-muted py-4">
              <i className="fas fa-images fa-2x mb-2"></i>
              <p>No images added yet. Click "Choose File" to add images.</p>
            </div>
          )}
          
          {images.length > 0 && (
            <>
              <div className="mb-3">
                <small className="text-muted">
                  <i className="fas fa-info-circle me-1"></i>
                  Drag images to reorder. The first image will be used as the featured image.
                </small>
              </div>
              
              {images.map((image, index) => (
                <DraggableImageItem 
                  key={image.id} 
                  image={image} 
                  index={index}
                  moveImage={moveImage}
                  onRemove={handleRemoveImage}
                  onCaptionChange={handleCaptionChange}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </DndProvider>
  );
}
