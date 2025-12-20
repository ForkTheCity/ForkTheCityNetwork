import React from 'react';
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';
import { solutionContent } from '@/data/hubPageContent';

const SolutionSection: React.FC = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation();
  
  return (
    <section className="solution-section parallax-section" ref={sectionRef}>
      <div className="container">
        <h2 className={`animate-on-scroll animate-fade-up ${sectionVisible ? 'visible' : ''}`}>{solutionContent.title}</h2>
        <p className={`tagline animate-on-scroll animate-fade-up ${sectionVisible ? 'visible' : ''}`}>
          {solutionContent.tagline}
        </p>

        <div className="section-with-image">
          <div className="section-image animate-on-scroll animate-fade-left" style={{ animationDelay: '0.2s', fontSize: '2.5em' }}>
            {solutionContent.showcase.emoji}
          </div>
          <div>
            <h3 style={{ fontSize: '1.4em', marginBottom: '15px', color: '#f8f9fa' }}>
              {solutionContent.showcase.title}
            </h3>
            <p style={{ color: '#A3BAC3', fontSize: '0.95em', lineHeight: '1.7' }}>
              {solutionContent.showcase.description}
            </p>
          </div>
        </div>
        
        <div className="features-grid">
          {solutionContent.features.map((feature, index) => (
            <div key={index} className={`feature-card card-dynamic animate-on-scroll animate-scale ${sectionVisible ? 'visible' : ''}`}>
              <h3>{feature.icon} {feature.title}</h3>
              <p>{feature.description}</p>
              <ul>
                {feature.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
