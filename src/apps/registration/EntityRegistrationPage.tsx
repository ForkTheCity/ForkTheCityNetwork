import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { organizationApi, businessApi, authApi } from '@/lib/api/localStorage';
import { processImageUploads } from '@/lib/api/imageHandler';
import { OrganizationType } from '@/types';
import '@styles/microsite.css';

type EntityMode = 'organization' | 'business';

const EntityRegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentMember] = useState(authApi.getCurrentMember());
  const [entityMode, setEntityMode] = useState<EntityMode>('organization');
  
  // Organization form
  const [orgForm, setOrgForm] = useState({
    name: '',
    type: 'nonprofit' as OrganizationType,
    missionStatement: '',
    is501c3: false,
    ein: '',
    address: '',
    contactEmail: '',
    contactPhone: '',
    website: '',
    volunteerNeeds: '',
    logoFile: null as File | null
  });

  // Business form
  const [businessForm, setBusinessForm] = useState({
    name: '',
    businessType: '',
    description: '',
    services: [] as string[],
    serviceInput: '',
    address: '',
    contactEmail: '',
    contactPhone: '',
    website: '',
    hours: '',
    logoFile: null as File | null
  });

  const [error, setError] = useState<string>('');
  const [warnings, setWarnings] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!currentMember) {
      navigate('/microsite/registration/signup');
    }
  }, [currentMember, navigate]);

  const handleOrgChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setOrgForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleBusinessChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBusinessForm(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>, mode: EntityMode) => {
    const file = e.target.files?.[0] || null;
    if (mode === 'organization') {
      setOrgForm(prev => ({ ...prev, logoFile: file }));
    } else {
      setBusinessForm(prev => ({ ...prev, logoFile: file }));
    }
  };

  const addService = () => {
    if (businessForm.serviceInput.trim()) {
      setBusinessForm(prev => ({
        ...prev,
        services: [...prev.services, prev.serviceInput.trim()],
        serviceInput: ''
      }));
    }
  };

  const removeService = (index: number) => {
    setBusinessForm(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  const handleOrgSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setWarnings([]);

    if (!currentMember) {
      setError('Please sign up first');
      return;
    }

    if (!orgForm.name || !orgForm.missionStatement || !orgForm.address || !orgForm.contactEmail) {
      setError('Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    try {
      let logo: string | undefined;

      // Process logo if uploaded
      if (orgForm.logoFile) {
        const result = await processImageUploads([orgForm.logoFile]);
        if (result.errors.length > 0) {
          setError(result.errors[0]);
          setIsLoading(false);
          return;
        }
        logo = result.base64Images[0];
        if (result.warnings.length > 0) {
          setWarnings(result.warnings);
        }
      }

      organizationApi.create(currentMember.id, {
        name: orgForm.name,
        type: orgForm.type,
        missionStatement: orgForm.missionStatement,
        is501c3: orgForm.is501c3,
        ein: orgForm.ein || undefined,
        address: orgForm.address,
        contactEmail: orgForm.contactEmail,
        contactPhone: orgForm.contactPhone || undefined,
        website: orgForm.website || undefined,
        volunteerNeeds: orgForm.volunteerNeeds || undefined,
        logo
      });

      // Redirect to microsite
      navigate('/microsite');
    } catch (err: any) {
      setError(err.message || 'Failed to register organization');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBusinessSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setWarnings([]);

    if (!currentMember) {
      setError('Please sign up first');
      return;
    }

    if (!businessForm.name || !businessForm.businessType || !businessForm.description || 
        !businessForm.address || !businessForm.contactEmail) {
      setError('Please fill in all required fields');
      return;
    }

    if (businessForm.services.length === 0) {
      setError('Please add at least one service');
      return;
    }

    setIsLoading(true);

    try {
      let logo: string | undefined;

      // Process logo if uploaded
      if (businessForm.logoFile) {
        const result = await processImageUploads([businessForm.logoFile]);
        if (result.errors.length > 0) {
          setError(result.errors[0]);
          setIsLoading(false);
          return;
        }
        logo = result.base64Images[0];
        if (result.warnings.length > 0) {
          setWarnings(result.warnings);
        }
      }

      businessApi.create(currentMember.id, {
        name: businessForm.name,
        businessType: businessForm.businessType,
        description: businessForm.description,
        services: businessForm.services,
        address: businessForm.address,
        contactEmail: businessForm.contactEmail,
        contactPhone: businessForm.contactPhone || undefined,
        website: businessForm.website || undefined,
        hours: businessForm.hours || undefined,
        logo
      });

      // Redirect to microsite
      navigate('/microsite');
    } catch (err: any) {
      setError(err.message || 'Failed to register business');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    navigate('/microsite');
  };

  if (!currentMember) return null;

  return (
    <div className="registration-container">
      <div className="registration-card extra-wide">
        <div className="registration-header">
          <h1>Register Your Organization or Business</h1>
          <p>Help the community discover and support local entities</p>
        </div>

        {/* Toggle between Organization and Business */}
        <div className="entity-toggle">
          <button
            type="button"
            className={`toggle-btn ${entityMode === 'organization' ? 'active' : ''}`}
            onClick={() => setEntityMode('organization')}
          >
            🏛️ Organization
          </button>
          <button
            type="button"
            className={`toggle-btn ${entityMode === 'business' ? 'active' : ''}`}
            onClick={() => setEntityMode('business')}
          >
            🏪 Local Business
          </button>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {warnings.length > 0 && (
          <div className="warning-message">
            {warnings.map((warning, i) => <div key={i}>{warning}</div>)}
          </div>
        )}

        {/* Organization Form */}
        {entityMode === 'organization' && (
          <form onSubmit={handleOrgSubmit} className="registration-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Organization Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={orgForm.name}
                  onChange={handleOrgChange}
                  placeholder="Community Helpers Foundation"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="type">Organization Type *</label>
                <select
                  id="type"
                  name="type"
                  value={orgForm.type}
                  onChange={handleOrgChange}
                  required
                >
                  <option value="nonprofit">Nonprofit</option>
                  <option value="grassroots">Grassroots Organization</option>
                  <option value="school">School</option>
                  <option value="university">University</option>
                  <option value="university-org">University Organization</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="missionStatement">Mission Statement *</label>
              <textarea
                id="missionStatement"
                name="missionStatement"
                value={orgForm.missionStatement}
                onChange={handleOrgChange}
                rows={3}
                placeholder="Describe your organization's mission and goals..."
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="is501c3"
                    checked={orgForm.is501c3}
                    onChange={handleOrgChange}
                  />
                  <span>501(c)(3) Tax-Exempt Organization</span>
                </label>
              </div>

              {orgForm.is501c3 && (
                <div className="form-group">
                  <label htmlFor="ein">EIN (Tax ID)</label>
                  <input
                    type="text"
                    id="ein"
                    name="ein"
                    value={orgForm.ein}
                    onChange={handleOrgChange}
                    placeholder="12-3456789"
                  />
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="address">Address *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={orgForm.address}
                onChange={handleOrgChange}
                placeholder="123 Main St, City, State 12345"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contactEmail">Contact Email *</label>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  value={orgForm.contactEmail}
                  onChange={handleOrgChange}
                  placeholder="contact@organization.org"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contactPhone">Contact Phone</label>
                <input
                  type="tel"
                  id="contactPhone"
                  name="contactPhone"
                  value={orgForm.contactPhone}
                  onChange={handleOrgChange}
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="website">Website</label>
              <input
                type="url"
                id="website"
                name="website"
                value={orgForm.website}
                onChange={handleOrgChange}
                placeholder="https://www.organization.org"
              />
            </div>

            <div className="form-group">
              <label htmlFor="volunteerNeeds">Volunteer Needs</label>
              <textarea
                id="volunteerNeeds"
                name="volunteerNeeds"
                value={orgForm.volunteerNeeds}
                onChange={handleOrgChange}
                rows={2}
                placeholder="What kind of volunteers are you looking for?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="logo">Logo (Optional)</label>
              <input
                type="file"
                id="logo"
                accept="image/*"
                onChange={(e) => handleLogoUpload(e, 'organization')}
              />
              <p className="field-hint">Max 500KB. PNG, JPG, or GIF</p>
            </div>

            <div className="button-group">
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? 'Registering...' : 'Register Organization'}
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
        )}

        {/* Business Form */}
        {entityMode === 'business' && (
          <form onSubmit={handleBusinessSubmit} className="registration-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="businessName">Business Name *</label>
                <input
                  type="text"
                  id="businessName"
                  name="name"
                  value={businessForm.name}
                  onChange={handleBusinessChange}
                  placeholder="Joe's Coffee Shop"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="businessType">Business Type *</label>
                <input
                  type="text"
                  id="businessType"
                  name="businessType"
                  value={businessForm.businessType}
                  onChange={handleBusinessChange}
                  placeholder="e.g., Restaurant, Cafe, Bookstore"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={businessForm.description}
                onChange={handleBusinessChange}
                rows={3}
                placeholder="Describe your business and what makes it special..."
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="services">Services/Products *</label>
              <div className="tag-input-group">
                <input
                  type="text"
                  id="serviceInput"
                  name="serviceInput"
                  value={businessForm.serviceInput}
                  onChange={handleBusinessChange}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addService())}
                  placeholder="e.g., Coffee, Pastries, Catering"
                />
                <button type="button" onClick={addService} className="btn btn-secondary btn-sm">
                  Add
                </button>
              </div>
              <div className="tags-list">
                {businessForm.services.map((service, index) => (
                  <span key={index} className="tag">
                    {service}
                    <button type="button" onClick={() => removeService(index)} className="tag-remove">
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="businessAddress">Address *</label>
              <input
                type="text"
                id="businessAddress"
                name="address"
                value={businessForm.address}
                onChange={handleBusinessChange}
                placeholder="123 Main St, City, State 12345"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="businessEmail">Contact Email *</label>
                <input
                  type="email"
                  id="businessEmail"
                  name="contactEmail"
                  value={businessForm.contactEmail}
                  onChange={handleBusinessChange}
                  placeholder="info@business.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="businessPhone">Contact Phone</label>
                <input
                  type="tel"
                  id="businessPhone"
                  name="contactPhone"
                  value={businessForm.contactPhone}
                  onChange={handleBusinessChange}
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="businessWebsite">Website</label>
                <input
                  type="url"
                  id="businessWebsite"
                  name="website"
                  value={businessForm.website}
                  onChange={handleBusinessChange}
                  placeholder="https://www.business.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="hours">Business Hours</label>
                <input
                  type="text"
                  id="hours"
                  name="hours"
                  value={businessForm.hours}
                  onChange={handleBusinessChange}
                  placeholder="Mon-Fri 9AM-5PM"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="businessLogo">Logo (Optional)</label>
              <input
                type="file"
                id="businessLogo"
                accept="image/*"
                onChange={(e) => handleLogoUpload(e, 'business')}
              />
              <p className="field-hint">Max 500KB. PNG, JPG, or GIF</p>
            </div>

            <div className="button-group">
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? 'Registering...' : 'Register Business'}
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
        )}
      </div>

      <style>{`
        .registration-card.extra-wide {
          max-width: 800px;
        }

        .entity-toggle {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          padding: 0.5rem;
          background: #edf2f7;
          border-radius: 12px;
          border: 2px solid #e2e8f0;
        }

        .toggle-btn {
          flex: 1;
          padding: 1rem;
          border: 2px solid transparent;
          background: transparent;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          color: #4a5568;
        }

        .toggle-btn:hover {
          background: white;
          color: #2d3748;
        }

        .toggle-btn.active {
          background: white;
          border-color: #5a67d8;
          color: #5a67d8;
          box-shadow: 0 2px 12px rgba(90, 103, 216, 0.15);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .warning-message {
          background: #fefcbf;
          color: #744210;
          padding: 1rem;
          border-radius: 8px;
          border: 2px solid #f6e05e;
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
          font-weight: 500;
        }

        input[type="file"] {
          padding: 0.75rem;
          border: 2px dashed #cbd5e0;
          border-radius: 8px;
          cursor: pointer;
          background: #f7fafc;
          color: #2d3748;
          transition: all 0.2s;
        }

        input[type="file"]:hover {
          border-color: #a0aec0;
          background: #edf2f7;
        }

        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }

          .entity-toggle {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default EntityRegistrationPage;
