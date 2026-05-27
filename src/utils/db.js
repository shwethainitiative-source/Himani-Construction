// Dynamic client-side database management utilizing localStorage

const ADMIN_EMAIL = "himaniconstructionsandinterior@gmail.com";
const ADMIN_PASSWORD = "Himani@2026";

const initialProjects = [
  {
    id: "1",
    img: "/images/residential_construction.jpg",
    title: "Luxury Modern Villa",
    category: "residential",
    description: "A state-of-the-art custom-built residential villa designed for absolute luxury, premium energy efficiency, and modern smart-home integration.",
    date: "2026-05-10"
  },
  {
    id: "2",
    img: "/images/commercial_construction.jpg",
    title: "Vibrant Commercial Plaza",
    category: "commercial",
    description: "A spacious corporate retail and commercial workspace development designed for high traffic, structural safety, and growth-oriented design.",
    date: "2026-05-08"
  },
  {
    id: "3",
    img: "/images/interior_design.jpg",
    title: "High-End Kitchen Renovation",
    category: "interior",
    description: "A breathtaking custom-styled kitchen and dining space remodeling utilizing premium materials, oak cabinetry, and integrated architectural lighting.",
    date: "2026-04-20"
  },
  {
    id: "4",
    img: "/images/renovation.jpg",
    title: "Heritage Terrace Remodel",
    category: "renovation",
    description: "Breathed new life into an older structure with modern reinforcement, smart layouts, and full historical facade preservation.",
    date: "2026-04-10"
  },
  {
    id: "5",
    img: "/images/project_1.png",
    title: "Smart Urban Apartments",
    category: "residential",
    description: "Multi-family residential complex featuring modular concrete design, smart layouts, and premium eco-friendly fixtures.",
    date: "2026-03-25"
  },
  {
    id: "6",
    img: "/images/project_2.png",
    title: "Silicon Corporate Headquarters",
    category: "commercial",
    description: "Modern structural steel commercial office headquarters built to achieve top LEED green-building certifications.",
    date: "2026-03-15"
  }
];

const initialBlogs = [
  {
    id: "1",
    img: "/images/residential_construction.jpg",
    category: "Architecture",
    date: "2026-05-12",
    title: "The Future of Sustainable Construction: What You Need to Know",
    description: "As environmental concerns grow, the construction industry is rapidly evolving. Discover the latest eco-friendly materials, energy-efficient designs, and sustainable building practices that are shaping the homes and offices of tomorrow.",
    featured: true
  },
  {
    id: "2",
    img: "/images/interior_design.jpg",
    category: "Interior Design",
    date: "2026-05-05",
    title: "5 Color Trends Dominating Modern Living Spaces",
    description: "Explore the vibrant and muted palettes interior designers are using this year to bring spaces to life and inspire home style.",
    featured: false
  },
  {
    id: "3",
    img: "/images/renovation.jpg",
    category: "Renovation",
    date: "2026-04-28",
    title: "How to Survive a Major Home Remodel",
    description: "Renovating can be stressful. Follow our expert step-by-step contractor checklist to prepare your family and protect your sanity during a home build.",
    featured: false
  },
  {
    id: "4",
    img: "/images/commercial_construction.jpg",
    category: "Commercial",
    date: "2026-04-15",
    title: "Optimizing Office Layouts for Hybrid Work",
    description: "With flexible remote work here to stay, commercial spaces are adapting. Learn how to design a safe, functional, and highly collaborative layout.",
    featured: false
  },
  {
    id: "5",
    img: "/images/project_1.png",
    category: "Construction Tips",
    date: "2026-04-02",
    title: "Choosing the Right Contractor: A Smart Checklist",
    description: "Don't let your dream build turn into an expensive nightmare. Ask these crucial, structured questions before signing any builder agreement.",
    featured: false
  }
];

// Initialize Storage
const initDB = () => {
  if (!localStorage.getItem("himani_projects")) {
    localStorage.setItem("himani_projects", JSON.stringify(initialProjects));
  }
  if (!localStorage.getItem("himani_blogs")) {
    localStorage.setItem("himani_blogs", JSON.stringify(initialBlogs));
  }
};

initDB();

export const db = {
  // Auth Operations
  login: (email, password) => {
    if (email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = btoa(JSON.stringify({ email, exp: Date.now() + 86400000 })); // 24 hour token
      localStorage.setItem("himani_admin_token", token);
      return { success: true };
    }
    return { success: false, message: "Invalid admin credentials." };
  },

  logout: () => {
    localStorage.removeItem("himani_admin_token");
  },

  isAuthenticated: () => {
    const token = localStorage.getItem("himani_admin_token");
    if (!token) return false;
    try {
      const parsed = JSON.parse(atob(token));
      if (parsed.email === ADMIN_EMAIL && parsed.exp > Date.now()) {
        return true;
      }
      // Expired token
      localStorage.removeItem("himani_admin_token");
      return false;
    } catch (e) {
      return false;
    }
  },

  getAdminEmail: () => ADMIN_EMAIL,

  // Projects CRUD
  getProjects: () => {
    initDB();
    return JSON.parse(localStorage.getItem("himani_projects") || "[]");
  },

  addProject: (project) => {
    initDB();
    const projects = db.getProjects();
    const newProject = {
      ...project,
      id: Date.now().toString()
    };
    projects.unshift(newProject); // Add to the top
    localStorage.setItem("himani_projects", JSON.stringify(projects));
    return newProject;
  },

  updateProject: (id, updatedProject) => {
    initDB();
    const projects = db.getProjects();
    const index = projects.findIndex(p => p.id === id);
    if (index !== -1) {
      projects[index] = { ...projects[index], ...updatedProject, id };
      localStorage.setItem("himani_projects", JSON.stringify(projects));
      return true;
    }
    return false;
  },

  deleteProject: (id) => {
    initDB();
    const projects = db.getProjects();
    const filtered = projects.filter(p => p.id !== id);
    localStorage.setItem("himani_projects", JSON.stringify(filtered));
    return true;
  },

  // Blogs CRUD
  getBlogs: () => {
    initDB();
    return JSON.parse(localStorage.getItem("himani_blogs") || "[]");
  },

  addBlog: (blog) => {
    initDB();
    const blogs = db.getBlogs();
    const newBlog = {
      ...blog,
      id: Date.now().toString(),
      featured: blog.featured || false
    };

    // If this new blog is featured, unfeature all others
    if (newBlog.featured) {
      blogs.forEach(b => b.featured = false);
    }

    blogs.unshift(newBlog);
    localStorage.setItem("himani_blogs", JSON.stringify(blogs));
    return newBlog;
  },

  updateBlog: (id, updatedBlog) => {
    initDB();
    const blogs = db.getBlogs();
    const index = blogs.findIndex(b => b.id === id);
    if (index !== -1) {
      // If updating to featured, make sure others are unfeatured
      if (updatedBlog.featured) {
        blogs.forEach(b => b.featured = false);
      }
      blogs[index] = { ...blogs[index], ...updatedBlog, id };
      localStorage.setItem("himani_blogs", JSON.stringify(blogs));
      return true;
    }
    return false;
  },

  deleteBlog: (id) => {
    initDB();
    const blogs = db.getBlogs();
    const filtered = blogs.filter(b => b.id !== id);
    localStorage.setItem("himani_blogs", JSON.stringify(filtered));
    return true;
  }
};
