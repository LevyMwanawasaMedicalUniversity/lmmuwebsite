declare module 'react-quill' {
  import React from 'react';
  
  interface ReactQuillProps {
    theme?: string;
    value?: string;
    onChange?: (value: string) => void;
    modules?: any;
    formats?: string[];
    placeholder?: string;
    readOnly?: boolean;
    style?: React.CSSProperties;
    className?: string;
    [key: string]: any;
  }
  
  const ReactQuill: React.FC<ReactQuillProps>;
  
  export default ReactQuill;
}
