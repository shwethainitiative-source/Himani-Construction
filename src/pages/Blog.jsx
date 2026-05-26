import React from 'react';
import './Blog.css';

const Blog = () => {
  return (
    <main className="blog-page">
      {/* Featured Post */}
      <section className="featured-post">
        <div className="container">
          <div className="featured-card">
            <div className="featured-img"></div>
            <div className="featured-content">
              <span className="post-meta">Architecture • May 12, 2026</span>
              <h2>The Future of Sustainable Construction: What You Need to Know</h2>
              <p>As environmental concerns grow, the construction industry is rapidly evolving. Discover the latest eco-friendly materials, energy-efficient designs, and sustainable building practices that are shaping the homes and offices of tomorrow.</p>
              <a href="#" className="read-more-btn">Read Article</a>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="recent-posts">
        <div className="container">
          <h2>Recent Articles</h2>
          <div className="posts-grid">
            
            <div className="post-card">
              <div className="post-card-img"></div>
              <div className="post-card-content">
                <span className="post-meta">Interior Design • May 5, 2026</span>
                <h3>5 Color Trends Dominating Modern Living Spaces</h3>
                <p>Explore the vibrant and muted palettes interior designers are using this year to bring spaces to life.</p>
                <a href="#" className="post-card-link">Read More →</a>
              </div>
            </div>

            <div className="post-card">
              <div className="post-card-img"></div>
              <div className="post-card-content">
                <span className="post-meta">Renovation • April 28, 2026</span>
                <h3>How to Survive a Major Home Remodel</h3>
                <p>Renovating can be stressful. Follow our expert guide to prepare your family and protect your sanity during construction.</p>
                <a href="#" className="post-card-link">Read More →</a>
              </div>
            </div>

            <div className="post-card">
              <div className="post-card-img"></div>
              <div className="post-card-content">
                <span className="post-meta">Commercial • April 15, 2026</span>
                <h3>Optimizing Office Layouts for Hybrid Work</h3>
                <p>With remote work here to stay, commercial spaces are adapting. Learn how to design a flexible office environment.</p>
                <a href="#" className="post-card-link">Read More →</a>
              </div>
            </div>

            <div className="post-card">
              <div className="post-card-img"></div>
              <div className="post-card-content">
                <span className="post-meta">Construction Tips • April 2, 2026</span>
                <h3>Choosing the Right Contractor: A Checklist</h3>
                <p>Don't let your dream project turn into a nightmare. Ask these crucial questions before hiring a builder.</p>
                <a href="#" className="post-card-link">Read More →</a>
              </div>
            </div>

            <div className="post-card">
              <div className="post-card-img"></div>
              <div className="post-card-content">
                <span className="post-meta">Materials • March 20, 2026</span>
                <h3>The Rise of Engineered Wood in Modern Builds</h3>
                <p>Why architects are increasingly choosing cross-laminated timber (CLT) for both residential and commercial projects.</p>
                <a href="#" className="post-card-link">Read More →</a>
              </div>
            </div>

            <div className="post-card">
              <div className="post-card-img"></div>
              <div className="post-card-content">
                <span className="post-meta">Project Showcase • March 10, 2026</span>
                <h3>Behind the Scenes: The Skyline Tower Project</h3>
                <p>An exclusive look into the challenges and triumphs of constructing our latest downtown high-rise development.</p>
                <a href="#" className="post-card-link">Read More →</a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default Blog;
