import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HubPage from './apps/hub-page/HubPage';
import MicrositePage from './apps/microsite-template/MicrositePage';
import LoginPage from './apps/registration/LoginPage';
import MemberSignupPage from './apps/registration/MemberSignupPage';
import VolunteerProfilePage from './apps/registration/VolunteerProfilePage';
import EntityRegistrationPage from './apps/registration/EntityRegistrationPage';
import CreatePostPage from './apps/posts/CreatePostPage';
import PostDetailPage from './apps/posts/PostDetailPage';
import './styles/global.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/hub" replace />} />
        <Route path="/hub" element={<HubPage />} />
        <Route path="/template" element={<MicrositePage />} />
        <Route path="/microsite" element={<MicrositePage />} />
        
        {/* Authentication */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Registration Flow */}
        <Route path="/registration/signup" element={<MemberSignupPage />} />
        <Route path="/registration/volunteer" element={<VolunteerProfilePage />} />
        <Route path="/registration/entity" element={<EntityRegistrationPage />} />
        
        {/* Post Management */}
        <Route path="/posts/create" element={<CreatePostPage />} />
        <Route path="/posts/:postId" element={<PostDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
