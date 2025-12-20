import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  animated?: boolean;
  visible?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  animated = false,
  visible = true,
  onClick 
}) => {
  const animationClass = animated ? `card-dynamic animate-on-scroll animate-fade-up ${visible ? 'visible' : ''}` : '';
  
  return (
    <div 
      className={`${className} ${animationClass}`.trim()} 
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {children}
    </div>
  );
};

export default Card;
