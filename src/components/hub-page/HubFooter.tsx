import React from 'react';
import { footerContent } from '@/data/hubPageContent';

const HubFooter: React.FC = () => {
  return (
    <footer>
      <div className="container">
        <p>{footerContent.copyright}</p>
        <p>{footerContent.tagline}</p>
        <p style={{ marginTop: '20px' }}>
          {footerContent.links.map((link, index) => (
            <React.Fragment key={index}>
              {index > 0 && ' • '}
              <a
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
              >
                {link.text}
              </a>
            </React.Fragment>
          ))}
        </p>
      </div>
    </footer>
  );
};

export default HubFooter;
