import React from 'react';
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';
import { projectsData, projectsShowcase } from '@/data/micrositeContent';

const ProjectsSection: React.FC = () => {

  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation();
  
  return (
    <section id="projects" className="projects-section parallax-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2 className={`animate-on-scroll animate-fade-up ${sectionVisible ? 'visible' : ''}`}>Active Projects</h2>
          <p className={`animate-on-scroll animate-fade-up ${sectionVisible ? 'visible' : ''}`}>Community-driven initiatives making a difference</p>
        </div>

        <div className="feature-showcase">
          <div className="feature-showcase-image animate-on-scroll animate-scale" style={{ animationDelay: '0.2s', fontSize: '2.5em' }}>
            {projectsShowcase.emoji}
          </div>
          <div>
            <h3 style={{ fontSize: '1.4em', marginBottom: '12px', color: '#ffffff', textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', fontWeight: '700' }}>
              {projectsShowcase.title}
            </h3>
            <p style={{ color: '#e2e8f0', fontSize: '0.95em', lineHeight: '1.6', fontWeight: '500' }}>
              {projectsShowcase.description}
            </p>
          </div>
        </div>

        <div className="projects-grid">
          {projectsData.map((project, index) => (
            <div key={index} className={`project-card card-dynamic animate-on-scroll animate-scale ${sectionVisible ? 'visible' : ''}`}>
              <div className="project-image">{project.emoji}</div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-progress">
                  <small>Progress: {project.progress}%</small>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${project.progress}%` }}></div>
                  </div>
                </div>
                <div className="project-stats">
                  <span>💰 {project.raised} raised</span>
                  <span>👥 {project.volunteers} volunteers</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '25px' }}>
          <a href="#" className="btn btn-accent">Propose New Project</a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
