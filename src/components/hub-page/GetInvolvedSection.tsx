import React from 'react';
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';
import { involvedRoles, involvedButtons } from '@/data/hubPageContent';

const GetInvolvedSection: React.FC = () => {

  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation();
  
  return (
    <section id="create" className="involved-section parallax-section" ref={sectionRef}>
      <div className="container">
        <h2 className={`animate-on-scroll animate-fade-up ${sectionVisible ? 'visible' : ''}`}>Get Involved</h2>
        
        <div className="roles-grid">
          {involvedRoles.map((role, index) => (
            <div key={index} className={`role-card card-dynamic animate-on-scroll animate-fade-up ${sectionVisible ? 'visible' : ''}`}>
              <div className="icon-placeholder">{role.icon}</div>
              <h3>{role.title}</h3>
              <ul>
                {role.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '35px' }}>
          {involvedButtons.map((button, index) => (
            <a
              key={index}
              href={button.href}
              className={`cta-button ${button.type === 'secondary' ? 'secondary' : ''}`}
              target={button.external ? "_blank" : undefined}
              rel={button.external ? "noopener noreferrer" : undefined}
            >
              {button.text}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GetInvolvedSection;
