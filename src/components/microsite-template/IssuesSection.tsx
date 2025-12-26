import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';
import { postApi, categoryApi } from '@/lib/api/localStorage';
import { PostWithAuthor, DEFAULT_POST_CATEGORIES } from '@/types';

const PostsSection: React.FC = () => {
  const [posts, setPosts] = useState<PostWithAuthor[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostWithAuthor[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [allCategories, setAllCategories] = useState<string[]>([]);

  useEffect(() => {
    // Load all posts with author information
    const allPosts = postApi.getAllWithAuthors();
    setPosts(allPosts);
    setFilteredPosts(allPosts);

    // Build category list
    const categories = categoryApi.getAllCategoryNames();
    setAllCategories(categories);
  }, []);

  useEffect(() => {
    // Filter posts by category
    if (selectedCategory === 'all') {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(post => post.category === selectedCategory));
    }
  }, [selectedCategory, posts]);

  const getStatusClass = (status: string) => {
    return `issue-status status-${status}`;
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

  const formatCategoryLabel = (category: string) => {
    return category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`;
    if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    if (diffDays < 7) return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} ${Math.floor(diffDays / 7) === 1 ? 'week' : 'weeks'} ago`;
    return `${Math.floor(diffDays / 30)} ${Math.floor(diffDays / 30) === 1 ? 'month' : 'months'} ago`;
  };

  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation();
  
  return (
    <section id="issues" className="issues-section parallax-section decorative-bg" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2 className={`animate-on-scroll animate-fade-up ${sectionVisible ? 'visible' : ''}`}>Community Posts</h2>
          <p className={`animate-on-scroll animate-fade-up ${sectionVisible ? 'visible' : ''}`}>
            Issues, requests, concerns, and updates from the community
          </p>
        </div>

        {/* Category Filter */}
        <div className="category-filter">
          <button
            className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            All Posts ({posts.length})
          </button>
          {allCategories.map(category => {
            const count = posts.filter(p => p.category === category).length;
            if (count === 0) return null;
            return (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {formatCategoryLabel(category)} ({count})
              </button>
            );
          })}
        </div>

        {filteredPosts.length === 0 ? (
          <div className="no-posts">
            <p>No posts yet in this category. Be the first to create one!</p>
            <Link to="microsite/posts/create" className="btn btn-primary">
              Create First Post
            </Link>
          </div>
        ) : (
          <div className="issues-grid">
            {filteredPosts.map((post) => (
              <Link 
                key={post.id} 
                to={`/microsite/posts/${post.id}`}
                className={`issue-card card-dynamic animate-on-scroll animate-fade-up ${sectionVisible ? 'visible' : ''}`}
              >
                <div className="issue-header">
                  <div>
                    <h3>{post.title}</h3>
                    <span className="post-category">{formatCategoryLabel(post.category)}</span>
                  </div>
                  <span className={getStatusClass(post.status)}>
                    {getStatusLabel(post.status)}
                  </span>
                </div>
                <p>{post.description.length > 150 ? post.description.slice(0, 150) + '...' : post.description}</p>
                
                {/* Show organization or business if associated */}
                {(post.organization || post.business) && (
                  <div className="post-entity">
                    {post.organization && (
                      <span>🏛️ {post.organization.name}</span>
                    )}
                    {post.business && (
                      <span>🏪 {post.business.name}</span>
                    )}
                  </div>
                )}

                <div className="issue-meta">
                  <span>👤 {post.author.name}</span>
                  <span>📍 {post.location}</span>
                  <span>👥 {post.supporters} supporters</span>
                  <span>📅 {getTimeAgo(post.createdAt)}</span>
                </div>

                {post.images && post.images.length > 0 && (
                  <div className="post-images-indicator">
                    📷 {post.images.length} {post.images.length === 1 ? 'image' : 'images'}
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '25px' }}>
          <Link to="/posts/create" className="btn btn-accent">Create New Post</Link>
        </div>
      </div>

      <style>{`
        .category-filter {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 2rem;
          justify-content: center;
        }

        .filter-btn {
          padding: 0.5rem 1rem;
          border: 2px solid #e2e8f0;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.2s;
        }

        .filter-btn:hover {
          border-color: var(--primary-color);
          background: #f7fafc;
        }

        .filter-btn.active {
          background: var(--primary-color);
          color: white;
          border-color: var(--primary-color);
        }

        .post-category {
          display: inline-block;
          font-size: 0.75rem;
          padding: 0.25rem 0.5rem;
          background: var(--primary-color);
          color: white;
          border-radius: 4px;
          margin-left: 0.5rem;
        }

        .post-entity {
          padding: 0.5rem;
          background: #f7fafc;
          border-radius: 6px;
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-top: 0.5rem;
        }

        .post-images-indicator {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-top: 0.5rem;
        }

        .no-posts {
          text-align: center;
          padding: 3rem 1rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .no-posts p {
          font-size: 1.1rem;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }

        .issue-card {
          text-decoration: none;
          color: inherit;
          display: block;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .issue-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }

        .issue-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
        }

        .issue-header > div {
          flex: 1;
        }

        @media (max-width: 768px) {
          .category-filter {
            justify-content: flex-start;
          }

          .filter-btn {
            font-size: 0.8rem;
            padding: 0.4rem 0.8rem;
          }
        }
      `}</style>
    </section>
  );
};

export default PostsSection;
