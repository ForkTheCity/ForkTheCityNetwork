import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postApi, responseApi, authApi } from '@/lib/api/localStorage';
import { processImageUploads } from '@/lib/api/imageHandler';
import { PostWithAuthor, ResponseWithAuthor } from '@/types';
import '@styles/microsite.css';

const PostDetailPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [currentMember] = useState(authApi.getCurrentMember());
  const [post, setPost] = useState<PostWithAuthor | null>(null);
  const [responses, setResponses] = useState<ResponseWithAuthor[]>([]);
  const [responseForm, setResponseForm] = useState({
    content: '',
    imageFiles: null as FileList | null
  });
  const [error, setError] = useState<string>('');
  const [warnings, setWarnings] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!currentMember) {
      navigate('/microsite/registration/signup');
      return;
    }

    if (!postId) {
      navigate('/microsite');
      return;
    }

    // Load post with author
    const postData = postApi.getWithAuthor(postId);
    if (!postData) {
      navigate('/microsite');
      return;
    }
    setPost(postData);

    // Load responses
    const postResponses = responseApi.getByPostIdWithAuthors(postId);
    setResponses(postResponses);
  }, [postId, currentMember, navigate]);

  const handleResponseChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResponseForm(prev => ({ ...prev, content: e.target.value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResponseForm(prev => ({ ...prev, imageFiles: e.target.files }));
  };

  const handleSupport = () => {
    if (!postId) return;
    postApi.addSupporter(postId);
    // Reload post to show updated supporter count
    const updatedPost = postApi.getWithAuthor(postId);
    if (updatedPost) setPost(updatedPost);
  };

  const handleResponseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setWarnings([]);

    if (!currentMember || !postId) {
      setError('Please sign in to respond');
      return;
    }

    if (!responseForm.content.trim()) {
      setError('Please enter a response');
      return;
    }

    setIsSubmitting(true);

    try {
      let images: string[] | undefined;

      // Process images if uploaded
      if (responseForm.imageFiles && responseForm.imageFiles.length > 0) {
        const result = await processImageUploads(responseForm.imageFiles);
        if (result.errors.length > 0) {
          setError(`Image upload failed: ${result.errors.join(', ')}`);
          setIsSubmitting(false);
          return;
        }
        images = result.base64Images;
        if (result.warnings.length > 0) {
          setWarnings(result.warnings);
        }
      }

      // Create response
      responseApi.create(postId, currentMember.id, {
        content: responseForm.content,
        images
      });

      // Reload responses
      const updatedResponses = responseApi.getByPostIdWithAuthors(postId);
      setResponses(updatedResponses);

      // Clear form
      setResponseForm({ content: '', imageFiles: null });
      
      // Clear file input
      const fileInput = document.getElementById('responseImages') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (err: any) {
      setError(err.message || 'Failed to submit response');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCategoryLabel = (category: string) => {
    return category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  const getStatusClass = (status: string) => {
    return `status-badge status-${status}`;
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      open: 'Open',
      'in-progress': 'In Progress',
      resolved: 'Resolved',
      closed: 'Closed'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  if (!post || !currentMember) {
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

  return (
    <div className="post-detail-container">
      <div className="post-detail-wrapper">
        <div className="post-header-bar">
          <button onClick={() => navigate('/microsite')} className="back-btn">
            ← Back to Community
          </button>
        </div>

        <div className="post-detail-card">
          {/* Post Header */}
          <div className="post-header">
            <div className="post-title-section">
              <h1>{post.title}</h1>
              <div className="post-meta-header">
                <span className="category-badge">{formatCategoryLabel(post.category)}</span>
                <span className={getStatusClass(post.status)}>{getStatusLabel(post.status)}</span>
              </div>
            </div>

            <div className="post-info">
              <div className="author-info">
                <div className="author-avatar">
                  {post.author.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <strong>{post.author.name}</strong>
                  <small>{formatDate(post.createdAt)}</small>
                </div>
              </div>

              <div className="post-stats">
                <span>📍 {post.location}</span>
                <span>👥 {post.supporters} supporters</span>
              </div>
            </div>

            {(post.organization || post.business) && (
              <div className="post-entity-info">
                {post.organization && (
                  <>
                    <strong>🏛️ Posted by Organization:</strong>
                    <div>{post.organization.name}</div>
                    <div className="entity-details">{post.organization.missionStatement}</div>
                  </>
                )}
                {post.business && (
                  <>
                    <strong>🏪 Posted by Business:</strong>
                    <div>{post.business.name}</div>
                    <div className="entity-details">{post.business.description}</div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Post Content */}
          <div className="post-content">
            <p>{post.description}</p>

            {post.images && post.images.length > 0 && (
              <div className="post-images">
                {post.images.map((image, index) => (
                  <img key={index} src={image} alt={`Post image ${index + 1}`} />
                ))}
              </div>
            )}
          </div>

          {/* Support Button */}
          <div className="post-actions">
            <button onClick={handleSupport} className="btn btn-primary">
              👍 Support This Post
            </button>
          </div>
        </div>

        {/* Responses Section */}
        <div className="responses-section">
          <h2>Responses ({responses.length})</h2>

          {/* Response Form */}
          <form onSubmit={handleResponseSubmit} className="response-form">
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
              <label htmlFor="responseContent">Add Your Response</label>
              <textarea
                id="responseContent"
                value={responseForm.content}
                onChange={handleResponseChange}
                rows={4}
                placeholder="Share your thoughts, offer help, or provide updates..."
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="responseImages">Add Images (Optional)</label>
              <input
                type="file"
                id="responseImages"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-accent"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Posting...' : 'Post Response'}
            </button>
          </form>

          {/* Responses List */}
          <div className="responses-list">
            {responses.length === 0 ? (
              <div className="no-responses">
                <p>No responses yet. Be the first to respond!</p>
              </div>
            ) : (
              responses.map(response => (
                <div key={response.id} className="response-card">
                  <div className="response-header">
                    <div className="response-author">
                      <div className="author-avatar-small">
                        {response.author.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <strong>{response.author.name}</strong>
                        <small>{formatDate(response.createdAt)}</small>
                      </div>
                    </div>
                  </div>

                  <div className="response-content">
                    <p>{response.content}</p>

                    {response.images && response.images.length > 0 && (
                      <div className="response-images">
                        {response.images.map((image, index) => (
                          <img key={index} src={image} alt={`Response image ${index + 1}`} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <style>{`
        .post-detail-container {
          min-height: 100vh;
          background: #f7fafc;
          padding: 2rem 1rem;
        }

        .post-detail-wrapper {
          max-width: 900px;
          margin: 0 auto;
        }

        .post-header-bar {
          margin-bottom: 1.5rem;
        }

        .back-btn {
          padding: 0.75rem 1.5rem;
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 500;
          transition: all 0.2s;
        }

        .back-btn:hover {
          border-color: var(--primary-color);
          background: #f7fafc;
        }

        .post-detail-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          padding: 2.5rem;
          margin-bottom: 2rem;
        }

        .post-header {
          border-bottom: 2px solid #e2e8f0;
          padding-bottom: 1.5rem;
          margin-bottom: 2rem;
        }

        .post-title-section h1 {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .post-meta-header {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .category-badge {
          display: inline-block;
          padding: 0.4rem 0.8rem;
          background: var(--primary-color);
          color: white;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .status-badge {
          display: inline-block;
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .status-badge.status-open {
          background: #48bb78;
          color: white;
        }

        .status-badge.status-in-progress {
          background: #ed8936;
          color: white;
        }

        .status-badge.status-resolved {
          background: #667eea;
          color: white;
        }

        .status-badge.status-closed {
          background: #a0aec0;
          color: white;
        }

        .post-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1.5rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .author-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .author-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--primary-color);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 1.1rem;
        }

        .author-info > div {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .author-info strong {
          font-size: 1rem;
          color: var(--text-primary);
        }

        .author-info small {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .post-stats {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          font-size: 0.95rem;
          color: var(--text-secondary);
        }

        .post-entity-info {
          margin-top: 1.5rem;
          padding: 1rem;
          background: #f7fafc;
          border-radius: 8px;
          border-left: 4px solid var(--primary-color);
        }

        .post-entity-info strong {
          display: block;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .entity-details {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-top: 0.25rem;
        }

        .post-content {
          line-height: 1.8;
          color: var(--text-primary);
          font-size: 1.05rem;
        }

        .post-content p {
          margin-bottom: 1rem;
        }

        .post-images {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .post-images img {
          width: 100%;
          height: 250px;
          object-fit: cover;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .post-actions {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 2px solid #e2e8f0;
        }

        .responses-section {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          padding: 2.5rem;
        }

        .responses-section h2 {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
        }

        .response-form {
          background: #f7fafc;
          padding: 1.5rem;
          border-radius: 8px;
          margin-bottom: 2rem;
        }

        .response-form .form-group {
          margin-bottom: 1rem;
        }

        .response-form label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .response-form textarea {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          font-family: inherit;
          resize: vertical;
        }

        .response-form textarea:focus {
          outline: none;
          border-color: var(--primary-color);
        }

        .response-form input[type="file"] {
          width: 100%;
          padding: 0.75rem;
          border: 2px dashed #e2e8f0;
          border-radius: 8px;
          cursor: pointer;
        }

        .responses-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .response-card {
          padding: 1.5rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          background: #fafafa;
        }

        .response-header {
          margin-bottom: 1rem;
        }

        .response-author {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .author-avatar-small {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--secondary-color);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .response-author > div {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .response-author strong {
          font-size: 0.95rem;
          color: var(--text-primary);
        }

        .response-author small {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .response-content p {
          line-height: 1.6;
          color: var(--text-primary);
        }

        .response-images {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .response-images img {
          width: 100%;
          height: 150px;
          object-fit: cover;
          border-radius: 6px;
        }

        .no-responses {
          text-align: center;
          padding: 3rem 1rem;
          color: var(--text-secondary);
        }

        @media (max-width: 768px) {
          .post-detail-card {
            padding: 1.5rem;
          }

          .post-title-section h1 {
            font-size: 1.5rem;
          }

          .post-info {
            flex-direction: column;
            align-items: flex-start;
          }

          .post-images {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default PostDetailPage;
