import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { memberApi } from '@/lib/api/localStorage';
import '@styles/microsite.css';

const MemberSignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    wantsToVolunteer: false
  });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      memberApi.create({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      // Redirect based on volunteer preference
      if (formData.wantsToVolunteer) {
        navigate('/registration/volunteer');
      } else {
        navigate('/registration/entity');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-card">
        <div className="registration-header">
          <h1>Join Your Community</h1>
          <p>Create a member account to start participating in local civic projects</p>
        </div>

        <form onSubmit={handleSubmit} className="registration-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Jane Doe"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="jane@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password *</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              required
            />
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="wantsToVolunteer"
                checked={formData.wantsToVolunteer}
                onChange={handleChange}
              />
              <span>I want to volunteer in my community</span>
            </label>
            <p className="field-hint">
              {formData.wantsToVolunteer 
                ? "Great! We'll help you set up your volunteer profile next."
                : "You can always register as a volunteer later from your profile."}
            </p>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-full"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="registration-footer">
          <p>Already have an account? <a href="/login">Sign in</a></p>
        </div>
      </div>

      <style>{`
        .registration-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
          padding: 2rem 1rem;
        }

        .registration-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          max-width: 500px;
          width: 100%;
          padding: 2.5rem;
        }

        .registration-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .registration-header h1 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          color: #1a202c;
          font-weight: 700;
        }

        .registration-header p {
          color: #4a5568;
          font-size: 1rem;
          line-height: 1.5;
        }

        .registration-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-weight: 600;
          color: #2d3748;
          font-size: 0.95rem;
        }

        .form-group input[type="text"],
        .form-group input[type="email"],
        .form-group input[type="password"] {
          padding: 0.875rem;
          border: 2px solid #cbd5e0;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.2s;
          background: white;
          color: #2d3748;
        }

        .form-group input::placeholder {
          color: #a0aec0;
        }

        .form-group input:hover {
          border-color: #a0aec0;
        }

        .form-group input:focus {
          outline: none;
          border-color: #5a67d8;
          box-shadow: 0 0 0 3px rgba(90, 103, 216, 0.1);
        }

        .checkbox-group {
          background: #edf2f7;
          padding: 1.25rem;
          border-radius: 10px;
          border: 2px solid #e2e8f0;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          font-weight: 500;
          color: #2d3748;
        }

        .checkbox-label input[type="checkbox"] {
          width: 20px;
          height: 20px;
          cursor: pointer;
          accent-color: #5a67d8;
        }

        .field-hint {
          margin-top: 0.5rem;
          font-size: 0.875rem;
          color: #718096;
          line-height: 1.5;
        }

        .error-message {
          background: #fff5f5;
          color: #c53030;
          padding: 1rem;
          border-radius: 8px;
          border: 2px solid #fc8181;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .btn-full {
          width: 100%;
          padding: 1rem;
          font-size: 1rem;
          font-weight: 600;
          transition: all 0.2s;
        }

        .btn-primary {
          background: #5a67d8;
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          background: #4c51bf;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(90, 103, 216, 0.3);
        }

        .btn-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          background: #a0aec0;
        }

        .registration-footer {
          margin-top: 1.5rem;
          text-align: center;
          padding-top: 1.5rem;
          border-top: 2px solid #e2e8f0;
        }

        .registration-footer p {
          color: #4a5568;
          font-size: 0.95rem;
        }

        .registration-footer a {
          color: #5a67d8;
          text-decoration: none;
          font-weight: 600;
        }

        .registration-footer a:hover {
          color: #4c51bf;
          text-decoration: underline;
        }

        @media (max-width: 640px) {
          .registration-card {
            padding: 1.5rem;
          }

          .registration-header h1 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default MemberSignupPage;
