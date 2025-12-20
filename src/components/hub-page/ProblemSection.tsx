import React from 'react';
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';
import { problemCards } from '@/data/hubPageContent';

const ProblemSection: React.FC = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation();

  return (
    <section className="problem-section parallax-section decorative-bg" ref={sectionRef}>
      <div className="container">
        <h2 className={`animate-on-scroll animate-fade-up ${sectionVisible ? 'visible' : ''}`}>
          The Problem
        </h2>
        <div className="problem-grid">
          {problemCards.map((problem, index) => (
            <div 
              key={index} 
              className={`problem-card card-dynamic animate-on-scroll animate-fade-up ${sectionVisible ? 'visible' : ''}`}
            >
              <h3>{problem.emoji} {problem.title}</h3>
              <p>{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
