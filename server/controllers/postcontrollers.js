import Post from "../models/post.js";
// CREATE a post
export const createPost = async (req, res) => {
  try {
    const { title, content, category, coverImage } = req.body;
    if (!title || title.trim().length < 3) {
      return res
        .status(400)
        .json({ message: "Title must be at least 3 characters" });
    }
    if (!content || content.trim().length < 10) {
      return res
        .status(400)
        .json({ message: "Content must be at least 10 characters" });
    }
    const newPost = await Post.create({
      title,
      content,
      category,
      coverImage,
      author: req.userId,
    });
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET a single post
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "name email",
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE a post
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.author.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to edit this post" });
    }
    const { title, content, category, coverImage } = req.body;
    post.title = title ?? post.title;
    post.content = content ?? post.content;
    post.category = category ?? post.category;
    post.coverImage = coverImage ?? post.coverImage;
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE a post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.author.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this post" });
    }
    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
