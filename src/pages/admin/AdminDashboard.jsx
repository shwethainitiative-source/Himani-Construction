import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../utils/db';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects');
  
  // Database state
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);

  // Stats
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalBlogs: 0,
    recentCount: 0
  });

  // Modal / Form state for Projects
  const [showProjModal, setShowProjModal] = useState(false);
  const [editingProj, setEditingProj] = useState(null); // null means adding new
  const [projForm, setProjForm] = useState({
    title: '',
    category: 'residential',
    description: '',
    date: new Date().toISOString().split('T')[0],
    img: ''
  });

  // Modal / Form state for Blogs
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null); // null means adding new
  const [blogForm, setBlogForm] = useState({
    title: '',
    category: 'Architecture',
    description: '',
    date: new Date().toISOString().split('T')[0],
    img: '',
    featured: false
  });

  // Load database content
  const loadData = () => {
    const allProj = db.getProjects();
    const allBlogs = db.getBlogs();
    setProjects(allProj);
    setBlogs(allBlogs);

    // Calculate dynamic stats
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const recentProj = allProj.filter(p => {
      const pTime = new Date(p.date).getTime();
      return pTime >= thirtyDaysAgo;
    }).length;
    const recentBlogs = allBlogs.filter(b => {
      const bTime = new Date(b.date).getTime();
      return bTime >= thirtyDaysAgo;
    }).length;

    setStats({
      totalProjects: allProj.length,
      totalBlogs: allBlogs.length,
      recentCount: recentProj + recentBlogs
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogout = () => {
    db.logout();
    navigate('/admin/login');
  };

  // Image upload base64 converter
  const handleImageFileChange = (e, formType) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (formType === 'project') {
          setProjForm(prev => ({ ...prev, img: reader.result }));
        } else {
          setBlogForm(prev => ({ ...prev, img: reader.result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Projects CRUD Actions
  const handleOpenProjAdd = () => {
    setEditingProj(null);
    setProjForm({
      title: '',
      category: 'residential',
      description: '',
      date: new Date().toISOString().split('T')[0],
      img: ''
    });
    setShowProjModal(true);
  };

  const handleOpenProjEdit = (proj) => {
    setEditingProj(proj);
    setProjForm({
      title: proj.title,
      category: proj.category,
      description: proj.description,
      date: proj.date,
      img: proj.img
    });
    setShowProjModal(true);
  };

  const handleProjSubmit = (e) => {
    e.preventDefault();
    if (!projForm.title || !projForm.description || !projForm.img) {
      alert('Please fill out all project fields including selecting or pasting an image.');
      return;
    }

    if (editingProj) {
      db.updateProject(editingProj.id, projForm);
    } else {
      db.addProject(projForm);
    }
    loadData();
    setShowProjModal(false);
  };

  const handleProjDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      db.deleteProject(id);
      loadData();
    }
  };

  // Blogs CRUD Actions
  const handleOpenBlogAdd = () => {
    setEditingBlog(null);
    setBlogForm({
      title: '',
      category: 'Architecture',
      description: '',
      date: new Date().toISOString().split('T')[0],
      img: '',
      featured: false
    });
    setShowBlogModal(true);
  };

  const handleOpenBlogEdit = (blog) => {
    setEditingBlog(blog);
    setBlogForm({
      title: blog.title,
      category: blog.category,
      description: blog.description,
      date: blog.date,
      img: blog.img,
      featured: blog.featured || false
    });
    setShowBlogModal(true);
  };

  const handleBlogSubmit = (e) => {
    e.preventDefault();
    if (!blogForm.title || !blogForm.description || !blogForm.img) {
      alert('Please fill out all blog fields including selecting or pasting an image.');
      return;
    }

    if (editingBlog) {
      db.updateBlog(editingBlog.id, blogForm);
    } else {
      db.addBlog(blogForm);
    }
    loadData();
    setShowBlogModal(false);
  };

  const handleBlogDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      db.deleteBlog(id);
      loadData();
    }
  };

  // Get most recent 3 uploads combined
  const getRecentUploads = () => {
    const combined = [
      ...projects.map(p => ({ ...p, type: 'Project' })),
      ...blogs.map(b => ({ ...b, type: 'Blog' }))
    ];
    return combined
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <img src="/images/logo.png" alt="Himani Logo" className="sidebar-logo" />
          <h2>Control Panel</h2>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📊 System Overview
          </button>
          <button 
            className={`nav-tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            🏗️ Manage Projects
          </button>
          <button 
            className={`nav-tab-btn ${activeTab === 'blogs' ? 'active' : ''}`}
            onClick={() => setActiveTab('blogs')}
          >
            ✍️ Manage Blogs
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="admin-profile">
            <div className="profile-info">
              <span className="profile-role">Logged in as</span>
              <span className="profile-email" title={db.getAdminEmail()}>{db.getAdminEmail()}</span>
            </div>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            🚪 Secure Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-main">
        {/* Top Header */}
        <header className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <div className="live-site-link">
            <a href="/" target="_blank" rel="noopener noreferrer">🌐 Visit Live Website →</a>
          </div>
        </header>

        {/* Stats Grid */}
        <section className="stats-grid">
          <div className="stat-card gold">
            <div className="stat-icon">🏗️</div>
            <div className="stat-details">
              <h3>Total Projects</h3>
              <p className="stat-number">{stats.totalProjects}</p>
            </div>
          </div>

          <div className="stat-card brown">
            <div className="stat-icon">✍️</div>
            <div className="stat-details">
              <h3>Total Blogs</h3>
              <p className="stat-number">{stats.totalBlogs}</p>
            </div>
          </div>

          <div className="stat-card sky">
            <div className="stat-icon">📈</div>
            <div className="stat-details">
              <h3>Recent (30 Days)</h3>
              <p className="stat-number">{stats.recentCount}</p>
            </div>
          </div>
        </section>

        {/* Content Tabs Switcher */}
        <div className="tab-content-container">
          
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="tab-pane active-pane">
              <h2>Recent Content Activity</h2>
              <p className="tab-description">The latest items uploaded across your projects and blogs.</p>
              
              <div className="recent-activity-list">
                {getRecentUploads().length === 0 ? (
                  <p className="no-data-msg">No uploads recorded yet.</p>
                ) : (
                  getRecentUploads().map((item) => (
                    <div className="activity-card" key={item.id}>
                      <div className="activity-img-wrapper">
                        <img src={item.img} alt={item.title} />
                      </div>
                      <div className="activity-details">
                        <span className={`activity-badge ${item.type.toLowerCase()}`}>
                          {item.type}
                        </span>
                        <h3>{item.title}</h3>
                        <p className="activity-meta">
                          Category: <strong>{item.category}</strong> • Date: {item.date}
                        </p>
                        <p className="activity-excerpt">{item.description}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* PROJECTS TAB */}
          {activeTab === 'projects' && (
            <div className="tab-pane active-pane">
              <div className="pane-header">
                <div>
                  <h2>Project Portfolios</h2>
                  <p className="tab-description">Add, update, or remove construction & interior projects.</p>
                </div>
                <button onClick={handleOpenProjAdd} className="btn-add-new">
                  ➕ Add New Project
                </button>
              </div>

              <div className="admin-grid">
                {projects.length === 0 ? (
                  <p className="no-data-msg">No projects found. Add one to get started!</p>
                ) : (
                  projects.map(proj => (
                    <div className="admin-item-card" key={proj.id}>
                      <div className="item-card-img">
                        <img src={proj.img} alt={proj.title} />
                        <span className="item-card-category">{proj.category}</span>
                      </div>
                      <div className="item-card-body">
                        <h3>{proj.title}</h3>
                        <p className="item-card-date">📅 {proj.date}</p>
                        <p className="item-card-desc">{proj.description}</p>
                      </div>
                      <div className="item-card-actions">
                        <button onClick={() => handleOpenProjEdit(proj)} className="btn-edit">
                          ✏️ Edit
                        </button>
                        <button onClick={() => handleProjDelete(proj.id)} className="btn-delete">
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* BLOGS TAB */}
          {activeTab === 'blogs' && (
            <div className="tab-pane active-pane">
              <div className="pane-header">
                <div>
                  <h2>Blog Articles</h2>
                  <p className="tab-description">Manage educational news, tips, and insights for site readers.</p>
                </div>
                <button onClick={handleOpenBlogAdd} className="btn-add-new">
                  ➕ Add New Blog Post
                </button>
              </div>

              <div className="admin-grid">
                {blogs.length === 0 ? (
                  <p className="no-data-msg">No blog posts found. Add one to get started!</p>
                ) : (
                  blogs.map(blog => (
                    <div className="admin-item-card" key={blog.id}>
                      <div className="item-card-img">
                        <img src={blog.img} alt={blog.title} />
                        <span className="item-card-category">{blog.category}</span>
                        {blog.featured && <span className="item-card-featured-badge">⭐ Featured</span>}
                      </div>
                      <div className="item-card-body">
                        <h3>{blog.title}</h3>
                        <p className="item-card-date">📅 {blog.date}</p>
                        <p className="item-card-desc">{blog.description}</p>
                      </div>
                      <div className="item-card-actions">
                        <button onClick={() => handleOpenBlogEdit(blog)} className="btn-edit">
                          ✏️ Edit
                        </button>
                        <button onClick={() => handleBlogDelete(blog.id)} className="btn-delete">
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

        </div>
      </main>

      {/* PROJECT FORM MODAL */}
      {showProjModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>{editingProj ? '✏️ Edit Project' : '🏗️ Create New Project'}</h3>
            <form onSubmit={handleProjSubmit} className="modal-form">
              <div className="form-group">
                <label>Project Title</label>
                <input 
                  type="text" 
                  value={projForm.title}
                  onChange={e => setProjForm({...projForm, title: e.target.value})}
                  placeholder="e.g. Elegant Oak Residence"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select 
                    value={projForm.category}
                    onChange={e => setProjForm({...projForm, category: e.target.value})}
                  >
                    <option value="residential">Residential Construction</option>
                    <option value="commercial">Commercial Construction</option>
                    <option value="interior">Interior Design</option>
                    <option value="renovation">Renovation & Remodeling</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Completion Date</label>
                  <input 
                    type="date" 
                    value={projForm.date}
                    onChange={e => setProjForm({...projForm, date: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea 
                  rows="3"
                  value={projForm.description}
                  onChange={e => setProjForm({...projForm, description: e.target.value})}
                  placeholder="Summarize structural features, premium materials, or client vision..."
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label>Project Image Source</label>
                <div className="image-input-container">
                  <div className="file-upload-wrapper">
                    <span>Upload Image File:</span>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => handleImageFileChange(e, 'project')}
                    />
                  </div>
                  <div className="divider-or">OR</div>
                  <div>
                    <span>Paste Image Web URL:</span>
                    <input 
                      type="text" 
                      value={projForm.img.startsWith('data:') ? '' : projForm.img}
                      onChange={e => setProjForm({...projForm, img: e.target.value})}
                      placeholder="e.g. /images/project_1.png or https://unsplash.com/..."
                    />
                  </div>
                </div>
                {projForm.img && (
                  <div className="image-preview">
                    <span>Preview:</span>
                    <img src={projForm.img} alt="Preview" />
                  </div>
                )}
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setShowProjModal(false)} className="btn-cancel">
                  Cancel
                </button>
                <button type="submit" className="btn-save">
                  {editingProj ? 'Save Changes' : 'Publish Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BLOG FORM MODAL */}
      {showBlogModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>{editingBlog ? '✏️ Edit Blog Post' : '✍️ Create New Blog Post'}</h3>
            <form onSubmit={handleBlogSubmit} className="modal-form">
              <div className="form-group">
                <label>Article Title</label>
                <input 
                  type="text" 
                  value={blogForm.title}
                  onChange={e => setBlogForm({...blogForm, title: e.target.value})}
                  placeholder="e.g. 5 Materials Shaping Sustainable Building"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category Tag</label>
                  <input 
                    type="text" 
                    value={blogForm.category}
                    onChange={e => setBlogForm({...blogForm, category: e.target.value})}
                    placeholder="e.g. Eco-Building, Trends, Remodel"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Publish Date</label>
                  <input 
                    type="date" 
                    value={blogForm.date}
                    onChange={e => setBlogForm({...blogForm, date: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={blogForm.featured}
                    onChange={e => setBlogForm({...blogForm, featured: e.target.checked})}
                  />
                  Featured Article (Shows highlighted at the top of the blog page)
                </label>
              </div>

              <div className="form-group">
                <label>Article Excerpt / Content</label>
                <textarea 
                  rows="4"
                  value={blogForm.description}
                  onChange={e => setBlogForm({...blogForm, description: e.target.value})}
                  placeholder="Write the article preview text or main dynamic paragraph..."
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label>Blog Image Source</label>
                <div className="image-input-container">
                  <div className="file-upload-wrapper">
                    <span>Upload Image File:</span>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => handleImageFileChange(e, 'blog')}
                    />
                  </div>
                  <div className="divider-or">OR</div>
                  <div>
                    <span>Paste Image Web URL:</span>
                    <input 
                      type="text" 
                      value={blogForm.img.startsWith('data:') ? '' : blogForm.img}
                      onChange={e => setBlogForm({...blogForm, img: e.target.value})}
                      placeholder="e.g. /images/project_2.png or https://unsplash.com/..."
                    />
                  </div>
                </div>
                {blogForm.img && (
                  <div className="image-preview">
                    <span>Preview:</span>
                    <img src={blogForm.img} alt="Preview" />
                  </div>
                )}
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setShowBlogModal(false)} className="btn-cancel">
                  Cancel
                </button>
                <button type="submit" className="btn-save">
                  {editingBlog ? 'Save Changes' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
