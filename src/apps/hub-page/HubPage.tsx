import React from 'react';
import HubHeader from '@components/hub-page/HubHeader';
import Timeline from '@components/hub-page/Timeline';
import VolunteerGallery from '@components/hub-page/VolunteerGallery';
import DirectorySection from '@components/hub-page/DirectorySection';
import EthicsSection from '@components/hub-page/EthicsSection';
import HubFooter from '@components/hub-page/HubFooter';
import '@styles/hub-page.css';
import '@styles/animations.css';
import '@styles/images.css';
import '@styles/timeline.css';

const HubPage: React.FC = () => {
  return (
    <>
      <HubHeader />
      <Timeline />
      <VolunteerGallery />
      <DirectorySection />
      <EthicsSection />
      <HubFooter />
    </>
  );
};

export default HubPage;
