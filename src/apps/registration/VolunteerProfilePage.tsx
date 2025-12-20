import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { volunteerApi, authApi } from '@/lib/api/localStorage';
import '@styles/microsite.css';

const VolunteerProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [currentMember] = useState(authApi.getCurrentMember());
  const [formData, setFormData] = useState({
    skills: [] as string[],
    skillInput: '',
    availability: '',
    preferredJobs: [] as string[],
    jobInput: '',
    bio: ''
  });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!currentMember) {
      navigate('/registration/signup');
    }
  }, [currentMember, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addSkill = () => {
    if (formData.skillInput.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, prev.skillInput.trim()],
        skillInput: ''
      }));
    }
  };

  const removeSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const addJob = () => {
    if (formData.jobInput.trim()) {
      setFormData(prev => ({
        ...prev,
        preferredJobs: [...prev.preferredJobs, prev.jobInput.trim()],
        jobInput: ''
      }));
    }
  };

  const removeJob = (index: number) => {
    setFormData(prev => ({
      ...prev,
      preferredJobs: prev.preferredJobs.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!currentMember) {
      setError('Please sign up first');
      return;
    }

    if (formData.skills.length === 0) {
      setError('Please add at least one skill');
      return;
    }

    if (formData.preferredJobs.length === 0) {
      setError('Please add at least one job preference');
      return;
    }

    if (!formData.availability) {
      setError('Please select your availability');
      return;
    }

    setIsLoading(true);

    try {
      volunteerApi.create(currentMember.id, {
        skills: formData.skills,
        availability: formData.availability,
        preferredJobs: formData.preferredJobs,
        bio: formData.bio || undefined
      });

      // Go to entity registration next
      navigate('/registration/entity');
    } catch (err: any) {
      setError(err.message || 'Failed to create volunteer profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    navigate('/registration/entity');
  };

  if (!currentMember) return null;

  return (
    <div className="registration-container">
      <div className="registration-card wide">
        <div className="registration-header">
          <h1>Set Up Your Volunteer Profile</h1>
          <p>Tell us about your skills and availability so we can match you with opportunities</p>
        </div>

        <form onSubmit={handleSubmit} className="registration-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="skills">Your Skills *</label>
            <div className="tag-input-group">
              <input
                type="text"
                id="skillInput"
                name="skillInput"
                value={formData.skillInput}
                onChange={handleChange}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                placeholder="e.g., Carpentry, Gardening, Teaching..."
              />
              <button type="button" onClick={addSkill} className="btn btn-secondary btn-sm">
                Add
              </button>
            </div>
            <div className="tags-list">
              {formData.skills.map((skill, index) => (
                <span key={index} className="tag">
                  {skill}
                  <button type="button" onClick={() => removeSkill(index)} className="tag-remove">
                    ×
                  </button>
                </span>
              ))}
            </div>
            {formData.skills.length === 0 && (
              <p className="field-hint">Add skills you can contribute to community projects</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="preferredJobs">Jobs You're Willing To Do *</label>
            <div className="tag-input-group">
              <input
                type="text"
                id="jobInput"
                name="jobInput"
                value={formData.jobInput}
                onChange={handleChange}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addJob())}
                placeholder="e.g., Tree planting, Neighborhood cleanup..."
              />
              <button type="button" onClick={addJob} className="btn btn-secondary btn-sm">
                Add
              </button>
            </div>
            <div className="tags-list">
              {formData.preferredJobs.map((job, index) => (
                <span key={index} className="tag">
                  {job}
                  <button type="button" onClick={() => removeJob(index)} className="tag-remove">
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="availability">Availability *</label>
            <select
              id="availability"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              required
            >
              <option value="">Select your availability</option>
              <option value="weekends">Weekends Only</option>
              <option value="evenings">Evenings Only</option>
              <option value="weekdays">Weekdays</option>
              <option value="flexible">Flexible Schedule</option>
              <option value="limited">Limited Availability</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="bio">About You (Optional)</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              placeholder="Tell the community a bit about yourself and why you want to volunteer..."
            />
          </div>

          <div className="button-group">
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Continue'}
            </button>
            <button 
              type="button" 
              onClick={handleSkip}
              className="btn btn-secondary"
            >
              Skip for Now
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .registration-card.wide {
          max-width: 600px;
        }

        .tag-input-group {
          display: flex;
          gap: 0.5rem;
        }

        .tag-input-group input {
          flex: 1;
          padding: 0.875rem;
          border: 2px solid #cbd5e0;
          border-radius: 8px;
          font-size: 1rem;
          color: #2d3748;
          background: white;
          transition: all 0.2s;
        }

        .tag-input-group input::placeholder {
          color: #a0aec0;
        }

        .tag-input-group input:hover {
          border-color: #a0aec0;
        }

        .tag-input-group input:focus {
          outline: none;
          border-color: #5a67d8;
          box-shadow: 0 0 0 3px rgba(90, 103, 216, 0.1);
        }

        .btn-sm {
          padding: 0.875rem 1.5rem;
          font-size: 0.9rem;
          background: #e2e8f0;
          color: #2d3748;
          border: 2px solid #cbd5e0;
          transition: all 0.2s;
        }

        .btn-sm:hover {
          background: #cbd5e0;
          border-color: #a0aec0;
        }

        .tags-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 0.75rem;
        }

        .tag {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #5a67d8;
          color: white;
          padding: 0.5rem 0.875rem;
          border-radius: 6px;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .tag-remove {
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          line-height: 1;
          cursor: pointer;
          padding: 0;
          margin-left: 0.25rem;
          transition: opacity 0.2s;
        }

        .tag-remove:hover {
          opacity: 0.7;
        }

        select {
          padding: 0.875rem;
          border: 2px solid #cbd5e0;
          border-radius: 8px;
          font-size: 1rem;
          background: white;
          color: #2d3748;
          transition: all 0.2s;
        }

        select:hover {
          border-color: #a0aec0;
        }

        select:focus {
          outline: none;
          border-color: #5a67d8;
          box-shadow: 0 0 0 3px rgba(90, 103, 216, 0.1);
        }

        textarea {
          padding: 0.875rem;
          border: 2px solid #cbd5e0;
          border-radius: 8px;
          font-size: 1rem;
          font-family: inherit;
          resize: vertical;
          color: #2d3748;
          background: white;
          transition: all 0.2s;
        }

        textarea::placeholder {
          color: #a0aec0;
        }

        textarea:hover {
          border-color: #a0aec0;
        }

        textarea:focus {
          outline: none;
          border-color: #5a67d8;
          box-shadow: 0 0 0 3px rgba(90, 103, 216, 0.1);
        }

        .button-group {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }

        .button-group button {
          flex: 1;
          padding: 1rem;
          font-size: 1rem;
          font-weight: 600;
        }

        @media (max-width: 640px) {
          .button-group {
            flex-direction: column;
          }

          .tag-input-group {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default VolunteerProfilePage;
