const Blog = require("../model/blog-model");

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }); // Sort by latest blogs
    res.render("view-blogs", { blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).render("error", { message: "An error occurred while fetching blogs. Please try again later." });
  }
};

// Render add blog page
exports.renderAddBlog = (req, res) => {
  res.render("add-blog");
};

// Add a new blog
exports.addBlog = async (req, res) => {
  try {
    const { title, content, author, category, tags } = req.body;
    let blogImage = req.file ? req.file.filename : null; // Handling image upload

    // Validation: Check if required fields are missing
    if (!title || !content || !author || !category) {
      return res.status(400).render("error", { message: "All fields (Title, Content, Author, Category) are required." });
    }

    // Convert comma-separated tags into an array
    const formattedTags = tags ? tags.split(",").map(tag => tag.trim()) : [];

    // Create and save new blog post
    const newBlog = new Blog({
      title,
      content,
      author,
      category,
      blogImage,
      tags: formattedTags,
    });

    await newBlog.save();
    res.redirect("/view-blogs"); // Redirect to blog listing
  } catch (error) {
    console.error("Error while adding blog:", error);
    res.status(500).render("error", { message: "Failed to add the blog. Please try again later." });
  }
};

// Render edit blog page
exports.renderEditBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).render("error", { message: "Blog not found." });
    }
    res.render("edit-blog", { blog });
  } catch (error) {
    console.error("Error fetching blog for editing:", error);
    res.status(500).render("error", { message: "Error fetching blog for editing." });
  }
};

// Update blog
exports.updateBlog = async (req, res) => {
  try {
    const { title, content, author, category, tags } = req.body;
    let blogImage = req.file ? req.file.filename : req.body.oldImage; // Keep old image if no new upload

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        author,
        category,
        blogImage,
        tags: tags ? tags.split(",").map(tag => tag.trim()) : [],
      },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).render("error", { message: "Blog not found." });
    }

    res.redirect("/view-blogs");
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).render("error", { message: "Failed to update the blog. Please try again later." });
  }
};

// Delete blog
exports.deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).render("error", { message: "Blog not found." });
    }
    res.redirect("/view-blogs");
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).render("error", { message: "Failed to delete the blog. Please try again later." });
  }
};
