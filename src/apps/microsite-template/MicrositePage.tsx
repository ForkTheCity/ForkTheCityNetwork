import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MicrositeNav from '@components/microsite-template/MicrositeNav';
import MicrositeHero from '@components/microsite-template/MicrositeHero';
import IssuesSection from '@components/microsite-template/IssuesSection';
import ProjectsSection from '@components/microsite-template/ProjectsSection';
import VolunteersSection from '@components/microsite-template/VolunteersSection';
import FundingSection from '@components/microsite-template/FundingSection';
import MicrositeFooter from '@components/microsite-template/MicrositeFooter';
import { authApi } from '@/lib/api/localStorage';
import '@styles/microsite.css';
import '@styles/animations.css';
import '@styles/images.css';

const MicrositePage: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check authentication on mount
    const authenticated = authApi.isAuthenticated();
    setIsAuthenticated(authenticated);
    setIsChecking(false);

    // Redirect to signup if not authenticated
    if (!authenticated) {
      navigate('/registration/signup');
    }
  }, [navigate]);

  // Show loading state while checking auth
  if (isChecking) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        fontSize: '1.2rem',
        color: '#667eea'
      }}>
        Loading...
      </div>
    );
  }

  // Don't render microsite until authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <MicrositeNav />
      <MicrositeHero />
      <IssuesSection />
      <ProjectsSection />
      <VolunteersSection />
      <FundingSection />
      <MicrositeFooter />
    </>
  );
};

export default MicrositePage;
