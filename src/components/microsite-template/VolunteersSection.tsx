import React from 'react';
import { volunteersData } from '@/data/micrositeContent';

const VolunteersSection: React.FC = () => {

  return (
    <section id="volunteers" className="volunteers-section decorative-bg">
      <div className="container">
        <div className="section-header">
          <h2>Our Volunteers</h2>
          <p>The people making it happen</p>
        </div>

        <div className="volunteers-grid">
          {volunteersData.map((volunteer, index) => (
            <div key={index} className="volunteer-card">
              <div className="volunteer-avatar">{volunteer.initials}</div>
              <h3>{volunteer.name}</h3>
              <div className="volunteer-role">{volunteer.role}</div>
              <div className="volunteer-contributions">
                {volunteer.projects} projects • {volunteer.hours} hours
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '25px' }}>
          <a href="#" className="btn btn-accent">Join as Volunteer</a>
        </div>
      </div>
    </section>
  );
};

export default VolunteersSection;
