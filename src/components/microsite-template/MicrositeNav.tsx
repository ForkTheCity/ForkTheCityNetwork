import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '@/lib/api/localStorage';
import { Member } from '@/types';

interface MicrositeNavProps {
  cityName?: string;
}

const MicrositeNav: React.FC<MicrositeNavProps> = ({ cityName = '[City Name]' }) => {
  const navigate = useNavigate();
  const [currentMember, setCurrentMember] = useState<Member | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const member = authApi.getCurrentMember();
    setCurrentMember(member);
  }, []);

  const handleLogout = () => {
    authApi.logout();
    navigate('/registration/signup');
  };

  return (
    <nav>
      <div className="container nav-container">
        <Link to="/microsite" className="logo">{cityName} FTC</Link>
        <ul className="nav-links">
          <li><a href="#issues">Posts</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#volunteers">Volunteers</a></li>
          <li><a href="#funding">Funding</a></li>
          <li><Link to="/posts/create" className="btn btn-primary btn-sm">New Post</Link></li>
        </ul>
        
        {currentMember && (
          <div className="user-menu">
            <button 
              className="user-button"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <span className="user-initials">
                {currentMember.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
              </span>
              <span className="user-name">{currentMember.name}</span>
            </button>
            
            {showUserMenu && (
              <div className="user-dropdown">
                <div className="user-info">
                  <strong>{currentMember.name}</strong>
                  <small>{currentMember.email}</small>
                </div>
                <div className="dropdown-divider"></div>
                <Link to="/profile" className="dropdown-item">My Profile</Link>
                <Link to="/registration/entity" className="dropdown-item">Register Entity</Link>
                <div className="dropdown-divider"></div>
                <button onClick={handleLogout} className="dropdown-item logout">
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        .nav-container {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex: 1;
        }

        .btn-sm {
          padding: 0.5rem 1rem;
          font-size: 0.9rem;
        }

        .user-menu {
          position: relative;
        }

        .user-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .user-button:hover {
          border-color: var(--primary-color);
          background: #f7fafc;
        }

        .user-initials {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          background: var(--primary-color);
          color: white;
          border-radius: 50%;
          font-weight: 600;
          font-size: 0.85rem;
        }

        .user-name {
          font-weight: 500;
          color: var(--text-primary);
        }

        .user-dropdown {
          position: absolute;
          top: calc(100% + 0.5rem);
          right: 0;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          min-width: 220px;
          z-index: 1000;
        }

        .user-info {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .user-info strong {
          color: var(--text-primary);
        }

        .user-info small {
          color: var(--text-secondary);
          font-size: 0.85rem;
        }

        .dropdown-divider {
          height: 1px;
          background: #e2e8f0;
          margin: 0.5rem 0;
        }

        .dropdown-item {
          display: block;
          width: 100%;
          padding: 0.75rem 1rem;
          text-align: left;
          background: none;
          border: none;
          color: var(--text-primary);
          text-decoration: none;
          cursor: pointer;
          transition: background 0.2s;
        }

        .dropdown-item:hover {
          background: #f7fafc;
        }

        .dropdown-item.logout {
          color: #e53e3e;
        }

        @media (max-width: 768px) {
          .user-name {
            display: none;
          }

          .nav-links {
            gap: 0.75rem;
            font-size: 0.9rem;
          }

          .nav-links li a:not(.btn) {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
};

export default MicrositeNav;
