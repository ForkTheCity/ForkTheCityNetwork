import React from 'react';
import { fundingShowcase, fundingOverview, fundingData, fundingButtons } from '@/data/micrositeContent';

const FundingSection: React.FC = () => {

  return (
    <section id="funding" className="funding-section decorative-bg">
      <div className="container">
        <div className="section-header">
          <h2>Community Funding</h2>
          <p>Transparent direct funding for civic projects</p>
        </div>

        <div className="feature-showcase">
          <div>
            <h3 style={{ fontSize: '1.4em', marginBottom: '12px', color: '#ffffff', textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', fontWeight: '700' }}>
              {fundingShowcase.title}
            </h3>
            <p style={{ color: '#e2e8f0', fontSize: '0.95em', lineHeight: '1.6', fontWeight: '500' }}>
              {fundingShowcase.description}
            </p>
          </div>
          <div className="feature-showcase-image" style={{ fontSize: '2.5em' }}>
            {fundingShowcase.emoji}
          </div>
        </div>

        <div className="funding-overview">
          <div className="funding-amount">{fundingOverview.totalAmount}</div>
          <div className="funding-label">{fundingOverview.label}</div>
        </div>

        <div className="funding-cards">
          {fundingData.map((item, index) => (
            <div key={index} className="funding-card">
              <h3>{item.icon} {item.title}</h3>
              <div className="amount">{item.amount}</div>
              <p>{item.description}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '25px' }}>
          {fundingButtons.map((button, index) => (
            <a key={index} href={button.href} className={`btn btn-${button.type}`}>
              {button.text}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FundingSection;
