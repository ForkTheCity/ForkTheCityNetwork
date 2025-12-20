import React from 'react';
import { ethicsPrinciples } from '@/data/hubPageContent';

const EthicsSection: React.FC = () => {

  return (
    <section className="ethics-section">
      <div className="container">
        <h2>Our Principles</h2>
        
        <div className="ethics-grid">
          {ethicsPrinciples.map((principle, index) => (
            <div key={index} className="ethics-card">
              <h3>{principle.icon} {principle.title}</h3>
              <ul>
                {principle.items.map((item, itemIndex) => (
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

export default EthicsSection;
