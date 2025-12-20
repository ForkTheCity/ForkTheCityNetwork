import React from 'react';
import { headerContent } from '@/data/hubPageContent';

const HubHeader: React.FC = () => {
  return (
    <header>
      <div className="container">
        <h1>{headerContent.title}</h1>
        <p>{headerContent.subtitle}</p>
        <p style={{ fontSize: '0.95em', marginBottom: '20px' }}>
          {headerContent.description}
        </p>
        <div>
          {headerContent.buttons.map((button, index) => (
            <a
              key={index}
              href={button.href}
              className={`cta-button ${button.type === 'secondary' ? 'secondary' : ''}`}
            >
              {button.text}
            </a>
          ))}
        </div>
        <div className="hero-image">
          🌆
        </div>
      </div>
    </header>
  );
};

export default HubHeader;
