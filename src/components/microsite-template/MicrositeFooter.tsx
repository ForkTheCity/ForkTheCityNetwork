import React, { useEffect } from 'react';
import { setupSmoothScroll } from '@/lib/utils/smoothScroll';
import { micrositeFooterContent } from '@/data/micrositeContent';

interface MicrositeFooterProps {
  cityName?: string;
}

const MicrositeFooter: React.FC<MicrositeFooterProps> = ({ cityName = '[City Name]' }) => {
  useEffect(() => {
    const cleanup = setupSmoothScroll();
    return cleanup;
  }, []);

  return (
    <footer>
      <div className="container">
        <div>
          <h4>{micrositeFooterContent.about.title}</h4>
          <p>
            {micrositeFooterContent.about.description.replace('[City Name]', cityName)}
          </p>
        </div>
        
        <div>
          <h4>{micrositeFooterContent.quickLinks.title}</h4>
          <ul>
            {micrositeFooterContent.quickLinks.links.map((link, index) => (
              <li key={index}><a href={link.href}>{link.text}</a></li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4>{micrositeFooterContent.resources.title}</h4>
          <ul>
            {micrositeFooterContent.resources.links.map((link, index) => (
              <li key={index}><a href={link.href}>{link.text}</a></li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4>{micrositeFooterContent.connect.title}</h4>
          <ul>
            {micrositeFooterContent.connect.links.map((link, index) => (
              <li key={index}><a href={link.href}>{link.text}</a></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>{micrositeFooterContent.copyright.replace('[City Name]', cityName)}</p>
        <p style={{ marginTop: '10px' }}>{micrositeFooterContent.dataOwnership}</p>
      </div>
    </footer>
  );
};

export default MicrositeFooter;
