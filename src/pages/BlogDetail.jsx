import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabaseService } from '../utils/supabaseService';
import './BlogDetail.css';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      setLoading(true);
      try {
        const allBlogs = await supabaseService.getBlogs();
        const activeBlog = allBlogs.find(b => b.id.toString() === id);
        
        if (activeBlog) {
          setBlog(activeBlog);
          // Get up to 3 related articles from the same category or just recent ones
          const related = allBlogs
            .filter(b => b.id.toString() !== id)
            .slice(0, 3);
          setRelatedBlogs(related);
        }
      } catch (err) {
        console.error("Error fetching blog detail:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetail();
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <main className="blog-detail-page loading-state">
        <div className="spinner"></div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </main>
    );
  }

  if (!blog) {
    return (
      <main className="blog-detail-page error-state">
        <div className="container text-center">
          <h2>Article Not Found</h2>
          <p>We couldn't find the article you were looking for. It may have been moved or deleted.</p>
          <Link to="/blog" className="back-link-btn">← Back to Articles</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="blog-detail-page">
      {/* Top Navigation / Breadcrumbs */}
      <div className="blog-detail-nav container">
        <Link to="/blog" className="back-link">
          <span className="arrow">←</span> Back to Articles
        </Link>
        <span className="separator">/</span>
        <span className="active-breadcrumb">{blog.category}</span>
      </div>

      {/* Article Header */}
      <header className="article-header container">
        <div className="article-meta">
          <span className="article-category">{blog.category}</span>
          <span className="dot">•</span>
          <span className="article-date">{blog.date}</span>
        </div>
        <h1 className="article-title">{blog.title}</h1>
      </header>

      {/* Article Cover Image */}
      <div className="article-cover-container container">
        <img src={blog.img} alt={blog.title} className="article-cover-img" />
      </div>

      {/* Article Content Layout */}
      <div className="article-layout container">
        <article className="article-body">
          {/* We format paragraph line-breaks dynamically */}
          {blog.description.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          
          <div className="article-footer-signature">
            <hr />
            <p className="signature-text">
              Thank you for reading Himani Construction's design and construction insights. For professional design advice, construction consultations, or custom builder solutions, please contact our expert team.
            </p>
            <div className="signature-cta">
              <Link to="/contact" className="cta-button">Get In Touch With Us</Link>
            </div>
          </div>
        </article>
      </div>

      {/* Post Article Bottom Nav */}
      <div className="article-bottom-nav container">
        <Link to="/blog" className="back-link-bottom">
          ← Back to Articles
        </Link>
      </div>

      {/* Related / Suggested Reads Section */}
      {relatedBlogs.length > 0 && (
        <section className="suggested-reads">
          <div className="container">
            <h2 className="suggested-title">You Might Also Like</h2>
            <div className="suggested-grid">
              {relatedBlogs.map((post) => (
                <Link to={`/blog/${post.id}`} className="suggested-card" key={post.id}>
                  <div 
                    className="suggested-card-img" 
                    style={{ backgroundImage: `url(${post.img})` }}
                  ></div>
                  <div className="suggested-card-content">
                    <span className="suggested-meta">{post.category} • {post.date}</span>
                    <h3>{post.title}</h3>
                    <span className="read-more-link">Read Article →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default BlogDetail;
