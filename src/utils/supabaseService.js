import { supabase } from './supabaseClient';

const BUCKET_NAME = 'himani-construction';

// Helper to upload a file to Supabase Storage and get public URL
const uploadImage = async (folder, file) => {
  if (!file || typeof file === 'string') return file; // Already a URL or empty

  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true
    });

  if (uploadError) {
    throw new Error(`Failed to upload image: ${uploadError.message}`);
  }

  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);

  return data.publicUrl;
};

// Helper to delete a file from Storage if it belongs to our bucket
const deleteImageFromStorage = async (imgUrl) => {
  if (!imgUrl || typeof imgUrl !== 'string') return;
  
  // Verify it is a supabase storage URL for our bucket
  if (imgUrl.includes(`/storage/v1/object/public/${BUCKET_NAME}/`)) {
    const parts = imgUrl.split(`/storage/v1/object/public/${BUCKET_NAME}/`);
    if (parts.length > 1) {
      const filePath = parts[1];
      await supabase.storage.from(BUCKET_NAME).remove([filePath]);
    }
  }
};

export const supabaseService = {
  // =======================================================
  // AUTH OPERATIONS
  // =======================================================
  
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password
    });
    if (error) {
      return { success: false, message: error.message };
    }
    return { success: true, user: data.user, session: data.session };
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Sign out error:", error.message);
  },

  getSession: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  },

  onAuthChange: (callback) => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      callback(event, session);
    });
    return subscription;
  },

  // =======================================================
  // PROJECTS CRUD
  // =======================================================

  getProjects: async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error("Error loading projects from Supabase:", error.message);
      // Fallback empty list
      return [];
    }
    return data;
  },

  getProject: async (id) => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error loading project ${id} from Supabase:`, error.message);
      return null;
    }
    return data;
  },

  addProject: async (projectData, file) => {
    let imgUrl = projectData.img;
    if (file) {
      imgUrl = await uploadImage('projects', file);
    }

    const payload = {
      title: projectData.title,
      category: projectData.category,
      description: projectData.description,
      location: projectData.location || '',
      date: projectData.date,
      img: imgUrl,
      featured: projectData.featured || false
    };

    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([payload])
        .select();

      if (error) {
        // Safe self-healing retry if DB doesn't have the 'featured' or 'location' column yet
        if (error.code === '42703') {
          console.warn("Supabase 'projects' table is missing columns. Checking and retrying...");
          const errMsg = error.message.toLowerCase();
          if (errMsg.includes('location')) {
            delete payload.location;
          }
          if (errMsg.includes('featured')) {
            delete payload.featured;
          }
          
          const { data: retryData, error: retryError } = await supabase
            .from('projects')
            .insert([payload])
            .select();

          if (retryError) {
            // Second step retry
            if (retryError.code === '42703') {
              const retryErrMsg = retryError.message.toLowerCase();
              if (retryErrMsg.includes('location')) {
                delete payload.location;
              }
              if (retryErrMsg.includes('featured')) {
                delete payload.featured;
              }
              const { data: finalData, error: finalError } = await supabase
                .from('projects')
                .insert([payload])
                .select();
              if (finalError) throw new Error(finalError.message);
              return finalData[0];
            }
            throw new Error(retryError.message);
          }
          return retryData[0];
        }
        throw new Error(error.message);
      }
      return data[0];
    } catch (err) {
      throw err;
    }
  },

  updateProject: async (id, projectData, file) => {
    let imgUrl = projectData.img;
    if (file) {
      // If a new file is uploaded, remove the old one first if it was in storage
      if (projectData.oldImgUrl) {
        await deleteImageFromStorage(projectData.oldImgUrl);
      }
      imgUrl = await uploadImage('projects', file);
    }

    const payload = {
      title: projectData.title,
      category: projectData.category,
      description: projectData.description,
      location: projectData.location || '',
      date: projectData.date,
      img: imgUrl,
      featured: projectData.featured || false
    };

    try {
      const { data, error } = await supabase
        .from('projects')
        .update(payload)
        .eq('id', id)
        .select();

      if (error) {
        // Safe self-healing retry if DB doesn't have the 'featured' or 'location' column yet
        if (error.code === '42703') {
          console.warn("Supabase 'projects' table is missing columns. Checking and retrying...");
          const errMsg = error.message.toLowerCase();
          if (errMsg.includes('location')) {
            delete payload.location;
          }
          if (errMsg.includes('featured')) {
            delete payload.featured;
          }
          
          const { data: retryData, error: retryError } = await supabase
            .from('projects')
            .update(payload)
            .eq('id', id)
            .select();

          if (retryError) {
            // Second step retry
            if (retryError.code === '42703') {
              const retryErrMsg = retryError.message.toLowerCase();
              if (retryErrMsg.includes('location')) {
                delete payload.location;
              }
              if (retryErrMsg.includes('featured')) {
                delete payload.featured;
              }
              const { data: finalData, error: finalError } = await supabase
                .from('projects')
                .update(payload)
                .eq('id', id)
                .select();
              if (finalError) throw new Error(finalError.message);
              return finalData[0];
            }
            throw new Error(retryError.message);
          }
          return retryData[0];
        }
        throw new Error(error.message);
      }
      return data[0];
    } catch (err) {
      throw err;
    }
  },

  deleteProject: async (id, imgUrl) => {
    // Delete the image file from storage first
    if (imgUrl) {
      await deleteImageFromStorage(imgUrl);
    }

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
    return true;
  },

  // =======================================================
  // BLOGS CRUD
  // =======================================================

  getBlogs: async () => {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error("Error loading blogs from Supabase:", error.message);
      return [];
    }
    return data;
  },

  addBlog: async (blogData, file) => {
    let imgUrl = blogData.img;
    if (file) {
      imgUrl = await uploadImage('blogs', file);
    }

    // If making this blog post featured, unfeature all existing posts
    if (blogData.featured) {
      await supabase
        .from('blogs')
        .update({ featured: false })
        .eq('featured', true);
    }

    const { data, error } = await supabase
      .from('blogs')
      .insert([{
        title: blogData.title,
        category: blogData.category,
        description: blogData.description,
        date: blogData.date,
        img: imgUrl,
        featured: blogData.featured || false
      }])
      .select();

    if (error) throw new Error(error.message);
    return data[0];
  },

  updateBlog: async (id, blogData, file) => {
    let imgUrl = blogData.img;
    if (file) {
      if (blogData.oldImgUrl) {
        await deleteImageFromStorage(blogData.oldImgUrl);
      }
      imgUrl = await uploadImage('blogs', file);
    }

    // If making this blog post featured, unfeature all other posts
    if (blogData.featured) {
      await supabase
        .from('blogs')
        .update({ featured: false })
        .eq('featured', true);
    }

    const { data, error } = await supabase
      .from('blogs')
      .update({
        title: blogData.title,
        category: blogData.category,
        description: blogData.description,
        date: blogData.date,
        img: imgUrl,
        featured: blogData.featured || false
      })
      .eq('id', id)
      .select();

    if (error) throw new Error(error.message);
    return data[0];
  },

  deleteBlog: async (id, imgUrl) => {
    if (imgUrl) {
      await deleteImageFromStorage(imgUrl);
    }

    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
    return true;
  },

  // =======================================================
  // HERO SLIDES OPERATIONS
  // =======================================================

  getHeroSlides: async () => {
    const { data, error } = await supabase
      .from('hero_slides')
      .select('*')
      .order('slot_number', { ascending: true });

    if (error) {
      console.warn("Could not load hero slides from Supabase, using defaults:", error.message);
      return null;
    }
    return data;
  },

  updateHeroSlide: async (slotNumber, slideData, file) => {
    let mediaUrl = slideData.media_url;
    if (file) {
      if (slideData.oldMediaUrl) {
        await deleteImageFromStorage(slideData.oldMediaUrl);
      }
      // Re-use uploadImage helper since it works for all file types (images, videos)
      mediaUrl = await uploadImage('hero', file);
    }

    const payload = {
      slot_number: slotNumber,
      media_url: mediaUrl,
      media_type: slideData.media_type || 'image',
      title: slideData.title || '',
      subtitle: slideData.subtitle || '',
      link_text: slideData.link_text || 'Get In Touch',
      link_url: slideData.link_url || '/contact#contact-form'
    };

    const { data, error } = await supabase
      .from('hero_slides')
      .upsert(payload, { onConflict: 'slot_number' })
      .select();

    if (error) throw new Error(error.message);
    return data[0];
  }
};
