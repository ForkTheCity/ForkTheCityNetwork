import React from 'react';
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';
import { volunteerGalleryContent } from '@/data/hubPageContent';

const VolunteerGallery: React.FC = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation();

  const roles = volunteerGalleryContent.roles;

  return (
    <section className="volunteer-gallery-section" ref={sectionRef}>
      <div className="volunteer-gallery-container">
        <div className="volunteer-gallery-grid">
          {roles.map((role, index) => (
            <div 
              key={index}
              className={`volunteer-gallery-card animate-on-scroll animate-scale ${sectionVisible ? 'visible' : ''}`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="volunteer-card-content">
                <div className="volunteer-card-icon">{role.icon}</div>
                <h3>{role.title}</h3>
                <div className="volunteer-tagline">{role.tagline}</div>
                <p>{role.description}</p>
              </div>
              <div className="volunteer-card-hover">
                <a href={role.hoverButton.href} className="volunteer-hover-button">
                  {role.hoverButton.text}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="volunteer-gallery-sidebar">
          <div className={`volunteer-gallery-header animate-on-scroll animate-fade-up ${sectionVisible ? 'visible' : ''}`}>
            <h2>{volunteerGalleryContent.header.title}</h2>
            <p>{volunteerGalleryContent.header.description}</p>
            <div className="cta-group">
              {volunteerGalleryContent.header.buttons.map((button, index) => (
                <a 
                  key={index}
                  href={button.href} 
                  className={`cta-button ${button.type === 'secondary' ? 'secondary' : ''}`}
                  {...(button.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {button.text}
                </a>
              ))}
            </div>
          </div>

          <div className={`volunteer-cta animate-on-scroll animate-fade-up ${sectionVisible ? 'visible' : ''}`}>
            <h3>{volunteerGalleryContent.footer.title}</h3>
            <p>{volunteerGalleryContent.footer.description}</p>
            <a href={volunteerGalleryContent.footer.button.href} className="cta-button">
              {volunteerGalleryContent.footer.button.text}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VolunteerGallery;
