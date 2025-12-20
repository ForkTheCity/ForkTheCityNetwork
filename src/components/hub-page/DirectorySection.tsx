import React, { useState, useEffect } from 'react';

interface City {
  name: string;
  url: string;
  members: number;
}

const DirectorySection: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    // Example structure - in production, this would be an API call
    const loadedCities: City[] = [
      { name: "Microsite Template", url: "/microsite", members: 0 }
    ];
    setCities(loadedCities);
  }, []);

  return (
    <section id="directory" className="directory-section decorative-bg">
      <div className="container">
        <h2>Community Directory</h2>
        <p style={{ textAlign: 'center', color: '#4a5568', marginBottom: '25px', fontSize: '0.9em' }}>
          Explore ForkTheCity instances around the world
        </p>
        
        {cities.length === 0 ? (
          <div className="empty-state">
            <p>🌱 No communities forked yet. Be the first to start one!</p>
          </div>
        ) : (
          <div className="directory-grid">
            {cities.map((city, index) => (
              <div key={index} className="city-card">
                {city.members === 0 && (
                  <span className="template-badge">📋 Template</span>
                )}
                <h3>{city.name}</h3>
                <p>
                  {city.members === 0 
                    ? "Try the interactive demo" 
                    : `${city.members} members`}
                </p>
                <a 
                  href={city.url} 
                  target={city.url.startsWith('http') ? '_blank' : undefined}
                  rel={city.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {city.members === 0 ? 'View Demo →' : 'Visit Instance →'}
                </a>
              </div>
            ))}
          </div>
        )}

        <style>{`
          .template-badge {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 0.4rem 0.8rem;
            border-radius: 6px;
            font-size: 0.8rem;
            font-weight: 600;
          }

          .city-card {
            position: relative;
          }
        `}</style>
      </div>
    </section>
  );
};

export default DirectorySection;
