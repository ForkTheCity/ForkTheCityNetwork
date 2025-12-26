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
        <Route path="microsite/login" element={<LoginPage />} />

        {/* Authentication redirect */}
        <Route path="/login" element={<Navigate to="/microsite/login" replace />} />
        
        {/* Registration Flow */}
        <Route path="microsite/registration/signup" element={<MemberSignupPage />} />
        <Route path="microsite/registration/volunteer" element={<VolunteerProfilePage />} />
        <Route path="microsite/registration/entity" element={<EntityRegistrationPage />} />

        {/* Registration Redirects */}
        <Route path="/registration/signup" element={<Navigate to="/microsite/registration/signup" replace />} />
        <Route path="/registration/volunteer" element={<Navigate to="/microsite/registration/volunteer" replace />} />
        <Route path="/registration/entity" element={<Navigate to="/microsite/registration/entity" replace />} />
        
        {/* Post Management */}
        <Route path="/microsite/posts/create" element={<CreatePostPage />} />
        <Route path="/microsite/posts/:postId" element={<PostDetailPage />} />

        {/* Post Management Redirects */}
        <Route path="/posts/create" element={<Navigate to="/microsite/posts/create" replace />} />
        <Route path="/posts/:postId" element={<Navigate to="/microsite/posts/:postId" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
