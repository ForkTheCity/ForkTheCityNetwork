import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  visible?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  subtitle, 
  className = '',
  visible = true 
}) => {
  return (
    <div className={`section-header ${className}`}>
      <h2 className={`animate-on-scroll animate-fade-up ${visible ? 'visible' : ''}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`animate-on-scroll animate-fade-up ${visible ? 'visible' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
