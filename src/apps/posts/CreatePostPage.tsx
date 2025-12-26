import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postApi, categoryApi, authApi, organizationApi, businessApi } from '@/lib/api/localStorage';
import { processImageUploads } from '@/lib/api/imageHandler';
import { DEFAULT_POST_CATEGORIES, Organization, LocalBusiness } from '@/types';
import '@styles/microsite.css';

const CreatePostPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentMember] = useState(authApi.getCurrentMember());
  const [customCategories, setCustomCategories] = useState(categoryApi.getAll());
  const [userOrgs, setUserOrgs] = useState<Organization[]>([]);
  const [userBusinesses, setUserBusinesses] = useState<LocalBusiness[]>([]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    customCategory: '',
    location: '',
    imageFiles: null as FileList | null,
    entityType: 'none' as 'none' | 'organization' | 'business',
    organizationId: '',
    businessId: ''
  });

  const [error, setError] = useState<string>('');
  const [warnings, setWarnings] = useState<string[]>([]);
  const [categoryError, setCategoryError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!currentMember) {
      navigate('/microsite/registration/signup');
      return;
    }

    // Load user's entities
    const orgs = organizationApi.getByOwnerId(currentMember.id);
    const businesses = businessApi.getByOwnerId(currentMember.id);
    setUserOrgs(orgs);
    setUserBusinesses(businesses);
  }, [currentMember, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear category error when changing category
    if (name === 'category' || name === 'customCategory') {
      setCategoryError('');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, imageFiles: e.target.files }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setWarnings([]);
    setCategoryError('');

    if (!currentMember) {
      setError('Please sign in to create a post');
      return;
    }

    // Validation
    if (!formData.title || !formData.description || !formData.location) {
      setError('Please fill in all required fields');
      return;
    }

    // Determine final category
    let finalCategory = formData.category;

    if (formData.category === 'custom') {
      if (!formData.customCategory.trim()) {
        setCategoryError('Please enter a custom category name');
        return;
      }

      // Try to create custom category
      const result = categoryApi.create(currentMember.id, formData.customCategory);

      if ('error' in result) {
        setCategoryError(result.error);
        return;
      }

      finalCategory = result.name;
      // Refresh custom categories list
      setCustomCategories(categoryApi.getAll());
    }

    if (!finalCategory) {
      setError('Please select a category');
      return;
    }

    setIsLoading(true);

    try {
      let images: string[] | undefined;

      // Process images if uploaded
      if (formData.imageFiles && formData.imageFiles.length > 0) {
        const result = await processImageUploads(formData.imageFiles);
        if (result.errors.length > 0) {
          setError(`Image upload failed: ${result.errors.join(', ')}`);
          setIsLoading(false);
          return;
        }
        images = result.base64Images;
        if (result.warnings.length > 0) {
          setWarnings(result.warnings);
        }
      }

      // Determine entity association
      let organizationId: string | undefined;
      let businessId: string | undefined;

      if (formData.entityType === 'organization' && formData.organizationId) {
        organizationId = formData.organizationId;
      } else if (formData.entityType === 'business' && formData.businessId) {
        businessId = formData.businessId;
      }

      // Create post
      const post = postApi.create(currentMember.id, {
        title: formData.title,
        description: formData.description,
        category: finalCategory,
        location: formData.location,
        images,
        organizationId,
        businessId
      });

      // Redirect to post detail or microsite
      navigate(`/microsite/posts/${post.id}`);
    } catch (err: any) {
      setError(err.message || 'Failed to create post');
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentMember) return null;

  const allCategories = [
    ...DEFAULT_POST_CATEGORIES.map(cat => ({
      value: cat,
      label: cat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    })),
    ...customCategories.map(cat => ({
      value: cat.name,
      label: cat.displayName + (cat.verified ? ' ✓' : '')
    }))
  ];

  return (
    <div className="create-post-container">
      <div className="create-post-card">
        <div className="page-header">
          <h1>Create a New Post</h1>
          <p>Share an issue, request, concern, or update with your community</p>
        </div>

        <form onSubmit={handleSubmit} className="create-post-form">
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

          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Brief, descriptive title for your post"
              maxLength={100}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              placeholder="Provide details about your post. What's the issue? What help is needed?"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>
                {allCategories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
                <option value="custom">+ Create New Category</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="location">Location *</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Downtown, Riverside Park"
                required
              />
            </div>
          </div>

          {formData.category === 'custom' && (
            <div className="form-group">
              <label htmlFor="customCategory">New Category Name *</label>
              <input
                type="text"
                id="customCategory"
                name="customCategory"
                value={formData.customCategory}
                onChange={handleChange}
                placeholder="Enter a descriptive category name"
                required
              />
              {categoryError && (
                <div className="field-error">{categoryError}</div>
              )}
              <p className="field-hint">
                Category will be checked for similarity with existing ones to avoid duplicates
              </p>
            </div>
          )}

          {(userOrgs.length > 0 || userBusinesses.length > 0) && (
            <>
              <div className="form-group">
                <label htmlFor="entityType">Post On Behalf Of (Optional)</label>
                <select
                  id="entityType"
                  name="entityType"
                  value={formData.entityType}
                  onChange={handleChange}
                >
                  <option value="none">Myself Only</option>
                  {userOrgs.length > 0 && <option value="organization">An Organization</option>}
                  {userBusinesses.length > 0 && <option value="business">A Business</option>}
                </select>
              </div>

              {formData.entityType === 'organization' && (
                <div className="form-group">
                  <label htmlFor="organizationId">Select Organization *</label>
                  <select
                    id="organizationId"
                    name="organizationId"
                    value={formData.organizationId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choose an organization</option>
                    {userOrgs.map(org => (
                      <option key={org.id} value={org.id}>
                        {org.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {formData.entityType === 'business' && (
                <div className="form-group">
                  <label htmlFor="businessId">Select Business *</label>
                  <select
                    id="businessId"
                    name="businessId"
                    value={formData.businessId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choose a business</option>
                    {userBusinesses.map(business => (
                      <option key={business.id} value={business.id}>
                        {business.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </>
          )}

          <div className="form-group">
            <label htmlFor="images">Images (Optional)</label>
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
            />
            <p className="field-hint">
              You can upload multiple images. Max 500KB per image. PNG, JPG, or GIF.
            </p>
          </div>

          <div className="button-group">
            <button 
              type="submit" 
              className="btn btn-primary btn-lg"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Post...' : 'Create Post'}
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/microsite')}
              className="btn btn-secondary btn-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .create-post-container {
          min-height: 100vh;
          padding: 2rem 1rem;
          background: #f7fafc;
        }

        .create-post-card {
          max-width: 800px;
          margin: 0 auto;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          padding: 2.5rem;
        }

        .page-header {
          margin-bottom: 2rem;
        }

        .page-header h1 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .page-header p {
          color: var(--text-secondary);
          font-size: 1rem;
        }

        .create-post-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .field-error {
          color: #c53030;
          background: #fff5f5;
          padding: 0.75rem;
          border-radius: 6px;
          border: 2px solid #fc8181;
          font-size: 0.875rem;
          margin-top: 0.5rem;
          font-weight: 500;
        }

        .btn-lg {
          padding: 1rem 2rem;
          font-size: 1rem;
          font-weight: 600;
        }

        input[type="file"] {
          padding: 0.875rem;
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
          .create-post-card {
            padding: 1.5rem;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .page-header h1 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CreatePostPage;
