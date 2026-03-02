import React from 'react';
import './focusWindow.css';
import ArtSubmission from './ArtSubmission';


const FocusWindow = ({ children, onDismiss,file, className = '' }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && onDismiss) {
      onDismiss();
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

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
