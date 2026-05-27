import React, { useState, useEffect } from 'react';
import { supabaseService } from '../utils/supabaseService';
import './Blog.css';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const data = await supabaseService.getBlogs();
        setBlogs(data);
      } catch (err) {
        console.error("Error loading blog posts from Supabase:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <main className="blog-page" style={{ padding: '100px 0', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '15px' }}>
        <div style={{
          border: '3px solid rgba(55, 26, 16, 0.1)',
          width: '35px',
          height: '35px',
          borderRadius: '50%',
          borderLeftColor: '#371A10',
          animation: 'spin 1s linear infinite'
        }}></div>
        <span style={{ color: 'var(--color-dark-brown)', opacity: 0.6, fontSize: '0.95rem', fontFamily: "'Poppins', sans-serif" }}>
          Loading insights from Supabase...
        </span>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </main>
    );
  }

  if (blogs.length === 0) {
    return (
      <main className="blog-page" style={{ padding: '100px 0', minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ color: 'var(--color-dark-brown)', marginBottom: '15px' }}>Our Blog & Insights</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>No articles published yet. Check back soon for industry insights and design tips!</p>
        </div>
      </main>
    );
  }

  // Find the featured post. If none marked, default to the most recent post
  const featuredPost = blogs.find(b => b.featured) || blogs[0];
  
  // List all other posts in the grid
  const recentPosts = blogs.filter(b => b.id !== (featuredPost ? featuredPost.id : null));

  return (
    <main className="blog-page">
      {/* Featured Post */}
      {featuredPost && (
        <section className="featured-post">
          <div className="container">
            <div className="featured-card">
              <div 
                className="featured-img" 
                style={{ 
                  backgroundImage: `url(${featuredPost.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
              <div className="featured-content">
                <span className="post-meta">{featuredPost.category} • {featuredPost.date}</span>
                <h2>{featuredPost.title}</h2>
                <p>{featuredPost.description}</p>
                <a href="#" className="read-more-btn" onClick={(e) => e.preventDefault()}>Read Article</a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts Grid */}
      <section className="recent-posts">
        <div className="container">
          <h2>Recent Articles</h2>
          {recentPosts.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '1.1rem', marginTop: '20px' }}>
              Check back soon for more exciting updates!
            </p>
          ) : (
            <div className="posts-grid">
              {recentPosts.map((post) => (
                <div className="post-card" key={post.id}>
                  <div 
                    className="post-card-img" 
                    style={{ backgroundImage: `url(${post.img})` }}
                  ></div>
                  <div className="post-card-content">
                    <span className="post-meta">{post.category} • {post.date}</span>
                    <h3>{post.title}</h3>
                    <p>{post.description}</p>
                    <a href="#" className="post-card-link" onClick={(e) => e.preventDefault()}>Read More →</a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Blog;
