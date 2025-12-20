import React, { useState, useEffect } from 'react';
import { micrositeHeroContent } from '@/data/micrositeContent';

interface MicrositeHeroProps {
  cityName?: string;
}

const MicrositeHero: React.FC<MicrositeHeroProps> = ({ cityName = micrositeHeroContent.defaultCityName }) => {
  const [issueCount, setIssueCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [volunteerCount, setVolunteerCount] = useState(0);

  useEffect(() => {
    // In production, this would fetch from an API
    setIssueCount(23);
    setProjectCount(8);
    setVolunteerCount(47);
  }, []);

  return (
    <section className="hero">
      <div className="container">
        <h1>Welcome to {cityName}</h1>
        <p>
          {micrositeHeroContent.description}
        </p>
        
        <div className="stats">
          <div className="stat-item">
            <span className="stat-number">{issueCount}</span>
            <span className="stat-label">Active Issues</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{projectCount}</span>
            <span className="stat-label">Projects</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{volunteerCount}</span>
            <span className="stat-label">Volunteers</span>
          </div>
        </div>

        <div className="action-buttons">
          {micrositeHeroContent.buttons.map((button, index) => (
            <a key={index} href={button.href} className={`btn btn-${button.type}`}>
              {button.text}
            </a>
          ))}
        </div>
        <div className="hero-image" style={{ marginTop: '30px' }}>
          🏙️
        </div>
      </div>
    </section>
  );
};

export default MicrositeHero;
