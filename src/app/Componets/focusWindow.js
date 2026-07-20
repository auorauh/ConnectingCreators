import React from 'react';
import './focusWindow.css';
import ArtSubmission from './ArtSubmission';


const FocusWindow = ({ children, onDismiss,file, className = '' }) => {
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onDismiss) {
        onDismiss();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onDismiss]);

  return (
    <div
      className={`focus-window ${className}`}
      onClick={onDismiss}
      role="presentation"
    >
      <div
        className="focus-window-content"
        onClick={(e) => e.stopPropagation()}
      >
        <ArtSubmission file={file} onDismiss={onDismiss}/>
        
        {children}
      </div>
      
    </div>
  );
};

export default FocusWindow;
